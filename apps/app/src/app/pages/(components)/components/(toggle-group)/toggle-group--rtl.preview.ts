import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-toggle-group-rtl',
	imports: [CapsToggleGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group aria-label="Formatting" variant="outline" value="list" [dir]="_dir()">
			<button capsToggleItem value="list" [aria-label]="_t()['list']">
				{{ _t()['list'] }}
			</button>

			<button capsToggleItem value="grid" [aria-label]="_t()['grid']">
				{{ _t()['grid'] }}
			</button>

			<button capsToggleItem value="cards" [aria-label]="_t()['cards']">
				{{ _t()['cards'] }}
			</button>
		</caps-toggle-group>
	`,
})
export class ToggleGroupRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				list: 'List',
				grid: 'Grid',
				cards: 'Cards',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				list: 'قائمة',
				grid: 'شبكة',
				cards: 'بطاقات',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				list: 'רשימה',
				grid: 'רשת',
				cards: 'כרטיסים',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
