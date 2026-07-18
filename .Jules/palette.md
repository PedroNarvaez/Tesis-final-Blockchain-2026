# Palette's Journal - ConciliaLedger Enterprise

## 2025-02-17 - Form Control Accessibility and Input Hit Targets
**Learning:** In highly technical business dashboards (like fintech reconciliation systems), rule configuration forms are heavily used but often lack basic keyboard accessibility and clear click target zones. Specifically, simple text spans wrapping checkbox descriptions do not act as hit targets, forcing users to click the exact small checkbox square. Moreover, inputs lacking associated `<label htmlFor="...">` attributes make screen reader navigation disjointed and hard to track.
**Action:** Always map labels directly to inputs via `htmlFor` and `id`, transform simple checkbox wrapper `div`s with separate `span`s into unified clickable `<label>` targets, and add focus indicators via `focus-visible:ring-2` to support seamless keyboard navigation.
