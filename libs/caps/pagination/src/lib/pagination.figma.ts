// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1962-14050
// source=libs/caps/pagination/src/lib/caps-pagination.ts
// component=CapsPagination
import figma from 'figma';
import { lines, slotContent } from '../../../code-connect/helpers';

const pagination = figma.selectedInstance;

// Previous / Next are the ghost Buttons around the slot; their labels are kept.
const buttons = pagination.findConnectedInstances((node) => node.name === 'Button');
const label = (index: number, fallback: string) => {
	const button = buttons[index];
	return button?.type === 'INSTANCE' ? button.getString('Label') : fallback;
};

// The pages of the slot (Pagination Number Button and Pagination Ellipsis) keep their order.
const pages = slotContent(pagination, 'Pages');

export default {
	example: figma.code`<caps-pagination>
	<a capsPaginationPrevious href="#"><span>${label(0, 'Previous')}</span></a>${lines(pages, '\t')}
	<a capsPaginationNext href="#"><span>${label(buttons.length - 1, 'Next')}</span></a>
</caps-pagination>`,
	imports: ["import { CapsPaginationImports } from '@capsule-ng/caps/pagination';"],
	id: 'caps-pagination',
};
