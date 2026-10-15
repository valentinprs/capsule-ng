# Capsule Sheet and Drawer — issue 39

## Design recorded before implementation

Properties are grounded in the official Spartan [Sheet](https://www.spartan.ng/components/sheet)
and [Drawer](https://spartan.ng/components/drawer) documentation, checked on 2026-10-07,
and their public Brain contracts in this checkout: BrnSheet, BrnDrawer, BrnDialog and BrnDrawerHandle.
Spartan supplies the four physical placements, native trigger/close behavior, deferred content,
showCloseButton and closeThreshold. Capsule Dialog supplies the established open/closed/show/close
vocabulary and content-owned presentation. The Drawer side name adapts Brain direction.
No Carbon-derived property is introduced. The earlier Carbon comparison was superseded by the
user's explicit instruction to base properties on Spartan documentation.
Both families follow Capsule Dialog: a structural caps-sheet/caps-drawer root, two-way open,
closed result, show()/close(result), native button triggers/close and deferred ng-template content.
Content owns the rendered panel, optional Sheet close button, labels and Drawer handle. Title and
description register with Brain's dialog accessibility context; header/footer project arbitrary content.
Side belongs to content (right for Sheet, bottom for Drawer); trigger side overrides retain the existing
four-side demo. Drawer calls this side consistently while adapting Brain direction internally.
The content [class] binding styles the actual panel, preserving custom widths. Nested overlays retain Brain focus
trapping, restoration, Escape/outside dismissal, disableClose and scroll locking. Dir is forwarded.
Drawer exposes Brain closeThreshold on content; its presentation handle and gestures remain internal.
No snap points, responsive automatic switching or dynamic service are added: existing Sheet/Drawer
have none. CapsDialogService remains the existing dynamic-dialog service.

## Anatomy

```html
<caps-sheet [(open)]="open">
	<button capsButton capsSheetTrigger>Open</button>
	<ng-template capsSheetContent side="right">
		<caps-sheet-header>
			<caps-sheet-title>Edit profile</caps-sheet-title>
			<caps-sheet-description>Save your changes.</caps-sheet-description>
		</caps-sheet-header>
		<!-- projected form/content -->
		<caps-sheet-footer><button capsButton capsSheetClose>Cancel</button></caps-sheet-footer>
	</ng-template>
</caps-sheet>
```

Drawer uses the same anatomy with capsDrawerContent, caps-drawer-\* and capsDrawerTrigger/Close.
Content exports side, class; Sheet showCloseButton/closeLabel; Drawer closeThreshold. Roots forward
Brain autoFocus, restoreFocus, disableClose, closeOnOutsidePointerEvents, hasBackdrop and ARIA names.
TriggerFor supports an external root; close buttons retain native activation. Placements are physical
left/right/top/bottom, including RTL. Sheet default changed from Brain top to Capsule right.

## Example inventory

Sheet: default, close, no-close, four sides with scrollable body, custom size, menu command, RTL,
Storybook. Drawer: default profile form, four directions, nested overlay, RTL, new matching stories.
All available auxiliary Button/Field/Input/Label APIs use Capsule. Catalogue API tables use Capsule only; snippets are regenerated from final previews.

## Content classes regression

A public consumer with static `class` on `ng-template capsSheetContent` reproduced a missing panel
class in Chromium. The received panel input was empty while its base classes were already present.
Angular 21.2.16 skips static styling initialization for template containers: its public
HostAttributeToken('class') therefore returns null, and class markers do not initialize aliased inputs.
No private Angular state is read. The public Angular syntax `[class]="'my-class'"` forwards constant
classes to the deferred panel, while `[class]="classes()"` supports live changes. Consumers use those
bindings. Assertions on rendered classes remain intact in both families, including two live-update tests.

## Browser layout and scrolling checks

Browser inspection caught an inherited `relative` utility overriding the panel's fixed CSS: lateral
panels measured 75% of the overlay pane rather than the viewport and missed the right edge.
Sheet and Drawer now use `fixed` on their actual surface. The catalogue's long Sheet text has a
keyboard focus stop with the existing focus outline utilities; ArrowDown scrolling is verified.
