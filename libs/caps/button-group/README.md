# Button Group

Import `CapsButtonGroupImports` from `@capsule-ng/caps/button-group`.

```html
<caps-button-group aria-label="History">
	<button capsButton variant="outline">Previous</button>
	<button capsButton variant="outline">Next</button>
</caps-button-group>
```

The structural element groups projected native buttons, links and other controls visually. It has no selection state or value accessor. Native controls keep their own semantics, focus and activation. Name meaningful groups with `aria-label` or `aria-labelledby`; do not use a group for a single control.

The public layout API adapts [Carbon Angular ButtonSet](https://angular.carbondesignsystem.com/documentation/components/ButtonSet.html): `fluid` (default `false`) grows controls to fill available width; `stacked` (default `false`) arranges them vertically when enabled. As in Carbon, `fluid` takes precedence over `stacked`. Use `stacked` to migrate the former vertical orientation. Sizes belong to each Capsule Button, not the group.

Project `<caps-button-group-text>` for noninteractive text and `<caps-separator orientation="vertical" />` for a decorative split in a horizontal group. The latter reuses the existing Capsule Separator. Nested groups may separate two meaningful sets of controls; a one-child wrapper adds no useful grouping. Neither text nor separators create a tab stop.
