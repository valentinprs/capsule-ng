# Menubar

`CapsMenubarImports` reexports shared [menu anatomy](../menu/README.md), `caps-menubar` and `button[capsMenubarTrigger]`.

```html
<caps-menubar aria-label="Editor commands">
	<button [capsMenubarTrigger]="file">File</button>
	<button [capsMenubarTrigger]="edit">Edit</button>
</caps-menubar>
<ng-template #file>
	<caps-menu><button capsMenuItem>New</button></caps-menu>
</ng-template>
<ng-template #edit>
	<caps-menu><button capsMenuItem>Undo</button></caps-menu>
</ng-template>
```

Carbon Angular has no corresponding coordinated menubar. Existing CDK/Helm capabilities are retained: sibling arrow/hover navigation, roving focus, deferred menus, trigger `disabled`, `side`, `align`, template data and open/close notifications. Shared choices and labels use the same public menu contract. Give the menubar a meaningful native ARIA name; its host owns `role="menubar"` and triggers own `role="menuitem"`.
