import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-navigation-menu-rtl',
	imports: [CapsNavigationMenuImports, RouterLink],
	providers: [Directionality],
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<caps-navigation-menu aria-label="Translated navigation">
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>{{ _t()['gettingStarted'] }}</button>
				<ng-template capsNavigationMenuContent>
					<ul class="w-96 max-w-[calc(100vw-2rem)]">
						<li>
							<a capsNavigationMenuLink routerLink="/documentation/introduction">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">{{ _t()['introduction'] }}</div>
									<div class="text-muted-foreground line-clamp-2">{{ _t()['introductionDesc'] }}</div>
								</div>
							</a>
						</li>

						<li>
							<a capsNavigationMenuLink routerLink="/documentation/installation">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">{{ _t()['installation'] }}</div>
									<div class="text-muted-foreground line-clamp-2">{{ _t()['installationDesc'] }}</div>
								</div>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink routerLink="/documentation/typography">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">{{ _t()['typography'] }}</div>
									<div class="text-muted-foreground line-clamp-2">{{ _t()['typographyDesc'] }}</div>
								</div>
							</a>
						</li>
					</ul>
				</ng-template>
			</li>

			<!-- Components Menu -->
			<li capsNavigationMenuItem class="hidden md:flex">
				<button caps-navigation-menu-trigger>{{ _t()['components'] }}</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						@for (component of _components; track $index) {
							<a capsNavigationMenuLink [href]="component.href">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">{{ _t()[component.titleKey] }}</div>
									<div class="text-muted-foreground line-clamp-2">{{ _t()[component.descriptionKey] }}</div>
								</div>
							</a>
						}
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink href="/documentation/introduction">{{ _t()['docs'] }}</a>
			</li>
		</caps-navigation-menu>
	`,
})
export class NavigationMenuRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				gettingStarted: 'Getting started',
				introduction: 'Introduction',
				introductionDesc: 'Re-usable components built with Tailwind CSS.',
				installation: 'Installation',
				installationDesc: 'How to install dependencies and structure your app.',
				typography: 'Typography',
				typographyDesc: 'Styles for headings, paragraphs, lists...etc',
				components: 'Components',
				alertDialog: 'Alert Dialog',
				alertDialogDesc: 'A modal dialog that interrupts the user with important content and expects a response.',
				hoverCard: 'Hover Card',
				hoverCardDesc: 'For sighted users to preview content available behind a link.',
				progress: 'Progress',
				progressDesc:
					'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
				scrollArea: 'Scroll-area',
				scrollAreaDesc: 'Visually or semantically separates content.',
				tabs: 'Tabs',
				tabsDesc: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
				tooltip: 'Tooltip',
				tooltipDesc:
					'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
				withIcon: 'With Icon',
				backlog: 'Backlog',
				toDo: 'To Do',
				done: 'Done',
				docs: 'Docs',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				gettingStarted: 'البدء',
				introduction: 'مقدمة',
				introductionDesc: 'مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.',
				installation: 'التثبيت',
				installationDesc: 'كيفية تثبيت التبعيات وتنظيم تطبيقك.',
				typography: 'الطباعة',
				typographyDesc: 'أنماط للعناوين والفقرات والقوائم...إلخ',
				components: 'المكونات',
				alertDialog: 'حوار التنبيه',
				alertDialogDesc: 'حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.',
				hoverCard: 'بطاقة التحويم',
				hoverCardDesc: 'للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.',
				progress: 'التقدم',
				progressDesc: 'يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.',
				scrollArea: 'منطقة التمرير',
				scrollAreaDesc: 'يفصل المحتوى بصريًا أو دلاليًا.',
				tabs: 'التبويبات',
				tabsDesc: 'مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.',
				tooltip: 'تلميح',
				tooltipDesc:
					'نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.',
				withIcon: 'مع أيقونة',
				backlog: 'قائمة الانتظار',
				toDo: 'المهام',
				done: 'منجز',
				docs: 'الوثائق',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				gettingStarted: 'התחלה',
				introduction: 'הקדמה',
				introductionDesc: 'רכיבים לשימוש חוזר שנבנו עם Tailwind CSS.',
				installation: 'התקנה',
				installationDesc: 'כיצד להתקין תלויות ולבנות את האפליקציה שלך.',
				typography: 'טיפוגרפיה',
				typographyDesc: "סגנונות לכותרות, פסקאות, רשימות...וכו'",
				components: 'רכיבים',
				alertDialog: 'דיאלוג התראה',
				alertDialogDesc: 'דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.',
				hoverCard: 'כרטיס ריחוף',
				hoverCardDesc: 'למשתמשים רואים כדי להציג תצוגה מקדימה של תוכן זמין מאחורי קישור.',
				progress: 'התקדמות',
				progressDesc: 'מציג אינדיקטור המציג את התקדמות ההשלמה של משימה, בדרך כלל מוצג כסרגל התקדמות.',
				scrollArea: 'אזור גלילה',
				scrollAreaDesc: 'מפריד תוכן חזותית או סמנטית.',
				tabs: 'כרטיסיות',
				tabsDesc: 'קבוצה של חלקי תוכן מרובדים—המכונים לוחות כרטיסיות—המוצגים אחד בכל פעם.',
				tooltip: 'טולטיפ',
				tooltipDesc: 'חלון קופץ המציג מידע הקשור לאלמנט כאשר האלמנט מקבל מיקוד מקלדת או כאשר העכבר מרחף מעליו.',
				withIcon: 'עם אייקון',
				backlog: 'רשימת המתנה',
				toDo: 'לעשות',
				done: 'הושלם',
				docs: 'תיעוד',
			},
		},
	};

	protected readonly _components = [
		{
			titleKey: 'alertDialog' as const,
			descriptionKey: 'alertDialogDesc' as const,
			href: '/components/alert-dialog',
		},
		{
			titleKey: 'hoverCard' as const,
			descriptionKey: 'hoverCardDesc' as const,
			href: '/components/hover-card',
		},
		{
			titleKey: 'progress' as const,
			descriptionKey: 'progressDesc' as const,
			href: '/components/progress',
		},
		{
			titleKey: 'scrollArea' as const,
			descriptionKey: 'scrollAreaDesc' as const,
			href: '/components/scroll-area',
		},
		{
			titleKey: 'tabs' as const,
			descriptionKey: 'tabsDesc' as const,
			href: '/components/tabs',
		},
		{
			titleKey: 'tooltip' as const,
			descriptionKey: 'tooltipDesc' as const,
			href: '/components/tooltip',
		},
	];

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	private readonly _directionality = inject(Directionality);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
