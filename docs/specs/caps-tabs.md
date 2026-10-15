# Capsule Tabs — issue #41

Tabs compose a projected list, native tab buttons and panels. Brain remains unchanged.

```html
<caps-tabs [(value)]="tab" [followFocus]="false">
	<caps-tabs-list aria-label="Account settings" type="line">
		<button capsTabsTrigger value="profile">Profile</button>
		<button capsTabsTrigger value="security">Security</button>
		<button capsTabsTrigger value="billing" disabled>Billing</button>
	</caps-tabs-list>
	<caps-tabs-content value="profile">Profile form</caps-tabs-content>
	<caps-tabs-content value="security">
		<ng-template capsTabsContentLazy>Security form</ng-template>
	</caps-tabs-content>
	<caps-tabs-content value="billing">Billing</caps-tabs-content>
</caps-tabs>
```

Import `CapsTabsImports` from `@capsule-ng/caps/tabs`; all six classes are individually exported.
`CapsTabs` exposes `value`/`valueChange`, `tabActivated`, `orientation` (horizontal/vertical),
`followFocus` and `id`. Lists expose `type`; paginated lists additionally retain Brain's existing
`disablePagination` and styling inputs, and name their inner tablist through `ariaLabel`.
Buttons expose `value` and native `disabled`; panels expose `value`.

## Carbon Angular contract

Verified against [Tabs](https://angular.carbondesignsystem.com/documentation/components/Tabs.html),
[BaseTabHeader](https://angular.carbondesignsystem.com/documentation/components/BaseTabHeader.html)
and [TabHeader](https://angular.carbondesignsystem.com/documentation/directives/TabHeader.html):
`followFocus: boolean = true` maps to automatic activation; false maps to manual activation.
List `type: 'line' | 'contained'` maps to existing line/default appearances (contained is retained as
Capsule's default). `disabled` retains native button semantics.
A private Brain subclass adapts its public activation input with a boolean transform; the original
Brain input signal is never written or cast. The inherited input fixes its write brand to the
activation enum, so the private adapter widens that brand locally while retaining a BooleanInput
transform. The public Capsule input remains boolean; AOT consumer tests compile false bindings.
Angular packaging requires the host directives to be reachable from the entry point. They are
exposed only through `ɵ` aliases marked `@internal`, excluded from the consumer imports array
and generated component documentation. Consumers keep using the six public Tabs classes. Value and orientation migrate existing Brain capabilities.
Carbon position, skeleton, dismissal, navigation mode, fullWidth and cacheActive are omitted:
no equivalent complete behavior exists in this Brain family. Capsule adds no substitute inputs.

## Selection, focus and presence

Missing, unknown or disabled values normalize to the first enabled tab, including paginated lists.
Normalization updates valueChange, without emitting a user tabActivated event. With no enabled tabs,
no tab is focusable. Manual arrow navigation moves the single tabstop while leaving selection alone;
Enter/Space activate the native button. Lists wrap, skip disabled tabs, support Home/End/PageUp/PageDown,
vertical Up/Down and horizontal direction-aware Left/Right. Modifiers and the unrelated axis are ignored.
Private trigger adaptation guards disabled imperative activation used by pagination.

Root IDs namespace tab and panel IDs with encoded values, so repeated values in separate groups remain independent.
Explicit IDs are supported. During hydration, the default root ID reuses the SSR host ID before
allocating a new CDK ID (existing DOM IDs are skipped); associations stay stable even when server counters have advanced.
Generic roots have no interactive ARIA role; lists own tablist, buttons own tab, panels own tabpanel.
Inactive panels stay mounted and hidden. `capsTabsContentLazy` creates its view on first activation,
then retains it, including form state, until the panel is destroyed. This deliberately preserves
existing behavior rather than claiming Carbon's destroy-on-switch cacheActive=false behavior.

## Example composition audit

Migrated all ten Tabs previews and their generated snippets, displayed imports/skeleton, stories,
the catalogue preview/code and package-installer tabs, home examples/playground/dashboard, Blocks,
file-tree and transcript-position consumers. Supporting Button/Input use existing Capsule APIs.
Basic, line, icon and file-tree demos now provide associated panels; icon-only buttons have names.
Transcript position chooses one setting through existing CapsToggleGroup instead of tabs without panels.
Blocks categories remain router links in a native navigation landmark. Home uses native tab buttons
with RouterLink to retain its fragment routes. The Brain-only story intentionally documents unstyled
Brain and stays unchanged. Preview/code wrapper classes provide catalogue-specific borders/layout.
Helm Alert and unrelated primitives remain until their own lots are integrated.

## Validation

Public consumer Chromium specs cover selection, associations, disabled controls, lazy caching,
automatic/manual activation, default values, RTL, vertical keys and pagination. Storybook E2E IDs
now assert namespaced identities and reciprocal associations; formerly commented axe checks are active.
The standalone consumer harness renders all ten actual catalogue previews with real compiled shared
styles for axe and eight light/dark mobile/desktop horizontal/vertical captures.
Catalogue and Storybook full runtime journeys are left to the final union validation; the first local
Vite SSR journey hit the default 4 GB heap limit before those journeys could be verified.

Local result: eight public Chromium tests and one isolated visual harness passed. The harness
ran axe on all ten previews at 390/1280 px in both themes, producing eight horizontal/vertical
captures. All axe results were empty; the mobile preview bounds were x=16, width=358, right=374,
and desktop bounds x=16, width=512, right=528. Inactive text uses foreground/80 against muted,
correcting the former light contrast ratio of 4.34. Focus retains the shared 3 px ring and disabled
native buttons retain the shared opacity. The SSR identity adoption branch was tested; a complete
SSR hydration journey remains part of the final union runtime validation.
