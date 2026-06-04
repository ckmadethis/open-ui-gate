# Agent Design Gate v0.1.0

First public release.

Agent Design Gate is a tiny CLI and hook pack for teams using coding agents to build frontend surfaces.

## What It Does

- Scans `.tsx`, `.jsx`, `.html`, `.css`, `.scss`, `.sass` and `.less` files.
- Flags placeholder content, generic AI copy, purple gradient defaults, decorative blobs, weak CTAs, fake image placeholders, missing image alt text and nested-card risk.
- Outputs text or JSON.
- Supports `--fail-on info|warn|error` for CI usage.
- Includes a Claude Code pre-tool hook and a copyable agent skill.

## Try It

```bash
npx --yes github:ckmadethis/agent-design-gate scan --path ./app --fail-on warn
```

## Why

Coding agents can ship frontend code quickly. The new failure mode is UI that compiles but looks generic. Agent Design Gate is a small checkpoint before that work reaches a commit.

## Links

- Repo: https://github.com/ckmadethis/agent-design-gate
- Launch kit: https://github.com/ckmadethis/agent-design-gate/blob/master/docs/launch-kit.md
