# Native Select

```ts
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
```

```html
<caps-field>
	<caps-field-label>Language</caps-field-label>
	<select capsNativeSelect [formControl]="language">
		<option value="" disabled>Choose a language</option>
		<optgroup label="Available">
			<option value="fr">French</option>
			<option value="en">English</option>
		</optgroup>
		<option value="de" disabled>German</option>
	</select>
	<caps-field-description>Display language.</caps-field-description>
</caps-field>
```

`CapsNativeSelect` styles an actual select and composes Brain's Field support. There are no option,
optgroup or wrapper components. Native focus, keyboard, disabled state and browser popup remain intact.
Use the native `change` event or Angular's forms APIs. Angular owns value accessors, including object
`ngValue`, `compareWith` and native `multiple`. Native numeric `size` stays available; `controlSize`
(`default`/`sm`) only controls the compact single-line visual variant. There is no native placeholder
attribute: use an empty option, disabled when it should not be reselected.

`id`, `forceInvalid`, `aria-describedby`, normal attributes and `class` are supported. Field labels,
descriptions and errors associate with the native select. Outside Field use a native label or an
accessible name. `CapsNativeSelectImports` contains the directive and is exported alongside it.
