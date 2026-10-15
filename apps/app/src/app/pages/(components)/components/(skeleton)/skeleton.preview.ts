import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';

@Component({
	selector: 'spartan-skeleton-preview',
	imports: [CapsSkeletonImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-4' },
	template: `
		<section aria-label="Profile" [attr.aria-busy]="loading()">
			@if (loading()) {
				<div class="flex items-center gap-4">
					<caps-skeleton class="size-12 rounded-full" />
					<div class="min-w-0 flex-1 space-y-2">
						<caps-skeleton class="h-4 w-full" />
						<caps-skeleton class="h-4 w-4/5" />
					</div>
				</div>
			} @else {
				<p>Alice Martin — Designer</p>
			}
		</section>
		<button capsButton type="button" variant="outline" (click)="loading.set(!loading())">Toggle profile preview</button>
	`,
})
export class SkeletonPreview {
	public readonly loading = signal(true);
}
export const defaultImports = `import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';`;
export const defaultSkeleton = `<section aria-label="Profile" aria-busy="true"><caps-skeleton class="h-4 w-48" /></section>`;
