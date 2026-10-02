import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitBranch } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-with-icon',
	imports: [CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideGitBranch })],

	template: `
		<div class="flex flex-wrap items-center gap-2 md:flex-row">
			<button capsButton variant="outline" size="sm">
				<ng-icon name="lucideGitBranch" data-icon="inline-start" />
				New Branch
			</button>
		</div>
	`,
})
export class ButtonWithIcon {}
