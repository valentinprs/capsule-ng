import { Component } from '@angular/core';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';
import { CapsLink } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-input-group',
	imports: [CapsLink, CapsInputImports, NgIcon, CapsEmptyImports, CapsInputGroupImports, CapsKbdImports],
	providers: [provideIcons({ lucideSearch })],
	template: `
		<caps-empty>
			<caps-empty-title>404 - Not Found</caps-empty-title>
			<caps-empty-description>
				The page you're looking for doesn't exist. Try searching for what you need below.
			</caps-empty-description>

			<caps-empty-content>
				<caps-input-group class="sm:w-3/4">
					<input capsInput placeholder="Try searching for pages..." aria-label="Try searching for pages" />
					<caps-input-group-addon>
						<ng-icon aria-hidden="true" name="lucideSearch" />
					</caps-input-group-addon>
					<caps-input-group-addon align="inline-end">
						<kbd capsKbd>/</kbd>
					</caps-input-group-addon>
				</caps-input-group>
				<caps-empty-description>
					Need help?
					<a capsLink href="/documentation/installation">Read the installation guide</a>
				</caps-empty-description>
			</caps-empty-content>
		</caps-empty>
	`,
})
export class EmptyInputGroup {}
