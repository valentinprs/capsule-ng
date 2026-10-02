import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { REPOSITORY_URL } from '../../../site.config';

@Component({
	selector: 'spartan-open-in-component-button',
	imports: [HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideGithub })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a hlmBtn size="sm" [href]="_url()" target="_blank">
			Open in
			<ng-icon name="lucideGithub" />
		</a>
	`,
})
export class OpenInComponentButton {
	public readonly block = input.required<string>();

	protected readonly _url = computed(
		() =>
			`${REPOSITORY_URL}/blob/${import.meta.env['VITE_SOURCE_REF'] || 'main'}/apps/app/src/app/pages/(blocks)/blocks/calendar/${this.block()}`,
	);
}
