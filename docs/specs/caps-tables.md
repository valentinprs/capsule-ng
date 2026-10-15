# Table and Pagination — issue 52

## Decision before implementation

Table keeps its native HTML content model: `caps-table-container` projects one
`table capsTable`; caption, thead, tbody, tfoot, tr, th and td remain direct native
children. Descendant styling removes eight decorative directives. Scope, headers,
colspan, rowspan and native sort/action buttons belong to the consumer. No custom
host is inserted into a table. The responsive container provides native overflow and a keyboard focus stop, so
Arrow keys can reveal cells outside a narrow viewport. Focus uses the existing
Capsule ring token. Table presentation belongs to the CSS components layer,
allowing native cell utilities such as text-right/text-end to retain precedence.

Carbon Angular [TableDirective](https://angular.carbondesignsystem.com/documentation/directives/TableDirective.html)
verified on 2026-10-07 supplies the adapted inputs `size` (xs/sm/md/lg/xl,
md default), `striped=false`, `noBorder=true`. Its sortable/skeleton decoration
and MVC Table model are outside this display primitive: sorting, selection and
loading belong to Data Table (#53). Existing footer, caption, selected/expanded
row appearance and arbitrary native cells are preserved.

`caps-pagination` is a navigation landmark with directly projected native anchors
or buttons. `capsPaginationLink`, `capsPaginationPrevious` and
`capsPaginationNext` style the native action; the directional directives also own
the decorative chevron. They expose `isActive` (Carbon PaginationNavItem naming)
and `disabled` through Brain Button. Anchors keep href/routerLink/target and
native modified-click semantics. Disabled anchors are removed from the tab order
and cancel navigation; disabled buttons use the real disabled property.
The three public action directives apply one shared internal subclass of Brain
Button directly. This exposes inherited disabled plus isActive once, avoiding
re-exposure of a forwarded input through another host directive, rejected by the
installed Angular 21 runtime with NG0311. Its internal ɵ export supports Angular
packaging, following the existing Capsule Tabs pattern.
Consumers project translated text, including sr-only text for icon-only controls.
`caps-pagination-ellipsis` preserves the non-interactive more-pages text.

[Carbon Angular Pagination](https://angular.carbondesignsystem.com/documentation/components/Pagination.html)
and [PaginationNav](https://angular.carbondesignsystem.com/documentation/components/PaginationNav.html)
were inspected on 2026-10-07.
[PaginationNavItem](https://angular.carbondesignsystem.com/documentation/components/PaginationNavItem.html)
confirms `isActive=false`. The existing numbered paginator retains currentPage
and itemsPerPage two-way state (Carbon accessors); totalItems becomes
totalDataLength, pageSizes becomes itemsPerPageOptions, maxSize becomes
numOfItemsToShow. showEdges preserves the existing capability, without inventing
an equivalent Carbon property. Native buttons replace anchors without href.
Page selection does not load or slice data. The application owns URL pagination:
project routerLink or href into caps-pagination. No router inputs or dependency
are added to Capsule. Generated actions and projected URL navigation use separate
components, so their modes cannot collide. Existing public `createPageArray`
and `outOfBoundCorrection` helpers are retained for projected URL compositions;
the advanced URL example uses a bounded page range with ellipses and resets its
URL page after changing page size.

## Inventory and migration

All Table/Pagination catalogue variants, displayed source strings, snippets and
stories are migrated. Native table primitives in Data Table previews, its snippet,
Tasks, dashboard TableSection, dynamic Dialog example/story and the shared API
docs renderer use the same public Table API; the Data Table implementation is
unchanged. Supporting controls use existing Capsule APIs. Typography and other
families without Capsule APIs retain Helm. Brain and Helm sources remain unchanged.

## Public imports

`CapsTableImports` from `@capsule-ng/caps/table` includes CapsTableContainer and
CapsTable. `CapsPaginationImports` from `@capsule-ng/caps/pagination` includes
CapsPagination, CapsPaginationLink, CapsPaginationPrevious, CapsPaginationNext,
CapsPaginationEllipsis and CapsNumberedPagination. Styles ship with foundations.
