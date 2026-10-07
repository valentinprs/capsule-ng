import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

@Component({
	selector: 'spartan-tabs-preview',
	imports: [CapsTabsImports, CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports],
	host: {
		class: 'block w-full max-w-lg',
	},
	template: `
		<caps-tabs value="account" class="w-full">
			<caps-tabs-list aria-label="tabs example">
				<button capsTabsTrigger value="account">Account</button>
				<button capsTabsTrigger value="password">Password</button>
			</caps-tabs-list>
			<caps-tabs-content value="account">
				<caps-card>
					<caps-card-header>
						<caps-card-title [level]="3">Account</caps-card-title>
						<caps-card-description>
							Make changes to your account here. Click save when you're done.
						</caps-card-description>
					</caps-card-header>
					<caps-card-content>
						<label class="my-4 block" capsLabel>
							Name
							<input class="mt-1.5 w-full" value="Pedro Duarte" capsInput />
						</label>
						<label class="my-4 block" capsLabel>
							Username
							<input class="mt-1.5 w-full" placeholder="@peduarte" capsInput />
						</label>
					</caps-card-content>
					<caps-card-footer class="gap-2">
						<button capsButton>Save Changes</button>
					</caps-card-footer>
				</caps-card>
			</caps-tabs-content>
			<caps-tabs-content value="password">
				<caps-card>
					<caps-card-header>
						<caps-card-title [level]="3">Password</caps-card-title>
						<caps-card-description>
							Change your password here. After saving, you'll be logged out.
						</caps-card-description>
					</caps-card-header>
					<caps-card-content>
						<label class="my-4 block" capsLabel>
							Old Password
							<input class="mt-1.5 w-full" type="password" capsInput />
						</label>
						<label class="my-4 block" capsLabel>
							New Password
							<input class="mt-1.5 w-full" type="password" capsInput />
						</label>
					</caps-card-content>
					<caps-card-footer class="gap-2">
						<button capsButton>Save Password</button>
					</caps-card-footer>
				</caps-card>
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsPreview {}

export const defaultImports = `
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
`;
export const defaultSkeleton = `
<caps-tabs value="account" class="w-full">
  <caps-tabs-list class="grid w-full grid-cols-2" aria-label="tabs example">
    <button capsTabsTrigger value="account">Account</button>
    <button capsTabsTrigger value="password">Password</button>
  </caps-tabs-list>
  <caps-tabs-content value="account">Make your account here</caps-tabs-content>
  <caps-tabs-content value="password">Change your password here</caps-tabs-content>
</caps-tabs>
`;
