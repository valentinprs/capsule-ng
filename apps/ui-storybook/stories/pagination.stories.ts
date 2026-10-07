import { CapsPagination, CapsPaginationImports } from '@capsule-ng/caps/pagination';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsPagination> = {
	title: 'Pagination',
	component: CapsPagination,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsPaginationImports],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsPagination>;

export const Default: Story = {
	render: () => ({
		template: `
    <caps-pagination>
			<a capsPaginationPrevious href="#"><span>Previous</span></a>
				<a capsPaginationLink href="#">1</a>
				<a capsPaginationLink href="#" isActive>2</a>
				<a capsPaginationLink href="#">3</a>
				<caps-pagination-ellipsis />
				<a capsPaginationNext href="#"><span>Next</span></a>
		</caps-pagination>
    `,
	}),
};

export const Numbered: Story = {
	render: () => ({ template: '<caps-numbered-pagination [totalDataLength]="100" />' }),
};
export const Disabled: Story = {
	render: () => ({
		template:
			'<caps-pagination aria-label="Disabled result pages"><a capsPaginationPrevious href="?page=1" disabled>Previous</a><button type="button" capsPaginationLink isActive>1</button><button type="button" capsPaginationNext disabled>Next</button></caps-pagination>',
	}),
};
