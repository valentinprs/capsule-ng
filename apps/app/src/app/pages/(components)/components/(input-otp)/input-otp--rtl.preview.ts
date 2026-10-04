import { Component, computed, inject } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputOtpImports } from '@capsule-ng/caps/input-otp';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-input-otp-rtl',
	imports: [CapsFieldImports, CapsInputOtpImports],
	template: `
		<caps-field class="mx-auto max-w-xs" [dir]="_dir()">
			<caps-field-label for="input-otp-rtl">{{ _t()['verificationCode'] }}</caps-field-label>
			<caps-input-otp id="input-otp-rtl" value="123456" length="6">
				<caps-input-otp-group>
					<caps-input-otp-slot index="0" />
					<caps-input-otp-slot index="1" />
					<caps-input-otp-slot index="2" />
					<caps-input-otp-slot index="3" />
					<caps-input-otp-slot index="4" />
					<caps-input-otp-slot index="5" />
				</caps-input-otp-group>
			</caps-input-otp>
		</caps-field>
	`,
})
export class InputOtpRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				verificationCode: 'Verification code',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				verificationCode: 'رمز التحقق',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				verificationCode: 'קוד אימות',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
