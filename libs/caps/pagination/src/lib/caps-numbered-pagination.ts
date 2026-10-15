import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	model,
	numberAttribute,
} from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import {
	CapsPagination,
	CapsPaginationEllipsis,
	CapsPaginationLink,
	CapsPaginationNext,
	CapsPaginationPrevious,
} from './caps-pagination';
import { createPageArray } from './page-array';

@Component({
	selector: 'caps-numbered-pagination',
	imports: [
		CapsPagination,
		CapsPaginationLink,
		CapsPaginationPrevious,
		CapsPaginationNext,
		CapsPaginationEllipsis,
		CapsSelectImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="caps-numbered-pagination">
			<span class="text-sm">{{ totalDataLength() }} total items | {{ _lastPage() }} pages</span>
			<caps-pagination>
				@if (showEdges()) {
					<button type="button" capsPaginationPrevious [disabled]="_page() <= 1" (click)="currentPage.set(_page() - 1)">
						Previous
					</button>
				}
				@for (page of _pages(); track $index) {
					@if (page === '...') {
						<caps-pagination-ellipsis />
					} @else {
						<button type="button" capsPaginationLink [isActive]="page === _page()" (click)="currentPage.set(page)">
							{{ page }}
						</button>
					}
				}
				@if (showEdges()) {
					<button
						type="button"
						capsPaginationNext
						[disabled]="_page() >= _lastPage()"
						(click)="currentPage.set(_page() + 1)"
					>
						Next
					</button>
				}
			</caps-pagination>
			<caps-select [value]="itemsPerPage()" (valueChange)="changePageSize($event)" aria-label="Items per page">
				@for (size of _sizes(); track size) {
					<caps-select-option [value]="size">{{ size }}</caps-select-option>
				}
			</caps-select>
		</div>
	`,
})
export class CapsNumberedPagination {
	public readonly currentPage = model<number>(1);
	public readonly itemsPerPage = model<number>(10);
	public readonly totalDataLength = input<number, NumberInput>(0, { transform: numberAttribute });
	public readonly numOfItemsToShow = input<number, NumberInput>(7, { transform: numberAttribute });
	public readonly showEdges = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	public readonly itemsPerPageOptions = input<number[]>([10, 20, 50, 100]);
	protected readonly _lastPage = computed(() =>
		Math.max(1, Math.ceil(Math.max(0, this.totalDataLength()) / Math.max(1, this.itemsPerPage()))),
	);
	protected readonly _page = computed(() =>
		Math.min(this._lastPage(), Math.max(1, Math.floor(this.currentPage()) || 1)),
	);
	protected readonly _sizes = computed(() =>
		[...new Set([...this.itemsPerPageOptions(), this.itemsPerPage()])].filter((size) => size > 0).sort((a, b) => a - b),
	);
	protected readonly _pages = computed(() =>
		createPageArray(
			this._page(),
			Math.max(1, this.itemsPerPage()),
			this.totalDataLength(),
			Math.max(5, this.numOfItemsToShow()),
		),
	);
	constructor() {
		effect(() => {
			if (this.currentPage() !== this._page()) this.currentPage.set(this._page());
		});
	}
	protected changePageSize(value: unknown) {
		if (typeof value === 'number') {
			this.itemsPerPage.set(value);
			this.currentPage.set(1);
		}
	}
}
