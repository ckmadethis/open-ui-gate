# Launch Note

Agent Design Gate is the first CKMADETHIS open-source drop aimed at the AI coding-agent ecosystem.

## Positioning

AI coding agents can make working frontends quickly. The hard part is stopping the output from looking like every other agent-generated SaaS page.

Agent Design Gate is a tiny CLI and hook pack that catches those patterns before the agent says "done".

## First Post

I kept watching coding agents ship frontend work that was technically correct but visually generic: purple gradients, vague CTAs, placeholder copy, fake image slots and card soup.

So I extracted my own frontend gate into a small OSS tool:

`agent-design-gate`

It scans UI files for common AI slop patterns and includes hook/skill snippets for Claude Code, Codex-style workflows and other agent setups.

Not a replacement for taste. A speed bump before bad UI becomes a commit.

