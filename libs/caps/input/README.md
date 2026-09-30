# Input

Use `CapsInput` or `CapsInputImports` from `@capsule-ng/caps/input` on a native input:

```ts
import { CapsInputImports } from '@capsule-ng/caps/input';
```

```html
<label for="email">Email</label>
<input capsInput id="email" type="email" autocomplete="email" />
```

The directive adds the `caps-input` style hook and `data-slot="input"`. Import Capsule's token
layer and style preset in your application's stylesheet. Consumer classes are merged using the
existing `classes()` helper.

Native types, placeholder, required, readonly, disabled and autocomplete remain native. Bind values
with Angular reactive, template-driven or signal forms; Capsule adds no value accessor or value API.

`id` uses Brain's generated ID unless supplied explicitly. In an existing Field, Brain supplies the
label association and descriptions. The optional `aria-describedby` input merges consumer IDs with
Field descriptions and errors, removing duplicates.

`forceInvalid` forces the error **appearance**; `aria-invalid` and `data-invalid` still reflect the
Angular control's validation state. Normal error styling follows Brain's error-state matcher
(by default invalid after touch, or template-driven form submission; custom matchers may use dirty state). This keeps visual overrides separate from ARIA
validation state. Capsule Field composes the native label and descriptions. Surrounding Helm components can coexist during migration.
