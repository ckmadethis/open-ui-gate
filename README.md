# Agent Design Gate

ESLint catches broken code. Agent Design Gate catches AI-looking UI.

`agent-design-gate` is a tiny CLI and hook pack for teams using Claude Code, Codex, Cursor or other coding agents to build frontend surfaces. It scans UI files for the generic patterns agents keep shipping: placeholder copy, purple gradients, vague CTAs, fake images, nested-card layouts and frontend edits made without design context.

The point is not to replace taste. The point is to give agents a hard checklist before they call a task finished.

```bash
npx --yes github:ckmadethis/agent-design-gate scan --path ./app --fail-on warn
```

## The 10 Second Demo

Bad agent-generated UI gets stopped:

```bash
$ node ./bin/agent-design-gate.mjs scan --path fixtures/bad-ui --fail-on warn
agent-design-gate: scanned 1 UI files
[ERROR] placeholder-content page.tsx:7 - Placeholder content is visible in UI code. (Lorem ipsum)
[WARN] generic-ai-copy page.tsx:6 - Generic marketing phrase often produced by AI agents. (Unlock the power)
[WARN] purple-gradient-default page.tsx:3 - Dominant purple/indigo/violet gradients often read as generic AI UI.
[INFO] weak-command-copy page.tsx:9 - Weak CTA text needs product-specific context nearby. (>Learn more<)
[ERROR] missing-image-alt page.tsx:8 - Image-like element is missing alt text. (<img)
```

Intentional UI passes:

```bash
$ node ./bin/agent-design-gate.mjs scan --path fixtures/good-ui --fail-on warn
agent-design-gate: scanned 1 UI files
PASS: no findings
```

## Why This Exists

Agent coding tools are getting plugin and skill systems. Claude Code supports custom plugins with skills, agents, hooks and MCP servers. Codex-style workflows now have reusable skills and browser/code tools. Cursor and similar editors make it easy to generate frontend code at speed.

That speed creates a new failure mode: the UI compiles, but it looks like a generic agent template.

Most teams already run ESLint. Fewer teams run a taste gate.

## Install

Run directly from GitHub today:

```bash
npx --yes github:ckmadethis/agent-design-gate scan --path ./app --fail-on warn
```

Local development:

```bash
git clone https://github.com/ckmadethis/agent-design-gate.git
cd agent-design-gate
node ./bin/agent-design-gate.mjs scan --path ./fixtures/bad-ui --fail-on warn
```

NPM package name is available, but not published yet. After publishing to npm, this will become the stable install path:

```bash
npm install -g agent-design-gate
```

## Usage

```bash
agent-design-gate scan --path ./app
agent-design-gate scan --path ./app --format json
agent-design-gate scan --path ./app --fail-on warn
```

Exit codes:

- `0`: no findings at or above the fail level
- `1`: findings reached `--fail-on`
- `2`: usage or filesystem error

## What It Checks

- Placeholder content: `lorem ipsum`, `Feature One`, `Your Company`, `TODO`
- Generic AI copy: `streamline your workflow`, `unlock the power`, `revolutionary`, `best-in-class`
- One-note AI palettes: dominant purple/indigo/violet gradients
- Decorative blob backgrounds: orb/blob/bokeh decoration that often reads template-like
- Weak commands: `Learn more`, `Get started`, `Submit` without nearby product-specific context
- Missing asset signal: image-like placeholders without real `src`, `alt` or media path
- Nested cards: repeated `card`/`rounded` containers inside other card-like wrappers
- Frontend edits without design context: optional hook warning for `.tsx`, `.jsx`, `.html`, `.css`, `.scss`

## Claude Code Hook

Copy `hooks/claude-code-pre-tool-use.mjs` into your hooks directory and add:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/hooks/claude-code-pre-tool-use.mjs",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

The hook does not block by default. It injects a reminder when the agent edits frontend files. Use the CLI in CI to fail builds.

## GitHub Actions

Use this as a lightweight UI quality gate in frontend repos:

```yaml
name: Agent Design Gate

on:
  pull_request:
    paths:
      - "**/*.tsx"
      - "**/*.jsx"
      - "**/*.html"
      - "**/*.css"
      - "**/*.scss"

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx --yes github:ckmadethis/agent-design-gate scan --path ./src --fail-on warn
```

## Agent Skill

See `skills/agent-design-gate/SKILL.md` for a copyable skill that tells an agent how to use the gate during frontend work.

## Public Roadmap

- `scan-diff` mode for PR review
- Rule configuration via `agent-design-gate.config.json`
- Playwright screenshot audit helper
- Rulesets for SaaS, ecommerce, portfolios, dashboards and docs
- Claude/Codex plugin package
- First-class GitHub Action
- NPM package

## Launch Kit

See `docs/launch-kit.md` for share copy, submission titles and channel-specific launch notes.

## Origin

Extracted from CKMADETHIS frontend operating rules and made public as a small, generic agent quality gate.
