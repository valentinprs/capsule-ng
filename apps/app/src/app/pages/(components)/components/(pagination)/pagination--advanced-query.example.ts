import { Component, computed, inject, numberAttribute, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CapsPaginationImports, createPageArray } from '@capsule-ng/caps/pagination';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { map } from 'rxjs/operators';

@Component({
	selector: 'spartan-pagination-advanced-query-params',
	imports: [CapsPaginationImports, CapsSelectImports, RouterLink],
	template: `
		<div class="flex flex-wrap items-center gap-4">
			<span class="text-sm">{{ totalProducts() }} total items</span>
			<caps-pagination>
				<a
					capsPaginationPrevious
					routerLink="."
					[queryParams]="{ page: page() - 1 }"
					queryParamsHandling="merge"
					[disabled]="page() <= 1"
				>
					Previous
				</a>
				@for (number of pages(); track $index) {
					@if (number === '...') {
						<caps-pagination-ellipsis />
					} @else {
						<a
							capsPaginationLink
							routerLink="."
							[queryParams]="{ page: number }"
							queryParamsHandling="merge"
							[isActive]="number === page()"
						>
							{{ number }}
						</a>
					}
				}
				<a
					capsPaginationNext
					routerLink="."
					[queryParams]="{ page: page() + 1 }"
					queryParamsHandling="merge"
					[disabled]="page() >= lastPage()"
				>
					Next
				</a>
			</caps-pagination>
			<caps-select [value]="pageSize()" (valueChange)="changeSize($event)" aria-label="Items per page">
				@for (size of [10, 20, 50, 100]; track size) {
					<caps-select-option [value]="size">{{ size }}</caps-select-option>
				}
			</caps-select>
		</div>
	`,
})
export class PaginationAdvancedQuery {
	private readonly _route = inject(ActivatedRoute);
	private readonly _router = inject(Router);

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
	 * This can replace `_pageQuery` and `page` computed property.
	 */
	private readonly _pageQuery = toSignal(
		this._route.queryParamMap.pipe(
			map((params) => {
				const pageQuery = params.get('page');
				return pageQuery ? numberAttribute(pageQuery, 1) : undefined;
			}),
		),
	);
	public readonly page = computed(() => Math.min(this.lastPage(), Math.max(1, this._pageQuery() ?? 1)));
	public readonly pageSize = signal(10);
	public readonly totalProducts = signal(100);
	public readonly lastPage = computed(() => Math.max(1, Math.ceil(this.totalProducts() / this.pageSize())));
	public readonly pages = computed(() => createPageArray(this.page(), this.pageSize(), this.totalProducts(), 7));
	protected changeSize(value: unknown) {
		if (typeof value === 'number') {
			this.pageSize.set(value);
			void this._router.navigate([], {
				relativeTo: this._route,
				queryParams: { page: 1 },
				queryParamsHandling: 'merge',
			});
		}
	}
}
