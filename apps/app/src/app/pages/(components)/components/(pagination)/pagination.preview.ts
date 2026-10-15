import { Component } from '@angular/core';
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';

@Component({
	selector: 'spartan-pagination-preview',
	imports: [CapsPaginationImports],
	template: `
		<caps-pagination>
			<a capsPaginationPrevious href="/components/menubar"><span>Previous</span></a>
			<a capsPaginationLink href="#">1</a>
			<a capsPaginationLink href="#" isActive>2</a>
			<a capsPaginationLink href="#">3</a>
			<caps-pagination-ellipsis />
			<a capsPaginationNext href="/components/popover"><span>Next</span></a>
		</caps-pagination>
	`,
})
export class PaginationPreview {}

export const defaultImports = `
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';
`;

export const defaultSkeleton = `
<caps-pagination>
  <a capsPaginationPrevious href="/components/menubar"><span>Previous</span></a>
    <a capsPaginationLink href="#">1</a>
    <a capsPaginationLink href="#" isActive>2</a>
    <a capsPaginationLink href="#">3</a>
    <caps-pagination-ellipsis />
    <a capsPaginationNext href="/components/popover"><span>Next</span></a>
</caps-pagination>
`;
