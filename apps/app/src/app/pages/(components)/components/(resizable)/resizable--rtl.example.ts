import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-resizable-rtl-preview',
	imports: [CapsResizableImports],
	providers: [Directionality],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full min-w-0',
		'[dir]': '_dir()',
	},
	template: `
		<caps-resizable-group class="h-[200px] max-w-md rounded-lg border">
			<caps-resizable-panel defaultSize="50">
				<div class="flex h-[200px] items-center justify-center p-6">
					<span class="font-semibold">{{ _t()['one'] }}</span>
				</div>
			</caps-resizable-panel>
			<caps-resizable-handle [attr.aria-label]="_t()['one'] + ' — ' + _t()['width']" withHandle />
			<caps-resizable-panel defaultSize="50">
				<caps-resizable-group direction="vertical">
					<caps-resizable-panel defaultSize="25">
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">{{ _t()['two'] }}</span>
						</div>
					</caps-resizable-panel>
					<caps-resizable-handle [attr.aria-label]="_t()['two'] + ' — ' + _t()['height']" withHandle />
					<caps-resizable-panel defaultSize="75">
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">{{ _t()['three'] }}</span>
						</div>
					</caps-resizable-panel>
				</caps-resizable-group>
			</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
export class ResizableRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				one: 'One',
				width: 'width',
				height: 'height',
				two: 'Two',
				three: 'Three',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				one: 'واحد',
				width: 'عرض',
				height: 'ارتفاع',
				two: 'اثنان',
				three: 'ثلاثة',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				one: 'אחד',
				width: 'רוחב',
				height: 'גובה',
				two: 'שניים',
				three: 'שלושה',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
