# Navigation Menu

Import `CapsNavigationMenuImports` from `@capsule-ng/caps/navigation-menu`.

```html
<caps-navigation-menu aria-label="Primary">
	<li capsNavigationMenuItem>
		<button caps-navigation-menu-trigger>Documentation</button>
		<ng-template capsNavigationMenuContent>
			<a capsNavigationMenuLink href="/docs" active>Overview</a>
		</ng-template>
	</li>
</caps-navigation-menu>
```

Capsule owns the list, chevron and labelled deferred panel. Root supports `value`/`valueChange`,
`openOn="hover|click"`, `orientation`, `delayDuration`, `skipDelayDuration` and `aria-label`.
Items expose `id`; buttons expose `align` and `disabled`; native anchors expose `active` and
`disabled`. Put `href` or RouterLink on the native anchor. `capsNavigationMenuLink` includes CapsLink:
no second styling directive or Router module is required. An explicit active=true/false controls current-page state independently of the open value. With active omitted, a direct item destination follows Brain's active-item fallback; a panel link stays unmarked. Template `class` styles the owned panel; `navOffset` retains the spacing multiplier (default 1.5).

See [the design and complete example audit](../../../docs/specs/caps-navigation-menu.md).

Contracts follow [Spartan Navigation Menu](https://www.spartan.ng/components/navigation-menu) and the public Brain inputs.
