# Menu anatomy

Import `CapsMenuImports` from `@capsule-ng/caps/menu`, or use the shared exports of `/dropdown-menu`, `/context-menu` and `/menubar`.

```html
<button type="button" capsButton [capsDropdownMenuTrigger]="actions" placement="bottom-start">Actions</button>
<ng-template #actions>
	<caps-menu>
		<caps-menu-group label="Document">
			<button capsMenuItem (itemClick)="rename()">Rename</button>
			<a capsMenuItem href="/download" download>Download</a>
		</caps-menu-group>
		<caps-menu-separator />
		<button capsMenuCheckboxItem [(checked)]="grid">Show grid</button>
		<caps-menu-group type="radio" label="Density" [(value)]="density">
			<button capsMenuRadioItem value="compact">Compact</button>
			<button capsMenuRadioItem value="comfortable">Comfortable</button>
		</caps-menu-group>
		<button [capsMenuSubTrigger]="exports">Export</button>
	</caps-menu>
</ng-template>
<ng-template #exports>
	<caps-menu><button capsMenuItem (itemClick)="exportPdf()">PDF</button></caps-menu>
</ng-template>
```

Menus own the panel's `role="menu"`; groups own their `role="group"` and optional visible/accessible `label`. Separators own their horizontal separator role. All commands, destinations and selectable rows remain native buttons/anchors. Checkbox/radio/submenu indicators are decorative internals; never place a second Checkbox/Radio inside a row. `info` on an ordinary item, or projected `caps-menu-shortcut`, renders informational shortcut text.

`size="xs|sm|md|lg"` (`lg` default) uses Capsule control-height tokens. Ordinary items expose Carbon Angular's `disabled`, `danger`, `dangerDescription` and `info`; actions emit `itemClick`. Selectable buttons expose `checked`/`checkedChange`, `disabled`, `value` and `itemClick`. Unbound checked state still updates. Explicit groups expose `type="radio|checkbox"`, `value`/`valueChange` and `label`. Radio group values are strings; checkbox group values are string arrays, adapting the upstream implementation's single/multiple selection. These action choices are not form controls and have no CVA.

Checkbox and radio activation keeps the panel open, as in Carbon Angular MenuButton. Ordinary commands close the complete menu stack and restore their trigger. Submenu buttons expose the existing `side`/`align` positioning, `disabled` and `opened`/`closed`; their `capsMenuSubTrigger` receives a template. Native `type` remains available and defaults to `button` on action rows.

See [the full contract and example audit](../../../docs/specs/caps-action-menus.md).
