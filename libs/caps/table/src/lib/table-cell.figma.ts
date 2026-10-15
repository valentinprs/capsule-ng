// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-12862
// source=libs/caps/table/src/lib/caps-table.ts
// component=CapsTable
import figma from 'figma';

const cell = figma.selectedInstance;

// `Parity` (Odd / Even rows) is the `striped` input of `table[capsTable]`, not a cell attribute.
const align = cell.getEnum('Alignment', { Left: '', Right: ' class="text-right"' });

export default {
	example: figma.code`<td${align}>${cell.getString('Value')}</td>`,
	imports: ["import { CapsTableImports } from '@capsule-ng/caps/table';"],
	id: 'caps-table-cell',
};
