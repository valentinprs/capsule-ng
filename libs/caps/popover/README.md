# Popover

Carbon Angular's PopoverContainer inputs are adapted to Capsule's element anatomy:
`isOpen`/`isOpenChange` become `open`/`openChange`, and `align` becomes `placement`.
Import `CapsPopoverImports` from `@capsule-ng/caps/popover`.

```html
<caps-popover [(open)]="open" placement="bottom-start" aria-label="Dimensions">
	<button capsButton capsPopoverTrigger type="button">Dimensions</button>
	<ng-template capsPopoverContent [class]="'grid w-80 gap-4'">
		<label capsLabel>
			Width
			<input capsInput />
		</label>
		<button capsButton capsPopoverClose type="button">Close</button>
	</ng-template>
</caps-popover>
```

`placement` accepts top/bottom/left/right, each optionally followed by `-start` or
`-end`, and defaults to `bottom`. `autoAlign` defaults to false: the requested placement
is fixed. The experimental `autoAlign` enables viewport fallback and should be assigned
once before opening, as in Carbon. `alignmentAxisOffset` is optional and takes effect
only with autoAlign on aligned placements; its sign reverses for `-end`.
`caret=true`, `dropShadow=true` and `highContrast=false` match Carbon defaults.
`onOpen`/`onClose` emit void when the state changes; no synthetic DOM Event is invented.

The native button preserves its standard id/type inputs and owns activation, `aria-haspopup`, `aria-expanded` and `aria-controls`.
The deferred body is rendered once opened, in a nonmodal dialog; focus moves to its first
focusable control. Escape and outside activation dismiss it without swallowing an
outside button's action. The dialog name defaults to its trigger's accessible text;
standard `aria-label`/`aria-labelledby` on the root override it.

The template's implicit context offers `close()` for callbacks inside the body.
Bind `[class]` on the template to style the owned panel: Angular does not transfer a
static `class` attribute on `ng-template`. Interactive content remains consumer-owned.
The structure has no additional width, density, anchor, side or offset API.

Brain remains unchanged. Capsule adapts its public overlay extension points with CDK
connected positions; no Floating UI package is added. Theme, shadow, radius and motion
use the shared Capsule foundations. Include the existing CDK overlay styles.

Direction inherits reactively from the parent Angular Directionality. The standard
`dir` input overrides it when supplied and resumes inheritance when undefined. A
consumer may import the native CDK Dir directive without duplicate matches.
