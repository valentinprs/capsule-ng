# Dialog

```ts
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
```

```html
<caps-dialog [(open)]="editOpen">
	<button capsButton capsDialogTrigger>Edit</button>
	<ng-template capsDialogContent class="sm:max-w-lg">
		<caps-dialog-header>
			<caps-dialog-title>Edit profile</caps-dialog-title>
			<caps-dialog-description>Update your public information.</caps-dialog-description>
		</caps-dialog-header>
		<!-- Your form and Capsule fields -->
		<caps-dialog-footer>
			<button capsButton capsDialogClose variant="outline">Cancel</button>
			<button capsButton type="button" (click)="save()">Save</button>
		</caps-dialog-footer>
	</ng-template>
</caps-dialog>
```

`editOpen` is a writable boolean signal. `save()` validates and sets it to false only on success.
Without a binding, the trigger manages local state. `openChange` reports trigger, Escape,
backdrop and explicit dismissal; `closed` fires after the exit animation with the result.
The root's `show()` / `close(result?)` support imperative use. An external native button
uses `[capsDialogTriggerFor]="dialog"`, where `dialog` is the root's template reference.

Content is lazy and owns the rendered panel. Its `class` styles that panel;
`showCloseButton` defaults to true and `closeLabel` to “Close”. The implicit template
context (`let-dialog`) has `close(result?)`. Do not wrap it in a separate content element.
Header/Footer are layout containers; Title is a level-2 heading and automatically names
the modal. Description registers its accessible description. Supply one Title, or set
`aria-label` and `[aria-labelledby]="null"` on the root when no title is displayed.

Root options: `disableClose` (false), `closeOnOutsidePointerEvents` (true), `autoFocus`
(first tabbable), `restoreFocus` (true), `hasBackdrop` (true), `dir`, `aria-label`,
`aria-labelledby`, `aria-describedby`. Defaults can be configured through
`provideCapsDialogDefaultOptions`. `disableClose` blocks Escape/outside dismissal,
while explicit Close still works. Nested modals retain Brain's focus management.

For dynamic components inject `CapsDialogService` and call `open<Result, Context>(Component,
{ context, contentClass, showCloseButton, closeLabel, ...options })`. Dynamic content uses
`injectCapsDialogContext<Context>()` and `inject(CapsDialogRef)`; `close(result)` reports
through `closed$`. The service owns the same panel. No Brain imports are required.

Import the shared Capsule foundations and preset once, as described in the library README.
Exports prefixed `ɵ` are internal implementation details, not consumer API.
