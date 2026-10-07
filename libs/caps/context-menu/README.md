# Context Menu

`CapsContextMenuImports` reexports shared [menu anatomy](../menu/README.md) and `capsContextMenuTrigger`. Bind a deferred menu template to a focusable surface:

```html
<div tabindex="0" [capsContextMenuTrigger]="actions" aria-label="Document actions">Right click or press Shift+F10</div>
<ng-template #actions>
	<caps-menu><button capsMenuItem>Rename</button></caps-menu>
</ng-template>
```

Pointer context-menu activation retains CDK's behavior. Shift+F10 and the ContextMenu key open at the focused surface and focus its first enabled command. Closing while focus belongs to the menu returns to the surface; outside focus is preserved. Existing `disabled`, `side`, `align`, `capsContextMenuTriggerData`, `opened` and `closed` are retained. Carbon Angular ContextMenu supplies shared item, group and panel-size properties; it does not provide a corresponding context-trigger composition, so the existing trigger capabilities remain.
