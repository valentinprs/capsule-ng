// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=4215-18641
// source=libs/caps/date-picker/src/lib/caps-date-range-picker.ts
// component=CapsDateRangePicker
import figma from 'figma';

const picker = figma.selectedInstance;

// Not mapped: `Show presets` (no presets in code), `Open` and `State` (overlay and focus states).
const filled = picker.getEnum('Filled', { True: true, False: false });
const trigger = picker.findInstance('Trigger');
const input = trigger.type === 'INSTANCE' ? trigger.findInstance('Input') : trigger;
const label = !filled && input.type === 'INSTANCE' ? input.getString('Value') : 'Pick a date range';

export default {
	example: figma.code`<caps-date-range-picker${filled ? ' [date]="range"' : ''}>
	<caps-date-picker-trigger>${label}</caps-date-picker-trigger>
</caps-date-range-picker>`,
	imports: ["import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';"],
	id: 'caps-date-range-picker',
};
