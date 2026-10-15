// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-17986
// source=libs/caps/pagination/src/lib/caps-pagination.ts
// component=CapsPaginationLink
import figma from 'figma';

const page = figma.selectedInstance;

// The page number is the label of the nested Button.
const button = page.findInstance('Button');
const number = button.type === 'INSTANCE' ? button.getString('Label') : '';
const active = page.getEnum('Active', { True: ' isActive', False: '' });

export default {
	example: figma.code`<a capsPaginationLink href="#"${active}>${number}</a>`,
	imports: ["import { CapsPaginationImports } from '@capsule-ng/caps/pagination';"],
	id: 'caps-pagination-link',
};
