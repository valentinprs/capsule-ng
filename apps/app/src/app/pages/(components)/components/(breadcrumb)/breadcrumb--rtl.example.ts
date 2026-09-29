import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-breadcrumb-rtl',
	imports: [CapsBreadcrumbImports, CapsLinkImports, RouterLink],
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/">{{ _t()['home'] }}</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/components">{{ _t()['components'] }}</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>{{ _t()['breadcrumb'] }}</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
export class BreadcrumbRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				home: 'Home',
				components: 'Components',
				documentation: 'Documentation',
				themes: 'Themes',
				github: 'GitHub',
				breadcrumb: 'Breadcrumb',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				home: 'الرئيسية',
				components: 'المكونات',
				documentation: 'التوثيق',
				themes: 'السمات',
				github: 'جيت هاب',
				breadcrumb: 'مسار التنقل',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				home: 'בית',
				components: 'רכיבים',
				documentation: 'תיעוד',
				themes: 'ערכות נושא',
				github: 'גיטהאב',
				breadcrumb: 'פירורי לחם',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
