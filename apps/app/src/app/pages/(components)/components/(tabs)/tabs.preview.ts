import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
	selector: 'spartan-tabs-preview',
	imports: [HlmTabsImports, CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports],
	host: {
		class: 'block w-full max-w-lg',
	},
	template: `
		<hlm-tabs tab="account" class="w-full">
			<hlm-tabs-list aria-label="tabs example">
				<button hlmTabsTrigger="account">Account</button>
				<button hlmTabsTrigger="password">Password</button>
			</hlm-tabs-list>
			<div hlmTabsContent="account">
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
			</div>
			<div hlmTabsContent="password">
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
			</div>
		</hlm-tabs>
	`,
})
export class TabsPreview {}

export const defaultImports = `
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
`;
export const defaultSkeleton = `
<hlm-tabs tab="account" class="w-full">
  <hlm-tabs-list class="grid w-full grid-cols-2" aria-label="tabs example">
    <button hlmTabsTrigger="account">Account</button>
    <button hlmTabsTrigger="password">Password</button>
  </hlm-tabs-list>
  <div hlmTabsContent="account">Make your account here</div>
  <div hlmTabsContent="password">Change your password here</div>
</hlm-tabs>
`;
