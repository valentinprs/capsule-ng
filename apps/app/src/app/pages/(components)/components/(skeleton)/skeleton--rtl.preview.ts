import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-skeleton-rtl',
	imports: [CapsSkeletonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div aria-busy="true" class="flex w-fit items-center gap-4" [dir]="_dir()">
			<caps-skeleton class="size-10 shrink-0 rounded-full" />
			<div class="grid gap-2">
				<caps-skeleton class="h-4 w-[150px]" />
				<caps-skeleton class="h-4 w-[100px]" />
			</div>
		</div>
	`,
})
export class SkeletonRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {},
		},
		ar: {
			dir: 'rtl',
			values: {},
		},
		he: {
			dir: 'rtl',
			values: {},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _dir = computed(() => this._translation().dir);
}
