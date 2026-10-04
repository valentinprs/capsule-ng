# Toggle

Import `CapsToggle` from `@capsule-ng/caps/toggle` and place it on a native button.

```html
<button capsToggle [(state)]="formatting" aria-label="Bold">
	<ng-icon name="lucideBold" />
</button>
```

`state` is `on` or `off`; `stateChange` emits after activation. Brain supplies `disabled`, `value`, `id`, native button `type` (default `button`) and `aria-label`. Native attributes and focus remain on the button. `variant` is `default` or `outline`, and `size` is `default`, `sm` or `lg`, preserving the existing display choices. Disabled buttons cannot activate and leave the tab order. Keep the label stable when the pressed state changes.

This is a pressed button (`aria-pressed`), distinct from Carbon Angular's switch Toggle. There is no equivalent Carbon pressed-button API to adapt. It preserves Brain's existing state model, with no standalone Angular value accessor. Use ToggleGroup for form-backed selection or Capsule Switch for a binary form control.
