---
name: open-ui-gate
description: Use when building, editing, reviewing, or shipping frontend UI with an AI coding agent.
version: 0.1.0
---

# OpenUI Gate

When frontend files are changed, treat design quality as a shipping gate, not a vibe check.

## Required Checks

1. Confirm the page has real product-specific copy.
2. Remove placeholder content, fake screenshots, fake stats and lorem text.
3. Avoid default AI palettes: purple/indigo/violet gradients, decorative blobs, bokeh and random orbs.
4. Use concrete layout constraints so text and controls cannot overlap on mobile or desktop.
5. Use real image/media assets when the user needs to inspect a product, place, person, object or state.
6. Make CTA labels specific to the action.
7. Run the CLI before final response:

```bash
open-ui-gate scan --path . --fail-on warn
```

## Pass Line

When complete, state:

`DESIGN-GATE: pass (open-ui-gate scan run, no warn/error findings)`.

If the task only touched a non-UI bug or config:

`DESIGN-GATE: N/A - no new UI surface`.
