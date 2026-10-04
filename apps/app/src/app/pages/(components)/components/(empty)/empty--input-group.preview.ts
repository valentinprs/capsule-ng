import { Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmKbdImports } from '@spartan-ng/helm/kbd';

@Component({
	selector: 'spartan-empty-input-group',
	imports: [CapsInputImports, NgIcon, HlmEmptyImports, CapsInputGroupImports, HlmKbdImports],
	providers: [provideIcons({ lucideSearch })],
	template: `
		<hlm-empty>
			<hlm-empty-header>
				<div hlmEmptyTitle>404 - Not Found</div>
				<div hlmEmptyDescription>The page you're looking for doesn't exist. Try searching for what you need below.</div>
			</hlm-empty-header>
			<hlm-empty-content>
				<caps-input-group class="sm:w-3/4">
					<input capsInput placeholder="Try searching for pages..." aria-label="Try searching for pages" />
					<caps-input-group-addon>
						<ng-icon name="lucideSearch" />
					</caps-input-group-addon>
					<caps-input-group-addon align="inline-end">
						<kbd hlmKbd>/</kbd>
					</caps-input-group-addon>
				</caps-input-group>
				<div hlmEmptyDescription>
					Need help?
					<a href="#">Contact Support</a>
				</div>
			</hlm-empty-content>
		</hlm-empty>
	`,
})
export class EmptyInputGroup {}
