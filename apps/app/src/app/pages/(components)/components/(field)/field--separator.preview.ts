import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixGithubFill } from '@ng-icons/remixicon';

@Component({
	selector: 'spartan-field-separator-preview',
	imports: [CapsLinkImports, CapsFieldImports, CapsButtonImports, CapsInputImports, NgIcon, RouterLink],
	providers: [provideIcons({ remixGithubFill })],
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-field-group>
			<caps-field>
				<caps-field-label for="field-separator-email">Email</caps-field-label>
				<input capsInput id="field-separator-email" type="email" placeholder="m@example.com" />
			</caps-field>
			<caps-field>
				<button capsButton type="submit">Login</button>
			</caps-field>
			<caps-field-separator>Or continue with</caps-field-separator>
			<caps-field>
				<button capsButton variant="outline" type="button">
					<ng-icon name="remixGithubFill" class="text-xl" />
					Login with GitHub
				</button>
				<caps-field-description class="text-center">
					Don't have an account?
					<a capsLink routerLink=".">Sign up</a>
				</caps-field-description>
			</caps-field>
		</caps-field-group>
	`,
})
export class FieldSeparatorPreview {}
