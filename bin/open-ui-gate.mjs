#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const VERSION = "0.1.1";

const UI_EXTENSIONS = new Set([".tsx", ".jsx", ".html", ".css", ".scss", ".sass", ".less"]);
const IGNORE_SEGMENTS = new Set(["node_modules", ".git", ".next", "dist", "build", ".turbo", "coverage"]);

const DEFAULT_RULES = [
  {
    id: "placeholder-content",
    level: "error",
    description: "Placeholder content is visible in UI code.",
    patterns: [
      "\\blorem ipsum\\b",
      "\\bFeature One\\b",
      "\\bFeature Two\\b",
      "\\bYour Company\\b",
      "\\bTODO\\b",
      "\\bComing soon\\b"
    ]
  },
  {
    id: "generic-ai-copy",
    level: "warn",
    description: "Generic marketing phrase often produced by AI agents.",
    patterns: [
      "streamline your workflow",
      "unlock the power",
      "revolutioni[sz]e",
      "game-changing",
      "best-in-class",
      "cutting-edge",
      "seamless experience"
    ]
  },
  {
    id: "purple-gradient-default",
    level: "warn",
    description: "Dominant purple/indigo/violet gradients often read as generic AI UI.",
    patterns: [
      "from-(purple|violet|indigo)-",
      "to-(purple|violet|indigo)-",
      "bg-gradient-to-[a-z]+[^\\n]*(purple|violet|indigo)",
      "#(6d28d9|7c3aed|8b5cf6|6366f1|4f46e5)"
    ]
  },
  {
    id: "decorative-blob-background",
    level: "warn",
    description: "Decorative orb/blob/bokeh backgrounds are frequently filler.",
    patterns: [
      "\\borb\\b",
      "\\bblob\\b",
      "\\bbokeh\\b",
      "blur-3xl",
      "radial-gradient"
    ]
  },
  {
    id: "weak-command-copy",
    level: "info",
    description: "Weak CTA text needs product-specific context nearby.",
    patterns: [
      ">\\s*Learn more\\s*<",
      ">\\s*Get started\\s*<",
      ">\\s*Submit\\s*<",
      "aria-label=[\"']Learn more[\"']"
    ]
  },
  {
    id: "missing-image-alt",
    level: "error",
    description: "Image-like element is missing alt text.",
    patterns: [
      "<img(?![^>]*\\balt=)"
    ]
  },
  {
    id: "fake-image-placeholder",
    level: "warn",
    description: "Image placeholder or fake media token found.",
    patterns: [
      "placeholder\\.(png|jpg|jpeg|webp|svg)",
      "placehold\\.co",
      "picsum\\.photos",
      "\\[REPLACE_IMAGE\\]",
      "image-placeholder"
    ]
  },
  {
    id: "nested-card-risk",
    level: "info",
    description: "Multiple card-like wrappers in one file; inspect for card-in-card layout.",
    countPattern: "class(Name)?=\\{?['\"][^'\"]*(card|rounded-)",
    minCount: 8
  }
];

const LEVEL_RANK = { info: 1, warn: 2, error: 3 };

function parseArgs(argv) {
  const args = { command: "scan", path: ".", format: "text", failOn: "error" };
  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith("--")) args.command = rest.shift();
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--version" || arg === "-v") args.version = true;
    else if (arg === "--path") args.path = rest[++i];
    else if (arg.startsWith("--path=")) args.path = arg.slice("--path=".length);
    else if (arg === "--format") args.format = rest[++i];
    else if (arg.startsWith("--format=")) args.format = arg.slice("--format=".length);
    else if (arg === "--fail-on") args.failOn = rest[++i];
    else if (arg.startsWith("--fail-on=")) args.failOn = arg.slice("--fail-on=".length);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function usage() {
  return `open-ui-gate ${VERSION}

Usage:
  open-ui-gate scan --path ./app [--format text|json] [--fail-on info|warn|error]

Examples:
  open-ui-gate scan --path .
  open-ui-gate scan --path ./src --format json --fail-on warn
`;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_SEGMENTS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && UI_EXTENSIONS.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function scanFile(file, root) {
  const content = readFileSync(file, "utf8");
  const relativeFile = relative(root, file).replace(/\\/g, "/");
  const findings = [];
  const seenFindings = new Set();

  function addFinding(finding) {
    const key = `${finding.rule}:${finding.file}:${finding.line}`;
    if (seenFindings.has(key)) return;
    seenFindings.add(key);
    findings.push(finding);
  }

  for (const rule of DEFAULT_RULES) {
    if (rule.patterns) {
      for (const pattern of rule.patterns) {
        const re = new RegExp(pattern, "gi");
        let match;
        while ((match = re.exec(content)) !== null) {
          addFinding({
            rule: rule.id,
            level: rule.level,
            description: rule.description,
            file: relativeFile,
            line: lineNumber(content, match.index),
            match: match[0].slice(0, 120)
          });
          if (match.index === re.lastIndex) re.lastIndex++;
        }
      }
    }

    if (rule.countPattern) {
      const re = new RegExp(rule.countPattern, "gi");
      const count = [...content.matchAll(re)].length;
      if (count >= rule.minCount) {
        addFinding({
          rule: rule.id,
          level: rule.level,
          description: `${rule.description} Found ${count} card-like wrappers.`,
          file: relativeFile,
          line: 1,
          match: `${count} matches`
        });
      }
    }
  }

  return findings;
}

function scan(rootPath) {
  if (!existsSync(rootPath)) throw new Error(`Path not found: ${rootPath}`);
  if (!statSync(rootPath).isDirectory()) throw new Error(`Path is not a directory: ${rootPath}`);
  const files = walk(rootPath);
  const findings = files.flatMap((file) => scanFile(file, rootPath));
  return { filesScanned: files.length, findings };
}

function formatText(result) {
  const lines = [];
  lines.push(`open-ui-gate: scanned ${result.filesScanned} UI files`);
  if (result.findings.length === 0) {
    lines.push("PASS: no findings");
    return lines.join("\n");
  }
  for (const finding of result.findings) {
    lines.push(
      `[${finding.level.toUpperCase()}] ${finding.rule} ${finding.file}:${finding.line} - ${finding.description} (${finding.match})`
    );
  }
  return lines.join("\n");
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
    if (args.version) {
      console.log(VERSION);
      process.exit(0);
    }
    if (args.help || args.command !== "scan") {
      console.log(usage());
      process.exit(args.help ? 0 : 2);
    }
    if (!LEVEL_RANK[args.failOn]) throw new Error("--fail-on must be info, warn or error");
    if (!["text", "json"].includes(args.format)) throw new Error("--format must be text or json");

    const result = scan(args.path);
    if (args.format === "json") console.log(JSON.stringify(result, null, 2));
    else console.log(formatText(result));

    const threshold = LEVEL_RANK[args.failOn];
    const shouldFail = result.findings.some((finding) => LEVEL_RANK[finding.level] >= threshold);
    process.exit(shouldFail ? 1 : 0);
  } catch (error) {
    console.error(`open-ui-gate: ${error.message}`);
    console.error(usage());
    process.exit(2);
  }
}

main();
