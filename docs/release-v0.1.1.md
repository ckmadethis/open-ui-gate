# OpenUI Gate v0.1.1

Rename and licence polish release.

OpenUI Gate is a tiny CLI and hook pack for teams using coding agents to build frontend surfaces.

## What Changed

- Renamed the project and package to `open-ui-gate`.
- Switched the licence posture to Apache-2.0 with NOTICE and trademark guidance.
- Added a Node test suite for pass/fail, JSON output and usage errors.
- Kept GitHub Actions usage documented in the README.
- Added contribution, security and conduct guidance.
- De-duped overlapping findings on the same rule/file/line.

## What It Does

- Scans `.tsx`, `.jsx`, `.html`, `.css`, `.scss`, `.sass` and `.less` files.
- Flags placeholder content, generic AI copy, purple gradient defaults, decorative blobs, weak CTAs, fake image placeholders, missing image alt text and nested-card risk.
- Outputs text or JSON.
- Supports `--fail-on info|warn|error` for CI usage.
- Includes a Claude Code pre-tool hook and a copyable agent skill.

## Try It

```bash
npx --yes github:ckmadethis/open-ui-gate scan --path ./app --fail-on warn
```

## Why

Coding agents can ship frontend code quickly. The new failure mode is UI that compiles but looks generic. OpenUI Gate is a small checkpoint before that work reaches a commit.

## Links

- Repo: https://github.com/ckmadethis/open-ui-gate
- Launch kit: https://github.com/ckmadethis/open-ui-gate/blob/master/docs/launch-kit.md
