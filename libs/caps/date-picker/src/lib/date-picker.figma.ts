// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-6891
// source=libs/caps/date-picker/src/lib/caps-date-picker.ts
// component=CapsDatePicker
import figma from 'figma';

const picker = figma.selectedInstance;

// The trigger text is the placeholder; a filled Figma value is a formatted date, bound with `[date]`
// in code. Not mapped: `State` (focus).
const filled = picker.getEnum('Filled', { True: true, False: false });
const input = picker.findInstance('Input');
const label = !filled && input.type === 'INSTANCE' ? input.getString('Value') : 'Pick a date';

export default {
	example: figma.code`<caps-date-picker${filled ? ' [date]="date"' : ''}>
	<caps-date-picker-trigger>${label}</caps-date-picker-trigger>
</caps-date-picker>`,
	imports: ["import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';"],
	id: 'caps-date-picker',
};
