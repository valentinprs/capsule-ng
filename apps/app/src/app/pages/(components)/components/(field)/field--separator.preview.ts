import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixGithubFill } from '@ng-icons/remixicon';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-field-separator-preview',
	imports: [CapsFieldImports, HlmButtonImports, CapsInputImports, NgIcon, RouterLink],
	providers: [provideIcons({ remixGithubFill })],
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-field-group>
			<caps-field>
				<label capsLabel for="field-separator-email">Email</label>
				<input capsInput id="field-separator-email" type="email" placeholder="m@example.com" />
			</caps-field>
			<caps-field>
				<button hlmBtn type="submit">Login</button>
			</caps-field>
			<caps-field-separator>Or continue with</caps-field-separator>
			<caps-field>
				<button hlmBtn variant="outline" type="button">
					<ng-icon name="remixGithubFill" class="text-xl" />
					Login with GitHub
				</button>
				<caps-field-description class="text-center">
					Don't have an account?
					<a routerLink=".">Sign up</a>
				</caps-field-description>
			</caps-field>
		</caps-field-group>
	`,
})
export class FieldSeparatorPreview {}
