export { cycleMonth } from "./cycleMonth.js";
export { cycleYear } from "./cycleYear.js";
export {
  ImageSet,
  ImageSize,
  ImageQuality,
  SYNODIC_MONTH,
  MONTH_IMAGES,
  YEAR_IMAGES,
  MONTH_ANCHOR,
  YEAR_ANCHOR,
} from "./types.js";
export { imageFolder, cdnUrl } from "./helpers.js";

// ── Opt-in anonymous telemetry ────────────────────────────────────────────────
// Off by default. Enable: ACAMARATA_TELEMETRY=1
// What is sent + how to disable: https://github.com/acamarata/telemetry/blob/main/TELEMETRY.md
import("@acamarata/telemetry")
  .then(({ track }) => track("load", { package: "moon-cycle", version: "2.0.0" }))
  .catch(() => {
    // telemetry not installed or disabled — that's fine
  });
