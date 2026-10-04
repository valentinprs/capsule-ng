import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLinkImports } from '@capsule-ng/caps/link';

@Component({
	selector: 'spartan-card-preview',
	imports: [CapsCardImports, CapsFieldImports, CapsLinkImports, CapsInputImports, CapsButtonImports],
	host: { class: 'w-full max-w-md' },
	template: `
		<caps-card class="w-full max-w-sm">
			<caps-card-header>
				<caps-card-title [level]="2">Login to your account</caps-card-title>
				<caps-card-description>Enter your email below to login to your account</caps-card-description>

				<caps-card-action>
					<button capsButton variant="link">Sign Up</button>
				</caps-card-action>
			</caps-card-header>

			<caps-card-content>
				<form id="login-form">
					<caps-field-group>
						<caps-field>
							<caps-field-label>Email</caps-field-label>
							<input type="email" placeholder="m@example.com" required capsInput />
						</caps-field>

						<caps-field>
							<div class="flex items-center">
								<caps-field-label>Password</caps-field-label>
								<a capsLink href="#" class="ms-auto text-sm">Forgot your password?</a>
							</div>
							<input type="password" capsInput />
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>

			<caps-card-footer class="flex-col gap-2">
				<button capsButton type="submit" class="w-full" form="login-form">Login</button>
				<button capsButton variant="outline" class="w-full">Login with Google</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardPreview {}

export const defaultImports = `
import { CapsCardImports } from '@capsule-ng/caps/card';
`;

export const defaultSkeleton = `
<caps-card>
  <caps-card-header>
    <caps-card-title [level]="3">Card Title</caps-card-title>
    <caps-card-description>Card Description</caps-card-description>
    <caps-card-action>Card Action</caps-card-action>
  </caps-card-header>
  <caps-card-content>Card Content</caps-card-content>
  <caps-card-footer>Card Footer</caps-card-footer>
</caps-card>
`;
