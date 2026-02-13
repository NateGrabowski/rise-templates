# RISE Performance Benchmarks

Automated benchmarks comparing **Full Mode** vs **Lite Mode** for Azure Virtual Desktop optimization.

## Quick Start

```bash
# Terminal 1: Start dev server
npm run dev -- -p 3001

# Terminal 2: Run benchmark
npm run benchmark
```

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run benchmark` | CDP metrics, FPS, compositor layers, Web Vitals, trace files |
| `npm run benchmark:lighthouse` | Lighthouse performance scores (requires `lighthouse` + `chrome-launcher`) |

## Main Benchmark (`benchmark.mjs`)

Measures the **rendering cost** of full mode vs lite mode during page load and scroll.

### Metrics Captured

| Metric | Source | Why It Matters for VDI |
|--------|--------|----------------------|
| Layout Count | CDP Performance | Number of reflows triggered |
| Layout Duration | CDP Performance | CPU time spent in layout |
| Style Recalc Count | CDP Performance | Style recalculation operations |
| Style Recalc Duration | CDP Performance | CPU time in style recalc |
| Script Duration | CDP Performance | JS execution time (animation loops) |
| Task Duration | CDP Performance | Total browser task time |
| JS Heap Used | CDP Performance | Memory pressure |
| DOM Nodes | CDP Performance | DOM complexity |
| Compositor Layers | CDP LayerTree | **Key VDI metric** — each layer = RemoteFX encoding cost |
| FPS (scroll) | requestAnimationFrame | User-perceived smoothness |
| FCP / LCP | PerformanceObserver | Paint timing |
| CLS | PerformanceObserver | Layout stability |
| TBT | Long Tasks observer | Main thread blocking |

### Options

```bash
node benchmarks/benchmark.mjs [options]

  --port <number>       Dev server port (default: 3001)
  --iterations <number> Runs per mode (default: 5)
  --headed              Show browser window
```

### Output Files

All output goes to `benchmarks/results/`:

| File | Description |
|------|-------------|
| `benchmark-results.json` | Raw metric data (all iterations + averages) |
| `REPORT.md` | Human-readable comparison table |
| `trace-full.json` | Chrome DevTools trace (full mode) |
| `trace-lite.json` | Chrome DevTools trace (lite mode) |
| `screenshot-full.png` | Full-page screenshot (full mode) |
| `screenshot-lite.png` | Full-page screenshot (lite mode) |

Trace files can be loaded in:
- Chrome DevTools (Performance tab -> Load profile)
- [Perfetto UI](https://ui.perfetto.dev/)

## Lighthouse Comparison (`lighthouse-compare.mjs`)

Runs Google Lighthouse against both modes for standardized performance scoring.

### Setup

```bash
npm install -D lighthouse chrome-launcher
```

### Options

```bash
node benchmarks/lighthouse-compare.mjs [options]

  --port <number>  Dev server port (default: 3001)
  --runs <number>  Runs per mode for averaging (default: 3)
```

### Note

Lighthouse measures initial page load, not ongoing animation performance. Use the main benchmark for scroll/animation metrics that matter most in VDI environments.

## How It Works

1. Launches headless Chromium with GPU disabled (approximates AVD conditions)
2. Navigates to the RISE landing page
3. Sets `data-performance="full"` attribute, reloads, scrolls through page, collects metrics
4. Sets `data-performance="lite"` attribute, reloads, scrolls through page, collects metrics
5. Captures Chrome DevTools traces on the first iteration
6. Averages results across all iterations
7. Outputs comparison table and saves detailed JSON

### Why These Metrics Matter for VDI

Azure Virtual Desktop uses RemoteFX to encode and stream the screen. The key bottlenecks:

- **Compositor layers**: Each `backdrop-blur` forces a new compositing layer. RemoteFX must encode each layer separately. Fewer layers = less encoding work.
- **Paint area**: Animated/blurred regions can't use RemoteFX's efficient delta encoding. Static regions send nothing between frames.
- **Script duration**: Animation JS burns CPU. On VDI (2 vCPU, no GPU), this directly impacts responsiveness.
- **Layout duration**: Reflows are CPU-intensive. Lite mode's `contain: content` on panels eliminates cascading reflows.

## Interpreting Results

| Metric | Good improvement | Why |
|--------|-----------------|-----|
| Compositor Layers | 50%+ reduction | Directly reduces RemoteFX encoding cost |
| Script Duration | 30%+ reduction | Less CPU pressure on VDI's limited vCPUs |
| Layout Duration | 20%+ reduction | Fewer reflows = less jank |
| FPS | Higher in lite | Smoother scrolling experience |
| DOM Nodes | Lower in lite | Less for browser to manage |
