#!/usr/bin/env node
/**
 * RISE Lighthouse Comparison — Full Mode vs Lite Mode
 *
 * Runs Lighthouse against both performance modes and generates
 * a side-by-side comparison of standard performance scores.
 *
 * Usage: node benchmarks/lighthouse-compare.mjs [--port 3001] [--runs 3]
 *
 * Requires: npm install -D lighthouse chrome-launcher
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = resolve(__dirname, "results");

// ─── CLI Args ───────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { port: 3001, runs: 3 };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--port") config.port = parseInt(args[++i]);
    if (args[i] === "--runs") config.runs = parseInt(args[++i]);
  }
  return config;
}

// ─── Dynamic Import Check ───────────────────────────────────────────────────

async function loadDeps() {
  try {
    const lighthouse = (await import("lighthouse")).default;
    const chromeLauncher = await import("chrome-launcher");
    return { lighthouse, chromeLauncher };
  } catch {
    console.error("Missing dependencies. Install them with:");
    console.error("  npm install -D lighthouse chrome-launcher");
    process.exit(1);
  }
}

// ─── Run Lighthouse ─────────────────────────────────────────────────────────

async function runLighthouse(lighthouse, chrome, url, config) {
  const result = await lighthouse(url, { port: chrome.port, output: "json" }, config);
  const { lhr } = result;

  return {
    performance: Math.round((lhr.categories.performance?.score || 0) * 100),
    fcp: lhr.audits["first-contentful-paint"]?.numericValue,
    lcp: lhr.audits["largest-contentful-paint"]?.numericValue,
    tbt: lhr.audits["total-blocking-time"]?.numericValue,
    cls: lhr.audits["cumulative-layout-shift"]?.numericValue,
    si: lhr.audits["speed-index"]?.numericValue,
    tti: lhr.audits["interactive"]?.numericValue,
  };
}

// ─── Average Runs ───────────────────────────────────────────────────────────

function averageRuns(runs) {
  const avg = {};
  const keys = Object.keys(runs[0]);
  for (const key of keys) {
    const vals = runs.map((r) => r[key]).filter((v) => v != null);
    avg[key] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : null;
  }
  return avg;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const config = parseArgs();
  const { lighthouse, chromeLauncher } = await loadDeps();

  console.log("RISE Lighthouse Comparison");
  console.log(`   Port: ${config.port}`);
  console.log(`   Runs per mode: ${config.runs}\n`);

  // Check server
  try {
    await fetch(`http://localhost:${config.port}`);
  } catch {
    console.error(`Dev server not running on port ${config.port}`);
    console.error(`   Start it with: npm run dev -- -p ${config.port}`);
    process.exit(1);
  }

  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });

  // Desktop config (no throttling for fair local comparison)
  const lhConfig = {
    extends: "lighthouse:default",
    settings: {
      formFactor: "desktop",
      screenEmulation: { mobile: false, width: 1920, height: 1080, deviceScaleFactor: 1 },
      throttling: { rttMs: 0, throughputKbps: 0, cpuSlowdownMultiplier: 1 },
      onlyCategories: ["performance"],
    },
  };

  const baseUrl = `http://localhost:${config.port}`;

  // We set the mode via a query parameter that our page can read,
  // or more reliably, we'll use Lighthouse's --extra-headers or
  // just measure the page as-is (full mode first, then manually toggle)
  // Since Lighthouse spawns its own Chrome, we'll run it against
  // the page and set mode via localStorage script injection.

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  console.log("Running Lighthouse (full mode)...");
  const fullRuns = [];
  for (let i = 0; i < config.runs; i++) {
    console.log(`  Run ${i + 1}/${config.runs}...`);
    const result = await runLighthouse(lighthouse, chrome, baseUrl, lhConfig);
    fullRuns.push(result);
  }
  const fullAvg = averageRuns(fullRuns);

  // For lite mode, we add a script via Lighthouse's extraHeaders to set the attribute
  // Since we can't inject JS before page load in Lighthouse easily,
  // we'll use a URL with a hash that our app could read, or just
  // note that Lighthouse measures initial page load which won't
  // show animation differences well. The main benchmark.mjs handles that.
  // Here we just run Lighthouse against the default state for both runs.

  console.log("\nRunning Lighthouse (lite mode)...");
  console.log("  Note: Lighthouse measures initial page load. For animation");
  console.log("  differences, see the main benchmark (npm run benchmark).\n");

  // Emulate prefers-reduced-motion to trigger PerformanceProvider's auto-detection
  const liteConfig = {
    ...lhConfig,
    settings: {
      ...lhConfig.settings,
      emulatedMediaFeatures: [
        { name: "prefers-reduced-motion", value: "reduce" },
      ],
    },
  };

  const liteRuns = [];
  for (let i = 0; i < config.runs; i++) {
    console.log(`  Run ${i + 1}/${config.runs}...`);
    const result = await runLighthouse(lighthouse, chrome, baseUrl, liteConfig);
    liteRuns.push(result);
  }
  const liteAvg = averageRuns(liteRuns);

  await chrome.kill();

  // Output comparison
  console.log("\n" + "=".repeat(65));
  console.log("  Lighthouse Comparison: Full Mode vs Lite Mode");
  console.log("=".repeat(65));

  const metrics = [
    ["Performance Score", "performance", ""],
    ["First Contentful Paint", "fcp", "ms"],
    ["Largest Contentful Paint", "lcp", "ms"],
    ["Total Blocking Time", "tbt", "ms"],
    ["Cumulative Layout Shift", "cls", ""],
    ["Speed Index", "si", "ms"],
    ["Time to Interactive", "tti", "ms"],
  ];

  console.log(`${"Metric".padEnd(28)} ${"Full".padStart(10)} ${"Lite".padStart(10)} ${"Delta".padStart(12)}`);
  console.log("-".repeat(65));

  const comparisonRows = [];
  for (const [label, key, unit] of metrics) {
    const fv = fullAvg[key];
    const lv = liteAvg[key];
    const fStr = fv != null ? `${fv}${unit}` : "N/A";
    const lStr = lv != null ? `${lv}${unit}` : "N/A";
    let delta = "N/A";
    if (fv != null && lv != null && fv !== 0) {
      const pct = Math.round(((fv - lv) / fv) * 1000) / 10;
      delta = `${pct >= 0 ? "-" : "+"}${Math.abs(pct)}%`;
    }
    console.log(`${label.padEnd(28)} ${fStr.padStart(10)} ${lStr.padStart(10)} ${delta.padStart(12)}`);
    comparisonRows.push({ metric: label, full: fStr, lite: lStr, delta });
  }

  console.log("=".repeat(65));

  // Save results
  const jsonData = {
    timestamp: new Date().toISOString(),
    config,
    full: fullAvg,
    lite: liteAvg,
    comparison: comparisonRows,
    raw: { full: fullRuns, lite: liteRuns },
  };
  writeFileSync(resolve(RESULTS_DIR, "lighthouse-results.json"), JSON.stringify(jsonData, null, 2));
  console.log("\nResults saved to benchmarks/results/lighthouse-results.json");

  console.log("\nNote: Lighthouse scores primarily reflect initial page load.");
  console.log("For scroll/animation performance, use: npm run benchmark");
}

main().catch((err) => {
  console.error("Lighthouse comparison failed:", err);
  process.exit(1);
});
