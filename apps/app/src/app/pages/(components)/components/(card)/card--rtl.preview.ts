import { Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-card-rtl',
	imports: [CapsCardImports, CapsFieldImports, CapsLinkImports, CapsInputImports, CapsButtonImports],
	host: { class: 'w-full max-w-md' },
	template: `
		<caps-card class="w-full max-w-sm" [dir]="_dir()">
			<caps-card-header>
				<caps-card-title [level]="3">{{ _t()['title'] }}</caps-card-title>
				<caps-card-description>{{ _t()['description'] }}</caps-card-description>

				<caps-card-action>
					<button capsButton variant="link">{{ _t()['signUp'] }}</button>
				</caps-card-action>
			</caps-card-header>

			<caps-card-content>
				<form id="login-form-rtl">
					<caps-field-group>
						<caps-field>
							<caps-field-label>{{ _t()['email'] }}</caps-field-label>
							<input type="email" placeholder="{{ _t()['emailPlaceholder'] }}" required capsInput />
						</caps-field>

						<caps-field>
							<div class="flex items-center">
								<caps-field-label>{{ _t()['password'] }}</caps-field-label>
								<a capsLink href="#" class="ms-auto text-sm">
									{{ _t()['forgotPassword'] }}
								</a>
							</div>
							<input type="password" capsInput />
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>

			<caps-card-footer class="flex-col gap-2">
				<button capsButton type="submit" class="w-full" form="login-form-rtl">{{ _t()['login'] }}</button>
				<button capsButton variant="outline" class="w-full">{{ _t()['loginWithGoogle'] }}</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardRtl {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				title: 'Login to your account',
				description: 'Enter your email below to login to your account',
				signUp: 'Sign Up',
				email: 'Email',
				emailPlaceholder: 'm@example.com',
				password: 'Password',
				forgotPassword: 'Forgot your password?',
				login: 'Login',
				loginWithGoogle: 'Login with Google',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				title: 'تسجيل الدخول إلى حسابك',
				description: 'أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك',
				signUp: 'إنشاء حساب',
				email: 'البريد الإلكتروني',
				emailPlaceholder: 'm@example.com',
				password: 'كلمة المرور',
				forgotPassword: 'نسيت كلمة المرور؟',
				login: 'تسجيل الدخول',
				loginWithGoogle: 'تسجيل الدخول باستخدام Google',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				title: 'התחבר לחשבון שלך',
				description: 'הזן את האימייל שלך למטה כדי להתחבר לחשבון שלך',
				signUp: 'הירשם',
				email: 'אימייל',
				emailPlaceholder: 'm@example.com',
				password: 'סיסמה',
				forgotPassword: 'שכחת את הסיסמה?',
				login: 'התחבר',
				loginWithGoogle: 'התחבר עם Google',
			},
		},
	};
	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
