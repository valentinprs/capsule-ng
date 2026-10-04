# Capsule grouped actions — issue #34

## API decision

The validated reference is Carbon **Angular**, adapted without new Capsule knobs. Issue #34's initial samples were proposals. [Carbon ButtonSet](https://angular.carbondesignsystem.com/documentation/components/ButtonSet.html) supplies `fluid=false` and `stacked=false`; fluid takes precedence. ButtonGroup has no selection state or value accessor. Its controls remain native buttons, links or inputs, with `CapsButton` managing button appearance and individual sizes.

[Carbon Toggle](https://github.com/carbon-design-system/carbon-components-angular/blob/master/src/toggle/toggle.component.ts) is a `role="switch"` control with checked state. It cannot replace the existing pressed button. Carbon ContentSwitcher is a tablist, not a group of pressed buttons. Toggle and ToggleGroup therefore preserve their existing Brain capabilities and visual choices, without importing switch/tab behavior or adding new APIs. Brain remains unchanged.

## Anatomy and bindings

- `button[capsToggle]`: `state="on"|"off"` and `stateChange`; existing `value`, `disabled`, `id`, `aria-label`, button `type`; existing `variant="default"|"outline"` and `size="default"|"sm"|"lg"`. No standalone CVA.
- `caps-toggle-group` with `button[capsToggleItem]`: Brain `type="single"|"multiple"`, `value`/`valueChange`, `nullable=true`, `disabled=false`, and existing Angular value accessor. Existing visual `variant`, `size`, `spacing=0`, `orientation="horizontal"|"vertical"` are preserved. The item keeps the prior Brain inputs/model. The group owns selection. Brain's `change` output was not exposed by Helm and has no consumers; Capsule also does not expose it or introduce an alias.
- `caps-button-group`: `fluid=false`, `stacked=false`, projected native controls, noninteractive `caps-button-group-text`, and existing `caps-separator`. Former vertical orientation becomes `stacked`. No new size/orientation/density API.

Groups are structural custom elements; native interactive directives keep activation, focus and button type on their hosts (ADR 0001). ToggleGroup is a `role="group"` with `aria-pressed` choices. Tab visits enabled buttons; Enter and Space activate them. There are no arrow handlers or roving tabindex. ButtonGroup has neither persistent selection nor synthetic toolbar keyboard behavior.

ToggleGroup composes Field naming, descriptions and validation with its existing CVA. Explicit ARIA labels remain available outside Field. Consumers give icon-only buttons stable accessible labels. No interactive control contains another interactive control.

## Inventory and migration

The migration covers the three component pages, every preview/variant, default imports/skeletons, all three Storybook families, existing ButtonGroup/ToggleGroup Cypress consumers and shared home/block demos. ButtonGroup includes stacked, fluid, sizes, nested meaningful groups, separators/split, input, InputGroup, dropdown, Select, Popover, text and RTL examples. Toggle includes outline, text, sizes, disabled and RTL. ToggleGroup includes outline, sizes, spacing, vertical, disabled, custom Field, forms and RTL.

Other consumers are Card spacing, MessageScroller anchoring, Input/InputGroup compositions, appearance settings and BlockViewer's viewport controls. Existing Capsule auxiliaries replace migrated Helm primitives. InputGroup and unrelated controls remain on their own APIs until their assigned migration. One-child ButtonGroup wrappers are removed; useful layout classes move to the actual child. Generated APIs and displayed snippets derive from the final public sources.

## Regression boundary

The existing Brain item reads the group's disabled input, while its CVA changes a separate disabledState signal. A Chromium regression against the previous Helm anatomy failed with `[false,true]` instead of `[true,true]` after FormControl.disable(). Capsule preserves Brain selection/CVA and makes the effective explicit/CVA disabled state disable each native item. Tests verify unchanged values/events during disabled native clicks, keyboard and direct Brain callbacks, re-enabling, and independently disabled items. No Brain source or selection rule changes.

Component tests cover reactive/template-driven/signal forms, single/multiple/non-nullable selection, Field names/descriptions/errors and native keyboard behavior. Storybook adds fluid/stacked precedence and a form-disable example. Catalogue tests check server output, hydration, all previews and projected controls. Render audits use the real Storybook theme global from initial navigation and wait for running finite DocumentTimeline transitions (scroll-linked scrollbar animations do not finish with elapsed time), avoiding false contrast findings from theme changes in flight.

## Local validation

The integrated develop tree passed 926 unit tests (188 Capsule, including eight new grouped-action tests), lint on nine projects (eight pre-existing catalogue warnings), all six build targets and dependencies, catalogue prerender of 154 routes and a final Storybook production build. Production Angular/Storybook checks and 29 full example sources compiled against the built Capsule package declarations passed. API snapshots and snippets were regenerated.

Storybook Cypress passed 36/36 without retries. Its 21 stories were audited in 84 renders across light/dark and desktop 1280/mobile 390, before and after activation: no axe violations, nested controls, overflow or page errors. The catalogue SSR/hydration/keyboard suite passed 6/6 without retries. The all-variant catalogue audit caught four unnamed Plus buttons in sizes/split examples; they now have explicit native accessible names. The final catalogue audit passed all 120 renders (all variants plus opened Popover panels, both widths and themes), with no axe violations, nested controls, overflow or page errors.

Validation uses local Node 24.18.0; CI uses Node 22. Automated DOM/ARIA, forms and keyboard checks do not constitute a manual screen-reader session. This lot stays draft: quick CI checks must pass, while ci-complete intentionally refuses preliminary draft validation and full remote build/E2E jobs stay skipped. No preview or ready transition was requested.
