import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
	selector: 'spartan-tabs-vertical',
	imports: [HlmTabsImports, CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports],
	host: {
		class: 'block w-full max-w-lg min-h-[400px]',
	},
	template: `
		<hlm-tabs tab="account" class="mx-auto flex max-w-3xl flex-row space-x-2" orientation="vertical">
			<hlm-tabs-list aria-label="tabs example">
				<button class="w-full" hlmTabsTrigger="account">Account</button>
				<button class="w-full" hlmTabsTrigger="password">Password</button>
				<button class="w-full" hlmTabsTrigger="danger">Danger Zone</button>
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
			<div hlmTabsContent="danger">
				<caps-card>
					<caps-card-header>
						<caps-card-title [level]="3">Delete Account</caps-card-title>
						<caps-card-description>
							Are you sure you want to delete your account? You cannot undo this action.
						</caps-card-description>
					</caps-card-header>
					<caps-card-footer class="gap-2">
						<button variant="destructive" capsButton>Delete Account</button>
					</caps-card-footer>
				</caps-card>
			</div>
		</hlm-tabs>
	`,
})
export class TabsVerticalPreview {}
