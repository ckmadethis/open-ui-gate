# OpenUI Gate Launch Kit

## Core Positioning

OpenUI Gate is ESLint for AI-looking UI.

It catches frontend patterns that coding agents overproduce: placeholder copy, vague CTAs, fake image slots, purple gradients, decorative blobs and card soup.

Primary URL: https://github.com/ckmadethis/open-ui-gate

Install:

```bash
npx --yes github:ckmadethis/open-ui-gate scan --path ./app --fail-on warn
```

## One-Line Hooks

- ESLint catches broken code. OpenUI Gate catches AI-looking UI.
- Stop letting agents ship purple-gradient SaaS soup.
- A tiny quality gate for frontend code written by coding agents.
- Your coding agent needs a taste checkpoint before it says done.
- I made a CLI that fails builds when UI smells like an AI template.

## Hacker News

Title:

```text
Show HN: OpenUI Gate - ESLint for AI-looking UI
```

Body:

```text
I built a small CLI and hook pack for frontend teams using coding agents.

It scans UI files for the patterns agents keep shipping: placeholder copy, vague CTAs, fake image placeholders, purple gradients, decorative blobs, missing image alt text and nested-card layouts.

It is intentionally simple: not a replacement for taste, just a hard checkpoint before an agent says "done".

Run:

npx --yes github:ckmadethis/open-ui-gate scan --path ./app --fail-on warn

Repo:
https://github.com/ckmadethis/open-ui-gate
```

## X Post

```text
I kept watching coding agents ship frontend work that compiled but looked generic:

- purple gradients
- vague CTAs
- fake image slots
- "unlock the power" copy
- card soup

So I made OpenUI Gate.

ESLint for AI-looking UI.

npx --yes github:ckmadethis/open-ui-gate scan --path ./app --fail-on warn

https://github.com/ckmadethis/open-ui-gate
```

## LinkedIn Post

```text
I released OpenUI Gate, a small open-source CLI for teams using coding agents to build frontend surfaces.

The problem is not that agents cannot write frontend code. They can.

The problem is that their first pass often looks generic: placeholder copy, vague CTAs, fake image slots, one-note gradients and nested cards everywhere.

OpenUI Gate scans UI files for those patterns before the agent calls the task finished.

It is not a replacement for taste or design review. It is a practical quality gate for agent-generated UI.

Try it:
npx --yes github:ckmadethis/open-ui-gate scan --path ./app --fail-on warn

Repo:
https://github.com/ckmadethis/open-ui-gate
```

## Reddit Feedback Post

Do not post the same link across many subreddits. Use one relevant community at a time, disclose that you built it, and ask for feedback.

```text
I built a small CLI for catching generic frontend patterns from coding agents. Looking for feedback from people using Claude Code, Codex, Cursor or similar tools.

It checks for placeholder copy, vague CTAs, fake image placeholders, purple gradients, missing image alt text and nested-card layouts.

I am not trying to replace design review; I want a simple pre-commit/CI speed bump before agent-generated UI ships.

What rules would you add or remove?

Repo: https://github.com/ckmadethis/open-ui-gate
```

Candidate communities to evaluate manually:

- r/webdev
- r/Frontend
- r/reactjs
- r/ClaudeAI
- r/LocalLLaMA
- r/SideProject
- r/opensource

Reddit guardrail: do not cross-post the same link repeatedly. Reddit's spam help specifically warns that if contributions mainly consist of links to a business or project you benefit from, posting frequency needs to be thoughtful.

## Dev.to / Hashnode Article Outline

Title:

```text
I Built ESLint for AI-Looking UI
```

Outline:

1. The new frontend failure mode: generated code that compiles but looks generic.
2. The patterns agents overproduce.
3. Why a small CLI beats another style guide paragraph.
4. How OpenUI Gate works.
5. How to wire it into Claude Code, Codex-style workflows and CI.
6. What rules should be added next.

CTA:

```text
Try it on a frontend repo and open an issue with the first false positive:
https://github.com/ckmadethis/open-ui-gate
```

## Product Hunt

Use Product Hunt after npm is published or a hosted demo page exists.

Tagline:

```text
ESLint for AI-looking UI
```

Short description:

```text
OpenUI Gate is a tiny CLI and hook pack that catches generic frontend patterns produced by coding agents before they ship.
```

Maker comment:

```text
I built OpenUI Gate after watching coding agents produce frontend work that was technically correct but visually generic.

The first release catches placeholder copy, vague CTAs, fake image slots, purple/indigo gradient defaults, decorative blobs, missing image alt text and nested-card risk.

It is deliberately small. I want it to become a practical quality gate for teams using Claude Code, Codex, Cursor and similar tools.

Would love rule suggestions and false-positive reports.
```

## Maintainer Outreach

Subject:

```text
Small frontend quality gate for AI-generated UI
```

Body:

```text
Hey {name},

I released a tiny OSS tool that may fit your agent/frontend workflow:

https://github.com/ckmadethis/open-ui-gate

It scans UI files for generic patterns coding agents overproduce: placeholder copy, vague CTAs, fake image slots, purple gradients, missing image alt text and nested-card layouts.

Not asking for promo. I would value one blunt rule suggestion or false-positive case if you have a minute.

Tayne
CKMADETHIS
```

## Launch Sequence

1. GitHub release.
2. X post with repo link.
3. LinkedIn post with repo link.
4. Hacker News Show HN.
5. One Reddit feedback post in the most relevant community.
6. Dev.to/Hashnode article.
7. Direct outreach to agent-tool maintainers and frontend builders.
8. Publish npm package.
9. Product Hunt after npm package and demo page are live.
10. Submit focused PRs to curated awesome lists only where the project fits.

## Submission References

- Hacker News Show page: https://news.ycombinator.com/show
- Product Hunt launch guide: https://www.producthunt.com/launch
- Reddit spam guidance: https://support.reddithelp.com/hc/articles/360043504051
