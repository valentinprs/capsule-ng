# Data Table — issue 53

## Decision before implementation

Data Table is a documented application recipe, not a new public component or data
model. Compose `CapsTableImports`, native table sections and cells, Capsule Input,
Button, Checkbox, Dropdown Menu, Select and Pagination with TanStack Angular Table
9.1.2. There is no `@capsule-ng/caps/data-table` entrypoint. The application owns
columns, data, formatting and state; TanStack owns row models and interactions.

The API reference for this recipe is the official
[Spartan Data Table guide](https://www.spartan.ng/components/data-table), whose
Introduction and Installation describe composing Table primitives with TanStack
v9. Capsule keeps the installed TanStack 9.1.2 API and adapts the recipe's helpers
to its existing primitives. Application-specific state and accessibility contracts
are explicit below; they do not introduce another public data-table API.

Issue 52's [Table contract](caps-tables.md),
[Table README](../../libs/caps/table/README.md) and
[Pagination README](../../libs/caps/pagination/README.md) remain authoritative for
those already integrated primitives. This lot does not revise their public props.
No Brain or Helm source is changed.

## Capability and API sources

Spartan section names below refer to the linked official guide. The concrete
TanStack types and behavior come from the installed 9.1.2 package; Brain supplies
interaction behavior through the existing Capsule controls. The final column
records Capsule's application requirements rather than additional upstream props.

| Capability / props / helper                                                                  | Source                                                                                                        | Capsule adaptation and reason                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Table sections, `FlexRender`, column/cell context                                            | Spartan: Basic Table, Render the table; TanStack Angular `FlexRender`                                         | Use `CapsTableImports` and native elements from issue 52. Keep table naming/caption, `scope` and `aria-sort` on native elements for semantics.                                                                           |
| `tableFeatures`, `injectTable`, sorting/filtering/pagination/selection/visibility state      | Spartan: Set up Table Features; TanStack 9.1.2                                                                | Preserve the existing engine and controlled signals in all four consumers; application state remains inspectable.                                                                                                        |
| `getRowId`                                                                                   | TanStack table option; existing payment/task/dashboard record IDs                                             | Supply stable record IDs so selection follows records through sorting, filtering and paging.                                                                                                                             |
| `TableHeadSortButton`, `Column`, `getIsSorted`, `toggleSorting`                              | Spartan: Sorting, Column header; TanStack column API                                                          | Render a native Capsule button and expose sorting on its containing `th`; support keyboard activation.                                                                                                                   |
| Email/task filter, `ColumnFiltersState`, `setFilterValue`                                    | Spartan: Filtering; TanStack column API                                                                       | Give the input an accessible name, reset page index to zero on filter changes and retain selected IDs.                                                                                                                   |
| `TableHeadSelection`, `TableRowSelection`, row/table inputs                                  | Spartan: Row Selection; TanStack row API; [Brain Checkbox](../../libs/brain/checkbox/src/lib/brn-checkbox.ts) | Use Capsule Checkbox with page-local checked/change behavior and an empty-page disabled state. Require `somePage && !allPage` for mixed state because installed v9 includes fully selected pages in some-page selection. |
| Selected-count summary                                                                       | Spartan: Show selected rows; TanStack selected/pre-filtered/filtered row models                               | Distinguish all selected records from filtered results so a hidden selected record is still explained.                                                                                                                   |
| Column menu, `getCanHide`, `getIsVisible`, `toggleVisibility`, `enableHiding`                | Spartan: Visibility, Column toggle; TanStack column API; Capsule Dropdown Menu / Brain behavior               | Keep selection/actions non-hideable; use a single menu checkbox control per column. Preserve home visibility state.                                                                                                      |
| Empty-row `colspan`                                                                          | TanStack visible leaf columns                                                                                 | Count currently visible columns, preventing a stale span after hiding columns.                                                                                                                                           |
| Previous/Next, `getCanPreviousPage`, `getCanNextPage`                                        | Spartan: Pagination; TanStack pagination API                                                                  | Retain native disabled bounds, including an empty filtered result.                                                                                                                                                       |
| Reusable pagination and view helpers, `injectTableContext`, `[tanStackTable]`                | Spartan: Reusable Components; TanStack Angular DI                                                             | Keep helpers composable without adding a generic data-table wrapper.                                                                                                                                                     |
| Numbered pagination: `currentPage`, `itemsPerPage`, `totalDataLength`, `itemsPerPageOptions` | Existing Capsule issue 52 pagination contract                                                                 | Adapt TanStack's zero-based index to the existing one-based page API. Use filtered total length and reset page on size changes; do not alter issue 52 props.                                                             |
| `ActionDropdown`, row input, copied record ID                                                | Spartan: Row Actions; Capsule Dropdown Menu / Brain behavior                                                  | Name the trigger per record, copy its stable ID and verify Escape/focus behavior.                                                                                                                                        |
| Monetary cell formatter and direction                                                        | Spartan: Cell Formatting, RTL; existing application translations                                              | Preserve USD formatting and translations, with logical alignment for both directions.                                                                                                                                    |

This mapping applies to catalogue LTR/RTL, Tasks and Dashboard table engines and
their shared helpers. The standalone story demonstrates the same composition
without importing application code.

## Anatomy and state contracts

- `caps-table-container` contains a named native `table capsTable`. Keep native
  caption/thead/tbody/tr/th/td; `scope` and `aria-sort` belong to the real th.
- Declare `getRowId` from each record's stable ID. Selection belongs to those IDs,
  so sorting, filtering and pagination never transfer selection to another record.
- The header checkbox selects the current page only. Its checked, indeterminate,
  disabled and change handler all use the page row model. TanStack v9 considers any
  selected page row to be some selection, including a fully selected page;
  indeterminate therefore additionally requires that not all page rows are selected. Row controls have a
  distinct accessible name. A filter resets page zero and preserves selection.
- Selection summaries state the total selected records and filtered result count
  separately. Empty rows span the current visible columns, including selection
  and actions, which cannot be hidden.
- Native sort buttons support Enter/Space. Column visibility uses one native
  menuitemcheckbox per column, without a nested checkbox. Row action menus name
  their record, copy that record's ID and restore focus on Escape.
- Native Previous/Next actions preserve disabled bounds. The reusable numbered
  pagination recipe maps TanStack pageIndex zero to Capsule currentPage one and
  passes the filtered row count; page size changes reset the first page.
- Preserve USD formatting, LTR/RTL translations, page-size options and persisted
  home column visibility. No new generic configuration layer is introduced.

## Complete example inventory

Catalogue LTR and RTL previews, action/selection/sort helpers, the guide's 24 code
strings and generated default/RTL snippets; home Tasks and Dashboard TableSection
and their shared helper contracts; standalone Data Table stories and targeted
catalogue/Storybook tests. Table's primitive migration from issue 52 is preserved.
Typography keeps existing Helm utilities because it has no Capsule equivalent.

## Validation

Compile catalogue, standalone stories and copied recipes against the distributed
Capsule declarations. Check stable IDs, page selection (partial/all/empty),
filter reset, sorting, visibility and pagination boundaries in consumer tests.
Exercise real catalogue and Storybook keyboard/menu/focus interactions, copy ID,
SSR hydration, empty states and RTL; run axe and inspect captures at 390/1280 in
both themes with loaded font faces and verified computed theme colors.

Targeted validation passed: eight contracts against the four actual table engines,
two DOM tests, 25 metadata/snippet tests and configured project lint. Five Angular
consumer configurations compiled; the final standalone story with real Storybook
types and a freshly generated isolated consumer compiled again after the local
CDK `Dir` adaptation. The isolated consumer uses the actual final classes and
templates, omitting only Storybook runner metadata. It has no workspace aliases,
`extends`, `baseUrl` or `paths`; `skipLibCheck` is false and Angular template checks
are strict. Exact AST comparison verifies the final extracted component source.

Seven catalogue journeys passed cumulatively across targeted reruns (2 + 3 + 2),
and ten Storybook journeys passed cumulatively (9 + 1). After adding public CDK
`Dir` locally to both standalone triggers and menus, the four existing Storybook
RTL contexts passed targeted Cypress and native checks again. Columns and actions
separately verify native/computed/CDK-overlay RTL direction, real keyboard
navigation and Escape/focus. Those stories use English/Inter; their initial LTR
portal measurements are retained as historical evidence. The catalogue separately
proves Arabic/RTL/Noto in both table and portal.

Native measurements cover four catalogue and eight Storybook contexts at 390/1280
in light/dark, with actual glyphs, theme colors, unobstructed targets and inspected
viewport captures. The eight Storybook contexts combine retained LTR receipts with
the four final RTL receipts. Axe found no violations in the 16 planned table
scopes. Historical failures are retained in the local QA archive; this is a scoped
result rather than a global accessibility claim.

DEV hydration receipts are paired with actual interactions. Production SSR and
the central union pipeline remain central validation. No Capsule implementation
changed, so the accepted real package artifacts were reused with all 860 file
hashes verified instead of rebuilding unchanged packages. Local detailed receipts,
source/package inventories and failure diagnostics are retained under `work/qa`.
