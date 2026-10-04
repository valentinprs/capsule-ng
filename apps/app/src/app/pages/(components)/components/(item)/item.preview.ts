import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideChevronRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-preview',
	imports: [CapsItemImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideBadgeCheck, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
	},
	template: `
		<caps-item>
			<caps-item-content>
				<caps-item-title>Basic Item</caps-item-title>
				<caps-item-description>A simple item with title and description.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton variant="outline" size="sm">Action</button>
			</caps-item-actions>
		</caps-item>
		<a capsItem href="#">
			<caps-item-media>
				<ng-icon name="lucideBadgeCheck" class="text-[length:--spacing(5)]" />
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>Your profile has been verified.</caps-item-title>
			</caps-item-content>
			<caps-item-actions>
				<ng-icon name="lucideChevronRight" class="text-[length:--spacing(4)]" />
			</caps-item-actions>
		</a>
	`,
})
export class ItemPreview {}

export const defaultImports = `
import { CapsItemImports } from '@capsule-ng/caps/item';
import { CapsButtonImports } from '@capsule-ng/caps/button';
`;

export const defaultSkeleton = `
<caps-item>
  <caps-item-media>
    <span aria-hidden="true">●</span>
  </caps-item-media>
  <caps-item-content>
    <caps-item-title>Title</caps-item-title>
    <caps-item-description>Description</caps-item-description>
  </caps-item-content>
  <caps-item-actions>
    <button capsButton>Action</button>
  </caps-item-actions>
</caps-item>
`;

export const itemComposition = `
caps-item-group
└── caps-item
    ├── caps-item-header
    ├── caps-item-media
    ├── caps-item-content
    │   ├── caps-item-title
    │   └── caps-item-description
    ├── caps-item-actions
    └── caps-item-footer
`;
