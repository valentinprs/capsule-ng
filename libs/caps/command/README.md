# Command

Import `CapsCommandImports` from `@capsule-ng/caps/command`.

```html
<caps-command [(search)]="search">
	<caps-command-input placeholder="Search commands" aria-label="Search commands" />
	<caps-command-list aria-label="Workspace commands">
		<caps-command-group label="Workspace">
			<button capsCommandItem value="settings" (selected)="openSettings()">Settings</button>
		</caps-command-group>
		<caps-command-empty>No matching commands.</caps-command-empty>
	</caps-command-list>
</caps-command>
```

`input[capsCommandInput]` supports custom input composition. Both input APIs use the same Brain
filter and keyboard registration. `valueChange` tracks the active item, `selected` activates an item.
`search` supports two-way binding, forms and `provideCapsCommandConfig({ filter })`. Native buttons
keep their type and disabled behavior. Application actions use `selected`, including closing popovers.

Wrap the command in `<caps-command-dialog [(open)]="open">` for CapsDialog focus, dismissal and
accessible title/description. Global shortcuts belong to the application. See
[API and full inventory](../../../docs/specs/caps-command-kbd.md).

The interface follows [Spartan Command](https://www.spartan.ng/components/command) and the public
Brain/Helm sources resolved by the workspace aliases. Defaults remain `search=''`, `disabled=false`,
case-insensitive `filter(value, search)`, generated IDs, `placeholder=''`, `inputId=undefined`,
`title='Command Palette'`, `description='Search for a command to run...'`, `showCloseButton=false`
and `dialogContentClass=''` (`ClassValue`: string, arrays or conditional class objects).

Capsule adaptations are structural: Group's optional `label=''` owns its heading; input/list names
apply to their real ARIA nodes; `open=false` / `openChange:boolean` composes the existing CapsDialog
interface in place of state strings. `searchChange:string`, `valueChange:string` and item
`selected:void` retain their Spartan meanings. There are no new imperative Command/Kbd methods.
Angular forms use the existing value-accessor contract; the configuration provider forwards its
existing filter contract unchanged.
