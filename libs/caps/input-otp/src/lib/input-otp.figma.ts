// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-16048
// source=libs/caps/input-otp/src/lib/caps-input-otp.ts
// component=CapsInputOtp
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

const slot = figma.selectedInstance;

// The Figma component is a single slot, laid out by hand; the snippet shows the whole 6-digit input.
// Not mapped: `Size` (no size in code), `Position` and `Filled`.
const invalid = slot.getEnum('State', { Error: ' forceInvalid', 'Error focus': ' forceInvalid' }) ?? '';
const slots = (from: number) =>
	[0, 1, 2].map((i) => `\n\t\t<caps-input-otp-slot index="${from + i}"${invalid} />`).join('');

export default {
	example: figma.code`<caps-input-otp aria-label="Verification code" length="6"${slot.getEnum('Disabled', disabled)}>
	<caps-input-otp-group>${slots(0)}
	</caps-input-otp-group>
	<caps-input-otp-separator />
	<caps-input-otp-group>${slots(3)}
	</caps-input-otp-group>
</caps-input-otp>`,
	imports: ["import { CapsInputOtpImports } from '@capsule-ng/caps/input-otp';"],
	id: 'caps-input-otp',
};
