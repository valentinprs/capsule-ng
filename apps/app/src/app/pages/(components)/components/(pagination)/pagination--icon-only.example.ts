import { Component } from '@angular/core';
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';

@Component({
	selector: 'spartan-pagination-icon-only',
	imports: [CapsPaginationImports],
	template: `
		<caps-pagination>
			<a capsPaginationPrevious href="/components/menubar"><span class="sr-only">Previous</span></a>
			<a capsPaginationLink href="#">1</a>
			<a capsPaginationLink href="#" isActive>2</a>
			<a capsPaginationLink href="#">3</a>
			<caps-pagination-ellipsis />
			<a capsPaginationNext href="/components/popover"><span class="sr-only">Next</span></a>
		</caps-pagination>
	`,
})
export class PaginationIconOnly {}
