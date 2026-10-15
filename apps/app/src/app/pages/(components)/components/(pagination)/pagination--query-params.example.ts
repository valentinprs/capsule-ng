import { Component, computed, inject, numberAttribute } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';
import { map } from 'rxjs/operators';

@Component({
	selector: 'spartan-pagination-query-params',
	imports: [CapsPaginationImports, RouterLink],
	template: `
		<caps-pagination>
			@if (currentPage() > 1) {
				<a
					capsPaginationPrevious
					routerLink="."
					[queryParams]="{ page: currentPage() - 1 }"
					queryParamsHandling="merge"
				>
					<span>Previous</span>
				</a>
			}
			@for (page of pages; track 'page_' + page) {
				<a
					capsPaginationLink
					routerLink="."
					[queryParams]="{ page }"
					queryParamsHandling="merge"
					[isActive]="currentPage() === page"
				>
					{{ page }}
				</a>
			}

			@if (currentPage() < pages[pages.length - 1]) {
				<a capsPaginationNext routerLink="." [queryParams]="{ page: currentPage() + 1 }" queryParamsHandling="merge">
					<span>Next</span>
				</a>
			}
		</caps-pagination>
	`,
})
export class PaginationQueryParams {
	private readonly _route = inject(ActivatedRoute);

	/**
	 * Alternative would be to enable `withComponentInputBinding` in `provideRouter`.
	 * Than you can bind `input` signal to the query param.
	 *
	 * ```ts
	 * pageQuery = input<number, NumberInput>(1, {
	 *   alias: 'page',
	 *   transform: (value) => numberAttribute(value, 1),
	 * });
	 * ```
	 *
	 * This can replace `_pageQuery` and `currentPage` computed property.
	 */
	private readonly _pageQuery = toSignal(
		this._route.queryParamMap.pipe(
			map((params) => {
				const pageQuery = params.get('page');
				return pageQuery ? numberAttribute(pageQuery, 1) : undefined;
			}),
		),
	);

	public readonly currentPage = computed(() => this._pageQuery() ?? 1);

	public pages = [1, 2, 3, 4];
}
