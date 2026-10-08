import { Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-preview',
	imports: [NgIcon, CapsButton, CapsEmptyImports],
	providers: [provideIcons({ lucideFolderCode, lucideArrowUpRight })],
	template: `
		<caps-empty>
			<caps-empty-media variant="icon">
				<ng-icon aria-hidden="true" name="lucideFolderCode" />
			</caps-empty-media>
			<caps-empty-title>No Projects Yet</caps-empty-title>
			<caps-empty-description>
				You haven&apos;t created any projects yet. Get started by creating your first project.
			</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton (click)="_action.set('Project created in this demo')">Create Project</button>
				<button type="button" capsButton variant="outline" (click)="_action.set('Import selected in this demo')">
					Import Project
				</button>
			</caps-empty-actions>
			<a href="/documentation/installation" capsButton class="text-muted-foreground" variant="link" size="sm">
				Learn More
				<ng-icon aria-hidden="true" name="lucideArrowUpRight" />
			</a>
		</caps-empty>
		@if (_action()) {
			<p role="status" class="mt-3 text-center text-sm">{{ _action() }}</p>
		}
	`,
})
export class EmptyPreview {
	protected readonly _action = signal('');
}

export const defaultImports = `
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon } from '@ng-icons/core';
`;

export const defaultSkeleton = `
<caps-empty>
    <caps-empty-media variant="icon">
      <ng-icon aria-hidden="true" name="lucideFolderCode" />
    </caps-empty-media>
    <caps-empty-title>No data</caps-empty-title>
    <caps-empty-description>No data found</caps-empty-description>

  <caps-empty-actions>
    <button type="button" capsButton>Add data</button>
  </caps-empty-actions>
</caps-empty>
`;
