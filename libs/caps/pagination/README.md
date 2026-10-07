# Capsule Pagination

Import `CapsPaginationImports` from `@capsule-ng/caps/pagination` and load Capsule
foundations. Project native anchors for URLs, including consumer-owned routerLink.

```html
<caps-pagination aria-label="Invoice pages">
	<a capsPaginationPrevious href="?page=1">Previous</a>
	<a capsPaginationLink href="?page=1">1</a>
	<a capsPaginationLink href="?page=2" isActive>2</a>
	<caps-pagination-ellipsis />
	<a capsPaginationNext href="?page=3" disabled>Next</a>
</caps-pagination>
```

Use native `button type="button"` and click handlers for application actions.
`isActive=false` follows Carbon Angular PaginationNavItem and marks aria-current.
`disabled` composes Brain Button: native disabled buttons, disabled anchors outside
the tab order with navigation cancelled. Enabled anchors preserve target, href,
modified click and native navigation. Tab/Enter and button Space remain native.
Directional directives own a decorative chevron; project translated labels or
sr-only text for icon-only controls. Ellipsis is non-interactive, with srOnlyText.
Every directional directive is independently importable.

```html
<caps-numbered-pagination
	[(currentPage)]="page"
	[(itemsPerPage)]="pageSize"
	[totalDataLength]="100"
	[numOfItemsToShow]="7"
	[itemsPerPageOptions]="[10, 20, 50, 100]"
/>
```

The numbered composition retains currentPage/itemsPerPage two-way state and the
existing optional showEdges. Data counts, displayed range and page-size options
use the equivalent Carbon names. Native buttons own selection; CapsSelect owns
the page-size control. A page-size change resets page one; the current page clamps
to the available range, including one empty page. The application loads/slices data.
For URL pagination, project native links and use the preserved createPageArray and
outOfBoundCorrection helpers rather than combining projected and generated modes.

See [API choices and sources](../../../docs/specs/caps-tables.md).
