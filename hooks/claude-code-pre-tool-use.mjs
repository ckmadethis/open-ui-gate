#!/usr/bin/env node
import { readFileSync } from "node:fs";

let raw = "";
try {
  raw = readFileSync(0, "utf8");
} catch {}

let payload = {};
try {
  payload = JSON.parse(raw || "{}");
} catch {}

const input = payload.tool_input || {};
const filePath = String(input.file_path || input.path || "").replace(/\\/g, "/").toLowerCase();
const toolName = String(payload.tool_name || "");

const isWriteTool = /^(Edit|Write|MultiEdit|NotebookEdit)$/i.test(toolName);
const isFrontend = /\.(tsx|jsx|html|css|scss|sass|less)$/.test(filePath) || /tailwind\.config\./.test(filePath);
const isExcluded = /node_modules|\.d\.ts$|\.test\.|\.spec\.|\/types\/|package\.json|tsconfig/.test(filePath);

if (!isWriteTool || !isFrontend || isExcluded) {
  process.stdout.write("{}");
  process.exit(0);
}

process.stdout.write(JSON.stringify({
  systemMessage: [
    "AGENT DESIGN GATE: frontend file edit detected.",
    "",
    "Before finishing, verify the UI is not generic agent output:",
    "- real product-specific copy, no lorem/TODO/placeholder content",
    "- no default purple/indigo gradient palette unless brand-specific",
    "- no decorative blob/orb/bokeh filler",
    "- real images/media have stable src and useful alt text",
    "- CTA text is specific to the user action",
    "- layout is checked on mobile and desktop",
    "",
    "Run: agent-design-gate scan --path . --fail-on warn",
    "If this is a bug fix only, state: design gate N/A - no new UI surface."
  ].join("\\n")
}));

