import { Component, computed, inject } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-empty-rtl',
	imports: [NgIcon, CapsButton, CapsEmptyImports],
	providers: [provideIcons({ lucideFolderCode, lucideArrowUpRight })],
	template: `
		<caps-empty [dir]="_dir()">
			<caps-empty-media variant="icon">
				<ng-icon aria-hidden="true" name="lucideFolderCode" />
			</caps-empty-media>
			<caps-empty-title>{{ _t()['title'] }}</caps-empty-title>
			<caps-empty-description>
				{{ _t()['description'] }}
			</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton>{{ _t()['createProject'] }}</button>
				<button type="button" capsButton variant="outline">{{ _t()['importProject'] }}</button>
			</caps-empty-actions>
			<a href="/documentation/installation" capsButton class="text-muted-foreground" variant="link" size="sm">
				{{ _t()['learnMore'] }}
				<ng-icon aria-hidden="true" name="lucideArrowUpRight" class="rtl:rotate-270" />
			</a>
		</caps-empty>
	`,
})
export class EmptyRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				title: 'No Projects Yet',
				description: "You haven't created any projects yet. Get started by creating your first project.",
				createProject: 'Create Project',
				importProject: 'Import Project',
				learnMore: 'Learn More',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				title: 'لا توجد مشاريع بعد',
				description: 'لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.',
				createProject: 'إنشاء مشروع',
				importProject: 'استيراد مشروع',
				learnMore: 'تعرف على المزيد',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				title: 'אין פרויקטים עדיין',
				description: 'עדיין לא יצרת פרויקטים. התחל על ידי יצירת הפרויקט הראשון שלך.',
				createProject: 'צור פרויקט',
				importProject: 'ייבא פרויקט',
				learnMore: 'למד עוד',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
