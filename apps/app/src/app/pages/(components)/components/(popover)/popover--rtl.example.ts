import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-popover-rtl-preview',
	imports: [CapsPopoverImports, CapsButtonImports, CapsLabelImports, CapsInputImports],
	providers: [Directionality],
	host: {
		class: 'flex w-full justify-center',
		'[dir]': '_dir()',
	},
	template: `
		<caps-popover>
			<button capsPopoverTrigger capsButton variant="outline">{{ _t()['open'] }}</button>
			<ng-template capsPopoverContent let-ctx [class]="'grid w-80 gap-4'">
				<div class="space-y-2">
					<h4 class="leading-none font-medium">{{ _t()['title'] }}</h4>
					<p class="text-muted-foreground text-sm">{{ _t()['description'] }}</p>
				</div>
				<div class="grid gap-2">
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="width">{{ _t()['width'] }}</label>
						<input capsInput id="width" [defaultValue]="'100%'" class="col-span-2 h-8" />
					</div>
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="height">{{ _t()['height'] }}</label>
						<input capsInput id="height" [defaultValue]="'25px'" class="col-span-2 h-8" />
					</div>
				</div>
			</ng-template>
		</caps-popover>
	`,
})
export class PopoverRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				open: 'Open popover',
				title: 'Dimensions',
				description: 'Set the dimensions for the layer.',
				width: 'Width',
				height: 'Height',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				open: 'افتح النافذة',
				title: 'الأبعاد',
				description: 'اضبط أبعاد الطبقة.',
				width: 'العرض',
				height: 'الارتفاع',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				open: 'פתח חלון',
				title: 'מידות',
				description: 'הגדר את המידות עבור השכבה.',
				width: 'רוחב',
				height: 'גובה',
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
