// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-12844
// source=libs/caps/table/src/lib/caps-table.ts
// component=CapsTable
import figma from 'figma';

// A header cell of a `table[capsTable]`, inside `<caps-table-container>`.
export default {
	example: figma.code`<th scope="col">${figma.selectedInstance.getString('Label')}</th>`,
	imports: ["import { CapsTableImports } from '@capsule-ng/caps/table';"],
	id: 'caps-table-header',
};
