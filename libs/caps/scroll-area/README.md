# Scroll Area

Import `CapsScrollAreaImports` from `@capsule-ng/caps/scroll-area` and import the shared Capsule foundations stylesheet once.

```html
<caps-scroll-area class="h-64 w-full" orientation="vertical" aria-label="Documents">
	<ul>
		<li><a href="/notes">Notes</a></li>
	</ul>
</caps-scroll-area>
```

The component owns the native viewport and scrollbars. Set a height for vertical overflow, a width for horizontal overflow, or both for `orientation="auto"`. Project content directly, without ngx-scrollbar or scrollViewport wrappers. Native scrolling and focused descendants work before and after hydration. `aria-label`, `aria-labelledby`, `aria-describedby` and `tabindex` target the viewport; the default tab index is zero.

[Official Spartan Scroll Area documentation](https://spartan.ng/components/scroll-area) builds on ngx-scrollbar and supplies hover visibility. Capsule preserves the installed ngx-scrollbar 19.1.5 public entrypoint rather than inventing a separate property vocabulary. Existing ngx-scrollbar inputs remain available: orientation `auto|vertical|horizontal`, visibility `native|hover|visible` (hover default), appearance `native|compact`, position `native|invertX|invertY|invertAll`, withButtons, disableInteraction, disableSensor, sensorThrottleTime, hoverOffset, trackScrollDuration, trackClass, thumbClass and buttonClass. afterInit/afterUpdate forward the existing outputs. Install the ngx-scrollbar peer dependency. The public `scrollTo(options)` and `scrollToElement(target, options?)` methods forward normalized ngx-scrollbar scrolling. Scrollbars preserve native scroll behavior; no custom keyboard scrolling algorithm is introduced.

See [the contract and inventory](../../../docs/specs/caps-space.md).

See the [exhaustive API provenance matrix](../../../docs/specs/caps-space-api-matrix.md) for every property, default, output, method and native/Caps adaptation. Central read-only API review is required before delivery.
