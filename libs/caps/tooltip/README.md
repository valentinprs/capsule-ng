# Tooltip

Import `CapsTooltipImports` from `@capsule-ng/caps/tooltip`.
Carbon Angular `description` becomes the `capsTooltip` directive input (string or
TemplateRef); `disabled` becomes `tooltipDisabled`.

```html
<button capsButton capsTooltip="Copy the document link" placement="top" type="button">Copy link</button>
<ng-template #description let-document>Copy {{ document }} to your library.</ng-template>
<button capsButton [capsTooltip]="description" templateContext="the document">Add</button>
```

`enterDelayMs=100` and `leaveDelayMs=300` match Carbon. `templateContext` is supplied as
implicit template data. The directive retains Carbon's inherited `open`/`openChange`,
`onOpen`/`onClose`, `placement`, `autoAlign`, `caret`, `dropShadow`, `highContrast` and
`alignmentAxisOffset`. Placement defaults to bottom; Tooltip's highContrast=true and
dropShadow=false follow Carbon Tooltip's constructor overrides. Auto alignment and
alignment-axis offset have the same contract as Popover.

The host keeps its accessible name and action. Tooltip opens on mouse/pen hover or
focus; touch does not trigger it. Focus remains on the trigger. Its `role=tooltip` ID
is merged into existing `aria-describedby` IDs while open, and only its own ID is
removed on close, disable or destruction. Trigger focus and trigger/content hover are
combined, so moving from trigger to content does not close it prematurely. Escape also
cancels an opening delay. Blank text is not shown.

Templates must contain supplementary, noninteractive content. Actions belong in a
Popover. A disabled control needs a focusable inline wrapper for keyboard access to its
description. Neither the tooltip nor its template substitutes the control's name.

Capsule uses Brain's public overlay service with CDK positioning. It deliberately
avoids the popover controller's focus restoration, which would refocus a blurred
trigger and reopen a tooltip. Carbon has no skip-delay group API; the multiple-controls
example demonstrates independent delays. No Capsule-only group API is introduced.
