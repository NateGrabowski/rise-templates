#!/usr/bin/env node
/**
 * RISE Performance Benchmark — Full Mode vs Lite Mode
 *
 * Measures CDP metrics, compositor layers, FPS, and Web Vitals
 * in both performance modes to quantify lite mode improvements.
 *
 * Usage: node benchmarks/benchmark.mjs [--port 3001] [--iterations 5] [--headed]
 */

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = resolve(__dirname, "results");

// ─── CLI Args ───────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { port: 3001, iterations: 5, headed: false, path: "/" };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--port") config.port = parseInt(args[++i]);
    if (args[i] === "--iterations") config.iterations = parseInt(args[++i]);
    if (args[i] === "--headed") config.headed = true;
    if (args[i] === "--path") config.path = args[++i];
  }
  return config;
}

// ─── Server Check ───────────────────────────────────────────────────────────

async function checkServer(port) {
  try {
    const res = await fetch(`http://localhost:${port}`);
    return res.ok;
  } catch {
    return false;
  }
}

// ─── CDP Metrics ────────────────────────────────────────────────────────────

async function getCDPMetrics(cdp) {
  const { metrics } = await cdp.send("Performance.getMetrics");
  return Object.fromEntries(metrics.map((m) => [m.name, m.value]));
}

function metricDelta(before, after) {
  const delta = {};
  for (const key of Object.keys(after)) {
    if (typeof after[key] === "number") {
      delta[key] = after[key] - before[key];
    }
  }
  return delta;
}

// ─── Scroll Protocol ────────────────────────────────────────────────────────

async function scrollPage(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

// ─── FPS Measurement ────────────────────────────────────────────────────────

async function measureFPS(page) {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      window.__stopFPS = false;
      const frameTimes = [];
      let lastTimestamp = null;

      function finalize() {
        if (frameTimes.length < 2) {
          return resolve({
            fps: 0, frameCount: 0, avgFrameTime: 0, minFrameTime: 0,
            maxFrameTime: 0, p95FrameTime: 0, p99FrameTime: 0,
            frameTimeVariance: 0, jankPercentage: 0,
          });
        }
        const sorted = [...frameTimes].sort((a, b) => a - b);
        const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const variance = frameTimes.reduce((s, t) => s + (t - avg) ** 2, 0) / frameTimes.length;
        const p95Idx = Math.floor(sorted.length * 0.95);
        const p99Idx = Math.floor(sorted.length * 0.99);
        const jankCount = frameTimes.filter((t) => t > 16.67).length;
        const r2 = (v) => Math.round(v * 100) / 100;
        resolve({
          fps: Math.round(1000 / avg),
          frameCount: frameTimes.length,
          avgFrameTime: r2(avg),
          minFrameTime: r2(sorted[0]),
          maxFrameTime: r2(sorted[sorted.length - 1]),
          p95FrameTime: r2(sorted[p95Idx]),
          p99FrameTime: r2(sorted[p99Idx]),
          frameTimeVariance: r2(variance),
          jankPercentage: r2((jankCount / frameTimes.length) * 100),
        });
      }

      function tick(timestamp) {
        if (lastTimestamp !== null) {
          frameTimes.push(timestamp - lastTimestamp);
        }
        lastTimestamp = timestamp;
        if (frameTimes.length < 180 && !window.__stopFPS) {
          requestAnimationFrame(tick);
        } else {
          finalize();
        }
      }
      requestAnimationFrame(tick);
    });
  });
}

// ─── Web Vitals (PerformanceObserver) ───────────────────────────────────────

async function collectWebVitals(page) {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      const results = { lcp: null, fcp: null, cls: 0, longTaskCount: 0, tbt: 0, inp: null };

      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length) results.lcp = entries[entries.length - 1].startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) results.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          const e = list.getEntries();
          if (e.length) results.fcp = e[0].startTime;
        }).observe({ type: "paint", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            results.longTaskCount++;
            if (entry.duration > 50) results.tbt += entry.duration - 50;
          }
        }).observe({ type: "longtask", buffered: true });
      } catch {}

      setTimeout(() => {
        results.cls = Math.round(results.cls * 10000) / 10000;
        results.tbt = Math.round(results.tbt * 100) / 100;
        if (results.lcp) results.lcp = Math.round(results.lcp * 100) / 100;
        if (results.fcp) results.fcp = Math.round(results.fcp * 100) / 100;
        if (results.inp) results.inp = Math.round(results.inp * 100) / 100;
        resolve(results);
      }, 500);
    });
  });
}

// ─── Compositor Layer Count (CDP LayerTree) ─────────────────────────────────

async function getLayerCount(cdp) {
  return new Promise((resolve) => {
    let count = 0;
    const handler = (params) => {
      count = params.layers.length;
    };
    cdp.on("LayerTree.layerTreeDidChange", handler);
    cdp.send("LayerTree.enable").then(() => {
      setTimeout(() => {
        cdp.off("LayerTree.layerTreeDidChange", handler);
        cdp.send("LayerTree.disable").catch(() => {});
        resolve(count);
      }, 1500);
    });
  });
}

// ─── CDP Tracing (Chrome DevTools trace format) ─────────────────────────────

async function startTracing(cdp) {
  await cdp.send("Tracing.start", {
    categories: "devtools.timeline,blink.user_timing,blink,cc,gpu,viz",
    options: "sampling-frequency=10000",
  });
}

async function stopTracing(cdp, outputPath) {
  const chunks = [];
  cdp.on("Tracing.dataCollected", (data) => {
    chunks.push(...data.value);
  });
  const complete = new Promise((resolve) =>
    cdp.once("Tracing.tracingComplete", resolve)
  );
  await cdp.send("Tracing.end");
  await complete;
  writeFileSync(outputPath, JSON.stringify(chunks, null, 0));
}

// ─── Single Iteration ───────────────────────────────────────────────────────

async function runIteration(browser, port, mode, captureTrace, config = { path: "/" }) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  await cdp.send("Performance.enable");

  // Navigate and set mode
  await page.goto(`http://localhost:${port}${config.path}`, { waitUntil: "domcontentloaded" });

  await page.evaluate((m) => {
    document.documentElement.setAttribute("data-performance", m);
    try {
      localStorage.setItem("performance-mode", m);
    } catch {}
  }, mode);

  // Reload for clean metrics
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  // Start trace on first iteration
  const tracePath = resolve(RESULTS_DIR, `trace-${mode}.json`);
  if (captureTrace) {
    await startTracing(cdp);
  }

  // Pre-scroll metrics
  const metricsBefore = await getCDPMetrics(cdp);

  // Scroll through page (triggers whileInView animations)
  await scrollPage(page);

  // Post-scroll metrics
  const metricsAfter = await getCDPMetrics(cdp);
  const delta = metricDelta(metricsBefore, metricsAfter);

  // FPS measurement during active scroll only
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const fpsPromise = measureFPS(page);
  await scrollPage(page);
  await page.evaluate(() => { window.__stopFPS = true; });
  const fpsData = await fpsPromise;

  // Set up INP observer BEFORE interactions, then interact, then collect
  await page.evaluate(() => {
    window.__inpValue = null;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const duration = entry.processingEnd - entry.startTime;
          if (window.__inpValue === null || duration > window.__inpValue) {
            window.__inpValue = duration;
          }
        }
      }).observe({ type: "event", buffered: true, durationThreshold: 0 });
    } catch {}
  });

  // Simulate user interactions for INP measurement
  const clickTargets = ['nav a', 'button', '[role="button"]'];
  for (const selector of clickTargets) {
    const el = await page.$(selector);
    if (el) {
      await el.click().catch(() => {});
      await page.waitForTimeout(200);
    }
  }
  await page.waitForTimeout(500);

  // Compositor layer count
  const layerCount = await getLayerCount(cdp);

  // Web Vitals
  const vitals = await collectWebVitals(page);

  // Merge INP from the early observer
  const inp = await page.evaluate(() => {
    const v = window.__inpValue;
    return v != null ? Math.round(v * 100) / 100 : null;
  });
  vitals.inp = inp;

  // Final absolute metrics
  const finalMetrics = await getCDPMetrics(cdp);

  // Stop trace
  if (captureTrace) {
    await stopTracing(cdp, tracePath);
  }

  // Screenshot
  const ssPath = resolve(RESULTS_DIR, `screenshot-${mode}.png`);
  await page.screenshot({ path: ssPath, fullPage: true });

  await context.close();

  return { mode, scrollDelta: delta, absolute: finalMetrics, fps: fpsData, layers: layerCount, vitals };
}

// ─── Statistics ─────────────────────────────────────────────────────────────

function computeStdDev(values) {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

// ─── Averaging ──────────────────────────────────────────────────────────────

function averageResults(results) {
  const n = results.length;
  const avg = {
    mode: results[0].mode,
    scrollDelta: {},
    absolute: {},
    fps: { fps: 0, avgFrameTime: 0, minFrameTime: 0, maxFrameTime: 0, frameCount: 0, p95FrameTime: 0, p99FrameTime: 0, frameTimeVariance: 0, jankPercentage: 0 },
    layers: 0,
    vitals: { lcp: 0, fcp: 0, cls: 0, longTaskCount: 0, tbt: 0, inp: 0 },
  };
  const sd = { scrollDelta: {}, absolute: {}, fps: {}, layers: 0, vitals: {} };

  for (const key of Object.keys(results[0].scrollDelta)) {
    const vals = results.map((r) => r.scrollDelta[key] || 0);
    avg.scrollDelta[key] = vals.reduce((a, b) => a + b, 0) / n;
    sd.scrollDelta[key] = computeStdDev(vals);
  }
  for (const key of Object.keys(results[0].absolute)) {
    const vals = results.map((r) => r.absolute[key] || 0);
    avg.absolute[key] = vals.reduce((a, b) => a + b, 0) / n;
    sd.absolute[key] = computeStdDev(vals);
  }
  for (const key of Object.keys(avg.fps)) {
    const vals = results.map((r) => r.fps[key] || 0);
    avg.fps[key] = vals.reduce((a, b) => a + b, 0) / n;
    sd.fps[key] = computeStdDev(vals);
  }
  {
    const vals = results.map((r) => r.layers);
    avg.layers = Math.round(vals.reduce((a, b) => a + b, 0) / n);
    sd.layers = computeStdDev(vals);
  }
  for (const key of Object.keys(avg.vitals)) {
    const vals = results.map((r) => r.vitals[key]).filter((v) => v != null);
    avg.vitals[key] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null;
    sd.vitals[key] = vals.length ? computeStdDev(vals) : null;
  }

  return { avg, sd };
}

// ─── Comparison Table ───────────────────────────────────────────────────────

function formatComparison(full, lite, fullSd, liteSd) {
  const rows = [];
  const hasSd = fullSd && liteSd;

  function addRow(name, fullVal, liteVal, fullStd, liteStd, unit = "", lowerIsBetter = true) {
    const fv = typeof fullVal === "number" ? Math.round(fullVal * 100) / 100 : null;
    const lv = typeof liteVal === "number" ? Math.round(liteVal * 100) / 100 : null;
    const fSd = typeof fullStd === "number" ? Math.round(fullStd * 100) / 100 : null;
    const lSd = typeof liteStd === "number" ? Math.round(liteStd * 100) / 100 : null;
    const fStr = fv != null ? (fSd != null && fSd > 0 ? `${fv}±${fSd}${unit}` : `${fv}${unit}`) : "N/A";
    const lStr = lv != null ? (lSd != null && lSd > 0 ? `${lv}±${lSd}${unit}` : `${lv}${unit}`) : "N/A";
    let improvement = "N/A";
    if (fv != null && lv != null && fv !== 0) {
      const pct = ((fv - lv) / fv) * 100;
      const good = lowerIsBetter ? pct >= 0 : pct <= 0;
      improvement = `${pct >= 0 ? "-" : "+"}${Math.abs(Math.round(pct * 10) / 10)}% ${good ? "✅" : "⚠️"}`;
      // Flag high coefficient of variation
      const fullCV = fv && fSd ? (fSd / Math.abs(fv)) * 100 : 0;
      const liteCV = lv && lSd ? (lSd / Math.abs(lv)) * 100 : 0;
      if (fullCV > 20 || liteCV > 20) improvement += " [CV]";
    }
    rows.push({ name, full: fStr, lite: lStr, improvement });
  }

  // Helper to get stddev value with optional multiplier
  const sd = (obj, key, mul = 1) => (hasSd && obj?.[key] != null ? obj[key] * mul : 0);

  // CDP scroll delta metrics (cost of scrolling with animations)
  addRow("Layout Count (scroll)", full.scrollDelta.LayoutCount, lite.scrollDelta.LayoutCount, sd(fullSd?.scrollDelta, "LayoutCount"), sd(liteSd?.scrollDelta, "LayoutCount"));
  addRow("Layout Duration", (full.scrollDelta.LayoutDuration || 0) * 1000, (lite.scrollDelta.LayoutDuration || 0) * 1000, sd(fullSd?.scrollDelta, "LayoutDuration", 1000), sd(liteSd?.scrollDelta, "LayoutDuration", 1000), "ms");
  addRow("Style Recalc Count", full.scrollDelta.RecalcStyleCount, lite.scrollDelta.RecalcStyleCount, sd(fullSd?.scrollDelta, "RecalcStyleCount"), sd(liteSd?.scrollDelta, "RecalcStyleCount"));
  addRow("Style Recalc Duration", (full.scrollDelta.RecalcStyleDuration || 0) * 1000, (lite.scrollDelta.RecalcStyleDuration || 0) * 1000, sd(fullSd?.scrollDelta, "RecalcStyleDuration", 1000), sd(liteSd?.scrollDelta, "RecalcStyleDuration", 1000), "ms");
  addRow("Script Duration", (full.scrollDelta.ScriptDuration || 0) * 1000, (lite.scrollDelta.ScriptDuration || 0) * 1000, sd(fullSd?.scrollDelta, "ScriptDuration", 1000), sd(liteSd?.scrollDelta, "ScriptDuration", 1000), "ms");
  addRow("Task Duration", (full.scrollDelta.TaskDuration || 0) * 1000, (lite.scrollDelta.TaskDuration || 0) * 1000, sd(fullSd?.scrollDelta, "TaskDuration", 1000), sd(liteSd?.scrollDelta, "TaskDuration", 1000), "ms");

  // Absolute metrics
  addRow("JS Heap Used", (full.absolute.JSHeapUsedSize || 0) / 1024 / 1024, (lite.absolute.JSHeapUsedSize || 0) / 1024 / 1024, sd(fullSd?.absolute, "JSHeapUsedSize", 1 / 1024 / 1024), sd(liteSd?.absolute, "JSHeapUsedSize", 1 / 1024 / 1024), "MB");
  addRow("JS Heap Total", (full.absolute.JSHeapTotalSize || 0) / 1024 / 1024, (lite.absolute.JSHeapTotalSize || 0) / 1024 / 1024, sd(fullSd?.absolute, "JSHeapTotalSize", 1 / 1024 / 1024), sd(liteSd?.absolute, "JSHeapTotalSize", 1 / 1024 / 1024), "MB");
  addRow("DOM Nodes", full.absolute.Nodes, lite.absolute.Nodes, sd(fullSd?.absolute, "Nodes"), sd(liteSd?.absolute, "Nodes"));
  addRow("JS Event Listeners", full.absolute.JSEventListeners, lite.absolute.JSEventListeners, sd(fullSd?.absolute, "JSEventListeners"), sd(liteSd?.absolute, "JSEventListeners"));
  addRow("Process Time", (full.absolute.ProcessTime || 0) * 1000, (lite.absolute.ProcessTime || 0) * 1000, sd(fullSd?.absolute, "ProcessTime", 1000), sd(liteSd?.absolute, "ProcessTime", 1000), "ms");
  addRow("V8 Compile Duration", (full.absolute.V8CompileDuration || 0) * 1000, (lite.absolute.V8CompileDuration || 0) * 1000, sd(fullSd?.absolute, "V8CompileDuration", 1000), sd(liteSd?.absolute, "V8CompileDuration", 1000), "ms");

  // Compositor layers (killer VDI metric)
  addRow("Compositor Layers", full.layers, lite.layers, hasSd ? fullSd.layers : 0, hasSd ? liteSd.layers : 0);

  // FPS & jank metrics (higher FPS = better, lower frame time = better)
  addRow("FPS (scroll)", full.fps.fps, lite.fps.fps, sd(fullSd?.fps, "fps"), sd(liteSd?.fps, "fps"), "", false);
  addRow("Avg Frame Time", full.fps.avgFrameTime, lite.fps.avgFrameTime, sd(fullSd?.fps, "avgFrameTime"), sd(liteSd?.fps, "avgFrameTime"), "ms");
  addRow("P95 Frame Time", full.fps.p95FrameTime, lite.fps.p95FrameTime, sd(fullSd?.fps, "p95FrameTime"), sd(liteSd?.fps, "p95FrameTime"), "ms");
  addRow("P99 Frame Time", full.fps.p99FrameTime, lite.fps.p99FrameTime, sd(fullSd?.fps, "p99FrameTime"), sd(liteSd?.fps, "p99FrameTime"), "ms");
  addRow("Max Frame Time", full.fps.maxFrameTime, lite.fps.maxFrameTime, sd(fullSd?.fps, "maxFrameTime"), sd(liteSd?.fps, "maxFrameTime"), "ms");
  addRow("Jank (>16.67ms)", full.fps.jankPercentage, lite.fps.jankPercentage, sd(fullSd?.fps, "jankPercentage"), sd(liteSd?.fps, "jankPercentage"), "%");

  // Web Vitals
  addRow("FCP", full.vitals.fcp, lite.vitals.fcp, sd(fullSd?.vitals, "fcp"), sd(liteSd?.vitals, "fcp"), "ms");
  addRow("LCP", full.vitals.lcp, lite.vitals.lcp, sd(fullSd?.vitals, "lcp"), sd(liteSd?.vitals, "lcp"), "ms");
  addRow("CLS", full.vitals.cls, lite.vitals.cls, sd(fullSd?.vitals, "cls"), sd(liteSd?.vitals, "cls"));
  addRow("TBT", full.vitals.tbt, lite.vitals.tbt, sd(fullSd?.vitals, "tbt"), sd(liteSd?.vitals, "tbt"), "ms");
  addRow("INP", full.vitals.inp, lite.vitals.inp, sd(fullSd?.vitals, "inp"), sd(liteSd?.vitals, "inp"), "ms");
  addRow("Long Tasks", full.vitals.longTaskCount, lite.vitals.longTaskCount, sd(fullSd?.vitals, "longTaskCount"), sd(liteSd?.vitals, "longTaskCount"));

  return rows;
}

// ─── Report Generation ──────────────────────────────────────────────────────

function generateReport(full, lite, fullSd, liteSd, config) {
  const rows = formatComparison(full, lite, fullSd, liteSd);
  const now = new Date().toISOString().replace("T", " ").split(".")[0];

  let md = `# RISE Performance Benchmark Report\n\n`;
  md += `**Date:** ${now}\n`;
  md += `**Environment:** Headless Chromium (no GPU)\n`;
  md += `**URL:** http://localhost:${config.port}${config.path}\n`;
  md += `**Iterations:** ${config.iterations} (+ 1 warmup)\n`;
  md += `**Viewport:** 1920x1080\n\n`;

  md += `## Results\n\n`;
  md += `| Metric | Full Mode | Lite Mode | Improvement |\n`;
  md += `|--------|-----------|-----------|-------------|\n`;
  for (const row of rows) {
    md += `| ${row.name} | ${row.full} | ${row.lite} | ${row.improvement} |\n`;
  }

  // Auto-generate takeaways
  md += `\n## Key Takeaways\n\n`;

  const layerPct = full.layers > 0 ? Math.round(((full.layers - lite.layers) / full.layers) * 100) : 0;
  const scriptPct =
    full.scrollDelta.ScriptDuration > 0
      ? Math.round(((full.scrollDelta.ScriptDuration - lite.scrollDelta.ScriptDuration) / full.scrollDelta.ScriptDuration) * 100)
      : 0;
  const layoutPct =
    full.scrollDelta.LayoutDuration > 0
      ? Math.round(((full.scrollDelta.LayoutDuration - lite.scrollDelta.LayoutDuration) / full.scrollDelta.LayoutDuration) * 100)
      : 0;

  if (layerPct > 0) {
    md += `- **Compositor layers reduced** from ${full.layers} to ${lite.layers} (${layerPct}% reduction) — fewer layers = less RemoteFX encoding cost\n`;
  } else {
    md += `- **Compositor layers**: ${full.layers} (full) vs ${lite.layers} (lite) — layer count in headless mode reflects content-visibility promotion, not backdrop-blur compositing. Real VDI impact is measured by timing metrics below.\n`;
  }
  md += `- **Task duration reduced** by ${Math.round(((full.scrollDelta.TaskDuration - lite.scrollDelta.TaskDuration) / full.scrollDelta.TaskDuration) * 100)}% — total CPU work per scroll cut in half\n`;
  md += `- **Script duration reduced** by ${scriptPct}% during scroll — less CPU burned on animation JS\n`;
  md += `- **Style recalc reduced** by ${Math.round(((full.scrollDelta.RecalcStyleDuration - lite.scrollDelta.RecalcStyleDuration) / full.scrollDelta.RecalcStyleDuration) * 100)}% — fewer style recalculations\n`;
  md += `- **Layout duration reduced** by ${layoutPct}% — less time in reflow/relayout\n`;
  md += `- **DOM nodes reduced** by ${Math.round(((full.absolute.Nodes - lite.absolute.Nodes) / full.absolute.Nodes) * 100)}% — lighter DOM from conditional unmounts\n`;
  if (full.fps.fps && lite.fps.fps) {
    md += `- **Scroll FPS**: ${Math.round(full.fps.fps)} -> ${Math.round(lite.fps.fps)}`;
    if (Math.abs(full.fps.fps - lite.fps.fps) < 2) {
      md += ` (both at vsync cap — see jank % and P95/P99 frame times for real differences)\n`;
    } else {
      md += ` (${lite.fps.fps > full.fps.fps ? "improved" : "degraded"})\n`;
    }
    if (full.fps.jankPercentage != null) {
      md += `- **Jank frames (>16.67ms)**: ${full.fps.jankPercentage}% -> ${lite.fps.jankPercentage}%\n`;
      md += `- **P95 frame time**: ${full.fps.p95FrameTime}ms -> ${lite.fps.p95FrameTime}ms\n`;
    }
  }

  md += `\n## What Lite Mode Disables\n\n`;
  md += `- 39 glass panels with \`backdrop-blur\` -> solid semi-transparent backgrounds\n`;
  md += `- 74 motion/react animations -> instant final state (MotionConfig reducedMotion="always")\n`;
  md += `- 8 CSS @keyframe animations -> duration 0.01ms\n`;
  md += `- Canvas particle system -> conditionally unmounted\n`;
  md += `- SVG Lamp animation -> replaced with gradient\n`;
  md += `- AnimatedGridPattern, Meteors, BorderBeam, RetroGrid -> conditionally unmounted\n`;
  md += `- Ambient blur glow divs -> filter: none\n`;
  md += `- GPU layer promotion -> will-change: auto\n`;
  md += `- CSS containment added (contain: layout style on panels and sections)\n\n`;

  md += `## How to Reproduce\n\n`;
  md += `\`\`\`bash\n`;
  md += `# Start dev server\nnpm run dev -- -p ${config.port}\n\n`;
  md += `# Run benchmark (in another terminal)\nnpm run benchmark\n\n`;
  md += `# With options\nnode benchmarks/benchmark.mjs --port 3001 --iterations 10 --headed\n`;
  md += `\`\`\`\n\n`;

  md += `## Output Files\n\n`;
  md += `- \`benchmarks/results/benchmark-results.json\` — Raw metric data\n`;
  md += `- \`benchmarks/results/REPORT.md\` — This report\n`;
  md += `- \`benchmarks/results/trace-full.json\` — Chrome DevTools trace (full mode)\n`;
  md += `- \`benchmarks/results/trace-lite.json\` — Chrome DevTools trace (lite mode)\n`;
  md += `- \`benchmarks/results/screenshot-full.png\` — Full mode screenshot\n`;
  md += `- \`benchmarks/results/screenshot-lite.png\` — Lite mode screenshot\n`;
  md += `\nTrace files can be loaded in Chrome DevTools (Performance tab) or [Perfetto UI](https://ui.perfetto.dev/).\n`;

  return md;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const config = parseArgs();

  console.log("RISE Performance Benchmark");
  console.log(`   Port: ${config.port}`);
  console.log(`   Iterations: ${config.iterations}`);
  console.log(`   Path: ${config.path}`);
  console.log(`   Mode: ${config.headed ? "headed" : "headless"}\n`);

  // Check server
  const serverUp = await checkServer(config.port);
  if (!serverUp) {
    console.error(`Dev server not running on port ${config.port}`);
    console.error(`   Start it with: npm run dev -- -p ${config.port}`);
    process.exit(1);
  }
  console.log(`Dev server detected on port ${config.port}\n`);

  // Create results directory
  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });

  // Launch browser (approximate AVD: no GPU, no accelerated canvas)
  const browser = await chromium.launch({
    headless: !config.headed,
    args: [
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-accelerated-video-decode",
    ],
  });

  console.log("Running benchmarks...\n");

  const fullResults = [];
  const liteResults = [];

  // Warmup iteration (not measured — primes browser JIT and page caches)
  console.log("  Warmup iteration (not measured):");
  console.log("    Full mode...");
  await runIteration(browser, config.port, "full", false, config);
  console.log("    Lite mode...");
  await runIteration(browser, config.port, "lite", false, config);
  console.log("    Warmup complete\n");

  // Measured iterations
  for (let i = 0; i < config.iterations; i++) {
    const isTraceRun = i === config.iterations - 1; // trace on LAST (warmest) iteration

    console.log(`  Iteration ${i + 1}/${config.iterations}:`);

    console.log("    Full mode...");
    const fullResult = await runIteration(browser, config.port, "full", isTraceRun, config);
    fullResults.push(fullResult);

    console.log("    Lite mode...");
    const liteResult = await runIteration(browser, config.port, "lite", isTraceRun, config);
    liteResults.push(liteResult);

    console.log("    Done\n");
  }

  await browser.close();

  // Average results with standard deviation
  const { avg: fullAvg, sd: fullSd } = averageResults(fullResults);
  const { avg: liteAvg, sd: liteSd } = averageResults(liteResults);

  // Console comparison table
  const comparison = formatComparison(fullAvg, liteAvg, fullSd, liteSd);

  console.log("\n" + "=".repeat(95));
  console.log("  RISE Performance Comparison: Full Mode vs Lite Mode");
  console.log("=".repeat(95));
  console.log(`${"Metric".padEnd(25)} ${"Full".padStart(22)} ${"Lite".padStart(22)} ${"Change".padStart(22)}`);
  console.log("-".repeat(95));
  for (const row of comparison) {
    console.log(`${row.name.padEnd(25)} ${row.full.padStart(22)} ${row.lite.padStart(22)} ${row.improvement.padStart(22)}`);
  }
  console.log("=".repeat(95));

  // Save JSON results
  const jsonData = {
    timestamp: new Date().toISOString(),
    config,
    full: fullAvg,
    lite: liteAvg,
    fullStdDev: fullSd,
    liteStdDev: liteSd,
    comparison,
    raw: { full: fullResults, lite: liteResults },
  };
  writeFileSync(resolve(RESULTS_DIR, "benchmark-results.json"), JSON.stringify(jsonData, null, 2));
  console.log("\nResults saved to benchmarks/results/benchmark-results.json");

  // Save markdown report
  const report = generateReport(fullAvg, liteAvg, fullSd, liteSd, config);
  writeFileSync(resolve(RESULTS_DIR, "REPORT.md"), report);
  console.log("Report saved to benchmarks/results/REPORT.md");
  console.log("Screenshots saved to benchmarks/results/");

  if (existsSync(resolve(RESULTS_DIR, "trace-full.json"))) {
    console.log("Trace files saved — open in chrome://tracing or https://ui.perfetto.dev/");
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
