import { Component, signal } from '@angular/core';
import { CapsNumberedPagination } from '@capsule-ng/caps/pagination';

@Component({
	selector: 'spartan-pagination-advanced',
	imports: [CapsNumberedPagination],
	template: `
		<caps-numbered-pagination [(currentPage)]="page" [(itemsPerPage)]="pageSize" [totalDataLength]="totalProducts()" />
	`,
})
export class PaginationAdvanced {
	public readonly page = signal(1);
	public readonly pageSize = signal(10);
	public readonly totalProducts = signal(100);
}
