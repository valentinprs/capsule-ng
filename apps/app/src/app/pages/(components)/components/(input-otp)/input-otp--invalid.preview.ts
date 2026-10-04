import { Component } from '@angular/core';
import { CapsInputOtpImports } from '@capsule-ng/caps/input-otp';

@Component({
	selector: 'spartan-input-otp-invalid',
	imports: [CapsInputOtpImports],
	template: `
		<caps-input-otp aria-label="Verification code" length="6">
			<caps-input-otp-group>
				<caps-input-otp-slot index="0" forceInvalid />
				<caps-input-otp-slot index="1" forceInvalid />
				<caps-input-otp-slot index="2" forceInvalid />
			</caps-input-otp-group>
			<caps-input-otp-separator />
			<caps-input-otp-group>
				<caps-input-otp-slot index="3" forceInvalid />
				<caps-input-otp-slot index="4" forceInvalid />
				<caps-input-otp-slot index="5" forceInvalid />
			</caps-input-otp-group>
		</caps-input-otp>
	`,
})
export class InputOtpInvalid {}
