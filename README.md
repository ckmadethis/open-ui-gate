# Agent Design Gate

Catch generic AI frontend output before it ships.

`agent-design-gate` is a small CLI and hook pack for teams using Claude Code, Codex, Cursor or any coding agent to build frontend surfaces. It scans UI files for common "AI slop" patterns: generic marketing copy, one-note gradient palettes, missing assets, vague buttons, placeholder content, nested-card layouts and frontend edits made without a design brief.

The point is not to replace taste. The point is to give agents a hard checklist before they call a task finished.

## Why This Exists

Agent coding tools are getting plugin and skill systems. Claude Code supports custom plugins with skills, agents, hooks and MCP servers. OpenAI Codex also now has plugins and skills for reusable workflows. The missing wedge is quality control for the frontend work those agents produce.

Most teams already run ESLint. Fewer teams run a taste gate.

## Install

```bash
npm install -g agent-design-gate
```

For local use before publishing:

```bash
node ./bin/agent-design-gate.mjs scan --path ./your-app
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

## Agent Skill

See `skills/agent-design-gate/SKILL.md` for a copyable skill that tells an agent how to use the gate during frontend work.

## Public Roadmap

- `scan-diff` mode for PR review
- Playwright screenshot audit helper
- Rulesets for SaaS, ecommerce, portfolios, dashboards and docs
- Claude/Codex plugin package
- GitHub Action

## Origin

Extracted from CKMADETHIS frontend operating rules and made public as a small, generic agent quality gate.

