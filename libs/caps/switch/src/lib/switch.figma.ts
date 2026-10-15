// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-13000
// source=libs/caps/switch/src/lib/caps-switch.ts
// component=CapsSwitch
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

const control = figma.selectedInstance;

// `State` (Focus) is not mapped: it is a CSS state.
const size = control.getEnum('Size', { Default: '', Small: ' size="sm"' });
const checked = control.getEnum('Checked', { False: '', True: ' checked' });

export default {
	example: figma.code`<caps-switch${size}${checked}${control.getEnum('Disabled', disabled)} aria-label="" />`,
	imports: ["import { CapsSwitchImports } from '@capsule-ng/caps/switch';"],
	id: 'caps-switch',
};
