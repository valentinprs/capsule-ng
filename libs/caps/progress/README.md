# CapsProgress

```ts
import { CapsProgressImports } from '@capsule-ng/caps/progress';
```

```html
<p id="upload-label">Uploading document</p>
<caps-progress [value]="75" [max]="150" aria-labelledby="upload-label" aria-describedby="upload-help" />
<p id="upload-help">75 of 150 MB</p>
<caps-progress [value]="null" aria-label="Preparing document" />
```

Properties follow [Spartan Progress](https://www.spartan.ng/components/progress) and the public BrnProgress host directive: `value` (number/null/undefined, initially undefined), `max=100`, and `getValueLabel(value,max)` (default rounded percentage). Brain validation/coercion and loading/complete/indeterminate states remain intact. Null/undefined omits aria-valuenow and aria-valuetext. Fill is value/max, including maxima other than 100.

The component is the only progressbar and owns its internal Brain indicator. Native id/aria-label/aria-labelledby/aria-describedby apply directly to that semantic host. Labels and descriptions remain external native content; there is no extra label/helper/status/size API. Progress creates no live region, focus target or value accessor. Dimensions use class. CSS fills from inline-start in LTR/RTL. Reduced motion stops indeterminate animation and width transitions, retaining a visible indeterminate bar.

Styles use the shared Capsule foundations and preset. See [the loading spec](../../../docs/specs/caps-loading.md) for source mapping, inventory and validation.
