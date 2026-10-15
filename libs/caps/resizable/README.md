# Resizable

Import `CapsResizableImports` from `@capsule-ng/caps/resizable` and the shared Capsule foundations stylesheet.

```html
<caps-resizable-group class="h-64" direction="horizontal" aria-label="Documents">
	<caps-resizable-panel defaultSize="30" minSize="20" maxSize="50" [collapsible]="false">
		Navigation
	</caps-resizable-panel>
	<caps-resizable-handle aria-label="Navigation width" withHandle />
	<caps-resizable-panel defaultSize="70" minSize="50" maxSize="80" [collapsible]="false">Content</caps-resizable-panel>
</caps-resizable-group>
```

The properties follow [official Spartan Resizable documentation](https://spartan.ng/components/resizable) and the exported Brain classes. Group: `direction="horizontal|vertical"` (horizontal), two-way `layout` (percentage array, empty by default), id, dragStart, dragEnd, layoutChanged and the model output layoutChange. Panels: id, defaultSize (undefined), minSize (0), maxSize (100), collapsible (true), setSize. Give groups explicit dimensions and finite, feasible percentages totaling 100. Each handle sits directly between two panels. Panels can contain nested independent groups. Projected form controls keep their original form context.

Handle: withHandle (false, decorative grip), disabled (false) and native ARIA naming attributes. Its separator role, tab index, orientation, aria-controls and current/minimum/maximum percentage belong to its one focus target. Supply a name describing the preceding panel dimension. Arrows resize by 1%, Shift+arrow by 10%; horizontal arrows mirror in RTL. Home/End use the feasible bounds of both adjacent panels. Enter/Space toggles a collapsible panel when its neighbor can accept the released size. Collapsing to zero is an explicit exception to the minimum. A disabled handle cannot resize and is outside sequential tab order.

`layout` is the recommended controlled API. `setSize` preserves the underlying imperative panel style operation; when resizing multiple panels programmatically, update layout so the controlled state and all panel sizes stay synchronized. Accessible values also follow imperative setSize operations. No automatic layout persistence is provided.

See [the contract and inventory](../../../docs/specs/caps-space.md).

See the [exhaustive API provenance matrix](../../../docs/specs/caps-space-api-matrix.md) for every property, default, output, method and native/Caps adaptation. Central read-only API review is required before delivery.
