import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsProgressImports } from '@capsule-ng/caps/progress';

@Component({
	selector: 'spartan-progress-preview',
	imports: [CapsProgressImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-4' },
	template: `
		<p id="upload-label" class="text-sm font-medium">Uploading document</p>
		<caps-progress
			id="upload-progress"
			[value]="value()"
			aria-labelledby="upload-label"
			aria-describedby="upload-help"
		/>
		<p id="upload-help" class="text-muted-foreground text-sm">{{ value() }} of 100 MB</p>
		<button capsButton type="button" variant="outline" (click)="advance()" [disabled]="value() === 100">
			Advance by 10 MB
		</button>
	`,
})
export class ProgressPreview {
	public readonly value = signal(30);
	advance() {
		this.value.update((value) => Math.min(100, value + 10));
	}
}
export const defaultImports = `import { CapsProgressImports } from '@capsule-ng/caps/progress';`;
export const defaultSkeleton = `<caps-progress [value]="33" aria-label="Uploading document" />`;
