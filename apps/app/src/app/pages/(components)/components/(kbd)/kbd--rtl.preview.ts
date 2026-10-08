import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-kbd-rtl-preview',
	imports: [CapsKbdImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col items-center gap-4" [dir]="_dir()">
			<caps-kbd-group>
				<kbd capsKbd>⌘</kbd>
				<kbd capsKbd>⇧</kbd>
				<kbd capsKbd>⌥</kbd>
				<kbd capsKbd>⌃</kbd>
			</caps-kbd-group>
			<caps-kbd-group>
				<kbd capsKbd>Ctrl</kbd>
				<span>+</span>
				<kbd capsKbd>B</kbd>
			</caps-kbd-group>
		</div>
	`,
})
export class KbdRtlPreview {
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
