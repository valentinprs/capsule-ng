# Alert Dialog

```ts
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
```

```html
<caps-alert-dialog [(open)]="deleteOpen">
	<button capsButton capsAlertDialogTrigger variant="destructive">Delete</button>
	<ng-template capsAlertDialogContent>
		<caps-alert-dialog-header>
			<caps-alert-dialog-title>Delete project?</caps-alert-dialog-title>
			<caps-alert-dialog-description>This cannot be undone.</caps-alert-dialog-description>
		</caps-alert-dialog-header>
		<caps-alert-dialog-footer>
			<button capsButton capsAlertDialogCancel variant="outline">Cancel</button>
			<button capsButton type="button" variant="destructive" (click)="confirmDelete()">Delete</button>
		</caps-alert-dialog-footer>
	</ng-template>
</caps-alert-dialog>
```

`deleteOpen` is a writable boolean signal. `confirmDelete()` closes it after success;
confirmation does not implicitly close. An error can leave the modal open. Include a
Cancel button: it receives initial focus even when another action precedes it.

The API shares Dialog's `open` / `openChange`, `closed`, `show()`, `close(result?)`, lazy
context and title/description associations. The role is `alertdialog`, outside clicks
are ignored, Escape dismisses (unless `disableClose`), and focus returns to the trigger.
The root exposes `dir`, `autoFocus`, `restoreFocus`, `disableClose` and ARIA naming inputs.
For an external trigger use `[capsAlertDialogTriggerFor]="dialog"`.

The content template accepts `class` and `size="default" | "sm"`. It never inserts an
X button. Header/Footer/Media are generic layout elements. Place optional
`caps-alert-dialog-media` inside Header, and hide purely decorative icons from assistive
technology. Supply one Title (heading level 2), or an explicit root label.

Exports: `CapsAlertDialog`, `CapsAlertDialogContent`, `CapsAlertDialogTrigger`,
`CapsAlertDialogCancel`, `CapsAlertDialogHeader`, `CapsAlertDialogFooter`,
`CapsAlertDialogTitle`, `CapsAlertDialogDescription`, `CapsAlertDialogMedia`, and the imports
array. Content and Trigger alias the shared Dialog implementation. Styles use the common
Capsule preset and foundations. Brain is unchanged.
