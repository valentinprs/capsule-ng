import { Component } from '@angular/core';
import { CapsInputOtpImports } from '@capsule-ng/caps/input-otp';

@Component({
	selector: 'spartan-input-otp-preview',
	imports: [CapsInputOtpImports],
	template: `
		<caps-input-otp aria-label="Verification code" length="6">
			<caps-input-otp-group>
				<caps-input-otp-slot index="0" />
				<caps-input-otp-slot index="1" />
				<caps-input-otp-slot index="2" />
			</caps-input-otp-group>
			<caps-input-otp-separator />
			<caps-input-otp-group>
				<caps-input-otp-slot index="3" />
				<caps-input-otp-slot index="4" />
				<caps-input-otp-slot index="5" />
			</caps-input-otp-group>
		</caps-input-otp>
	`,
})
export class InputOtpPreview {}

export const defaultImports = `
import { CapsInputOtpImports } from '@capsule-ng/caps/input-otp';
`;
export const defaultSkeleton = `
<caps-input-otp aria-label="Verification code" length="6">
  <caps-input-otp-group>
    <caps-input-otp-slot index="0" />
    <caps-input-otp-slot index="1" />
    <caps-input-otp-slot index="2" />
  </caps-input-otp-group>
  <caps-input-otp-separator />
  <caps-input-otp-group>
    <caps-input-otp-slot index="3" />
    <caps-input-otp-slot index="4" />
    <caps-input-otp-slot index="5" />
  </caps-input-otp-group>
</caps-input-otp>
`;
