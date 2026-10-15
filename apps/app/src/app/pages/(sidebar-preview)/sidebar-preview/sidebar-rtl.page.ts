import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsSidebarImports, CapsSidebarService } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideBadgeCheck,
	lucideBell,
	lucideBookOpen,
	lucideBot,
	lucideChartPie,
	lucideChevronRight,
	lucideChevronsUpDown,
	lucideCreditCard,
	lucideEllipsis,
	lucideFolder,
	lucideFrame,
	lucideGalleryVerticalEnd,
	lucideLifeBuoy,
	lucideLogOut,
	lucideMap,
	lucideSend,
	lucideSettings2,
	lucideShare,
	lucideSparkles,
	lucideSquareTerminal,
	lucideTrash2,
} from '@ng-icons/lucide';
import { TranslateService, Translations, type Language } from '@spartan-ng/app/app/shared/translate.service';
@Component({
	selector: 'spartan-sidebar-rtl',
	imports: [
		CapsSidebarImports,
		NgIcon,
		CapsCollapsibleImports,
		RouterLink,
		CapsAvatarImports,
		CapsDropdownMenuImports,
		CapsSelectImports,
	],
	providers: [
		provideIcons({
			lucideFrame,
			lucideChartPie,
			lucideMap,
			lucideLifeBuoy,
			lucideSend,
			lucideGalleryVerticalEnd,
			lucideChevronsUpDown,
			lucideSquareTerminal,
			lucideBot,
			lucideBookOpen,
			lucideSettings2,
			lucideChevronRight,
			lucideSparkles,
			lucideBadgeCheck,
			lucideCreditCard,
			lucideBell,
			lucideLogOut,
			lucideEllipsis,
			lucideFolder,
			lucideShare,
			lucideTrash2,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper
			[attr.dir]="_dir()"
			[attr.lang]="_languageService.language()"
			[attr.data-lang]="_languageService.language()"
		>
			<caps-sidebar collapsible="icon" [side]="_sidebarSide()">
				<caps-sidebar-header>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button capsSidebarMenuButton size="lg">
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<ng-icon aria-hidden="true" name="lucideGalleryVerticalEnd" />
								</div>
								<div class="grid flex-1 text-start text-sm leading-tight">
									<span class="truncate font-medium">{{ _t()['teamName'] }}</span>
									<span class="truncate text-xs">{{ _t()['teamPlan'] }}</span>
								</div>
							</button>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>{{ _t()['platform'] }}</caps-sidebar-group-label>
						<caps-sidebar-menu>
							@for (item of _platforms; track $index) {
								<caps-sidebar-menu-item>
									<caps-collapsible [expanded]="item.isActive ?? false" class="group/collapsible">
										<button capsSidebarMenuButton capsCollapsibleTrigger [tooltip]="_t()[item.titleKey]">
											<ng-icon aria-hidden="true" [name]="item.icon" />
											{{ _t()[item.titleKey] }}
											<ng-icon
												aria-hidden="true"
												name="lucideChevronRight"
												class="ms-auto transition-transform duration-(--caps-duration-200) group-data-open/collapsible:rotate-90 rtl:rotate-180 rtl:group-data-open/collapsible:rotate-90"
											/>
										</button>
										<caps-collapsible-content>
											<caps-sidebar-menu-sub>
												@for (subItem of item.items; track $index) {
													<caps-sidebar-menu-sub-item>
														<a capsSidebarMenuSubButton [routerLink]="subItem.url">{{ _t()[subItem.titleKey] }}</a>
													</caps-sidebar-menu-sub-item>
												}
											</caps-sidebar-menu-sub>
										</caps-collapsible-content>
									</caps-collapsible>
								</caps-sidebar-menu-item>
							}
						</caps-sidebar-menu>
					</caps-sidebar-group>
					<caps-sidebar-group class="group-data-[collapsible=icon]:hidden">
						<caps-sidebar-group-label>{{ _t()['projects'] }}</caps-sidebar-group-label>
						<caps-sidebar-menu>
							@for (project of _projects; track $index) {
								<caps-sidebar-menu-item>
									<a capsSidebarMenuButton [routerLink]="project.url">
										<ng-icon aria-hidden="true" [name]="project.icon" />
										{{ _t()[project.nameKey] }}
									</a>
									<button
										capsSidebarMenuAction
										showOnHover
										[capsDropdownMenuTrigger]="projectMenu"
										[capsDropdownMenuTriggerData]="{ $implicit: { project } }"
										[placement]="_menuPlacement()"
									>
										<ng-icon aria-hidden="true" name="lucideEllipsis" />
										<span class="sr-only">{{ _t()['more'] }}</span>
									</button>
								</caps-sidebar-menu-item>
							}
							<caps-sidebar-menu-item>
								<button capsSidebarMenuButton>
									<ng-icon aria-hidden="true" name="lucideEllipsis" />
									{{ _t()['more'] }}
								</button>
							</caps-sidebar-menu-item>
						</caps-sidebar-menu>
					</caps-sidebar-group>
					<ng-template #projectMenu let-ctx>
						<caps-menu class="w-48">
							<caps-menu-label>{{ _t()[ctx.project.nameKey] }}</caps-menu-label>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideFolder" />
								{{ _t()['viewProject'] }}
							</button>
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideShare" />
								{{ _t()['shareProject'] }}
							</button>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideTrash2" />
								{{ _t()['deleteProject'] }}
							</button>
						</caps-menu>
					</ng-template>
				</caps-sidebar-content>
				<caps-sidebar-footer>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button
								capsSidebarMenuButton
								size="lg"
								[capsDropdownMenuTrigger]="avatarMenu"
								[placement]="_avatarPlacement()"
							>
								<caps-avatar class="rounded-lg">
									<img src="/assets/avatar.png" alt="spartan" capsAvatarImage />
									<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
								</caps-avatar>
								<div class="grid flex-1 text-start text-sm leading-tight">
									<span class="truncate font-medium">spartan</span>
									<span class="truncate text-xs">hello@spartan.com</span>
								</div>
								<ng-icon aria-hidden="true" name="lucideChevronsUpDown" class="ms-auto text-base" />
							</button>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
					<ng-template #avatarMenu>
						<caps-menu class="min-w-56 rounded-lg">
							<caps-menu-label>
								<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
									<caps-avatar class="rounded-lg">
										<img src="/assets/avatar.png" alt="spartan" capsAvatarImage />
										<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
									</caps-avatar>
									<div class="grid flex-1 text-start text-sm leading-tight">
										<span class="truncate font-medium">spartan</span>
										<span class="truncate text-xs">hello@spartan.com</span>
									</div>
								</div>
							</caps-menu-label>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideSparkles" />
								{{ _t()['upgradeToPro'] }}
							</button>
							<caps-menu-separator />
							<caps-menu-group>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideBadgeCheck" />
									{{ _t()['account'] }}
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideCreditCard" />
									{{ _t()['billing'] }}
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideBell" />
									{{ _t()['notifications'] }}
								</button>
							</caps-menu-group>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideLogOut" />
								{{ _t()['logOut'] }}
							</button>
						</caps-menu>
					</ng-template>
				</caps-sidebar-footer>
			</caps-sidebar>
			<caps-sidebar-inset>
				<div class="flex min-w-0 flex-1 flex-col">
					<header class="flex h-12 items-center justify-between gap-4 px-4">
						<button capsSidebarTrigger></button>
						<caps-select
							aria-label="Preview language"
							[(value)]="_languageService.language"
							[itemToString]="itemToString"
							[dir]="_dir()"
							class="inline-block w-52"
						>
							@for (language of languages; track language.value) {
								<caps-select-option [value]="language.value">
									{{ language.label }}
								</caps-select-option>
							}
						</caps-select>
					</header>
					<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
						<div class="grid auto-rows-min gap-4 md:grid-cols-3">
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
						</div>
						<div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min"></div>
					</div>
				</div>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
export default class SidebarRtlPage {
	protected readonly _avatarPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-end`);
	protected readonly _menuPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-${this._menuAlign()}`);
	private readonly _sidebarService = inject(CapsSidebarService);
	protected readonly _languageService = inject(TranslateService);
	protected readonly _sidebarSide = computed(() => (this._dir() === 'rtl' ? 'right' : 'left'));
	protected readonly _menuSide = computed(() => {
		if (this._sidebarService.isMobile()) return 'top';
		return this._dir() === 'rtl' ? 'left' : 'right';
	});
	protected readonly _menuAlign = computed(() => (this._sidebarService.isMobile() ? 'end' : 'start'));

	public languages: { value: Language; label: string }[] = [
		{ value: 'en', label: 'English' },
		{ value: 'ar', label: 'Arabic (العربية)' },
		{ value: 'he', label: 'Hebrew (עברית)' },
	];

	public itemToString = (value: Language) => this.languages.find((lang) => lang.value === value)?.label ?? '';

	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				teamName: 'Acme Inc',
				teamPlan: 'Enterprise',
				platform: 'Platform',
				projects: 'Projects',
				viewProject: 'View Project',
				shareProject: 'Share Project',
				deleteProject: 'Delete Project',
				more: 'More',
				upgradeToPro: 'Upgrade to Pro',
				account: 'Account',
				billing: 'Billing',
				notifications: 'Notifications',
				logOut: 'Log out',
				playground: 'Playground',
				history: 'History',
				starred: 'Starred',
				settings: 'Settings',
				models: 'Models',
				genesis: 'Genesis',
				explorer: 'Explorer',
				quantum: 'Quantum',
				documentation: 'Documentation',
				introduction: 'Introduction',
				getStarted: 'Get Started',
				tutorials: 'Tutorials',
				changelog: 'Changelog',
				general: 'General',
				team: 'Team',
				limits: 'Limits',
				designEngineering: 'Design Engineering',
				salesMarketing: 'Sales & Marketing',
				travel: 'Travel',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				teamName: 'شركة أكمي',
				teamPlan: 'المؤسسة',
				platform: 'المنصة',
				projects: 'المشاريع',
				viewProject: 'عرض المشروع',
				shareProject: 'مشاركة المشروع',
				deleteProject: 'حذف المشروع',
				more: 'المزيد',
				upgradeToPro: 'ترقية إلى Pro',
				account: 'الحساب',
				billing: 'الفوترة',
				notifications: 'الإشعارات',
				logOut: 'تسجيل الخروج',
				playground: 'ملعب',
				history: 'السجل',
				starred: 'المميز',
				settings: 'الإعدادات',
				models: 'النماذج',
				genesis: 'جينيسيس',
				explorer: 'إكسبلورر',
				quantum: 'كوانتوم',
				documentation: 'التوثيق',
				introduction: 'مقدمة',
				getStarted: 'ابدأ',
				tutorials: 'الدروس',
				changelog: 'سجل التغييرات',
				general: 'عام',
				team: 'الفريق',
				limits: 'الحدود',
				designEngineering: 'هندسة التصميم',
				salesMarketing: 'المبيعات والتسويق',
				travel: 'السفر',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				teamName: 'אקמי בע״מ',
				teamPlan: 'ארגוני',
				platform: 'פלטפורמה',
				projects: 'פרויקטים',
				viewProject: 'הצג פרויקט',
				shareProject: 'שתף פרויקט',
				deleteProject: 'מחק פרויקט',
				more: 'עוד',
				upgradeToPro: 'שדרג ל-Pro',
				account: 'חשבון',
				billing: 'חיוב',
				notifications: 'התראות',
				logOut: 'התנתק',
				playground: 'מגרש משחקים',
				history: 'היסטוריה',
				starred: 'מועדפים',
				settings: 'הגדרות',
				models: 'מודלים',
				genesis: "ג'נסיס",
				explorer: 'אקספלורר',
				quantum: 'קוונטום',
				documentation: 'תיעוד',
				introduction: 'מבוא',
				getStarted: 'התחל',
				tutorials: 'מדריכים',
				changelog: 'יומן שינויים',
				general: 'כללי',
				team: 'צוות',
				limits: 'מגבלות',
				designEngineering: 'הנדסת עיצוב',
				salesMarketing: 'מכירות ושיווק',
				travel: 'נסיעות',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	protected readonly _platforms = [
		{
			titleKey: 'playground',
			url: '.',
			icon: 'lucideSquareTerminal',
			isActive: true,
			items: [
				{
					titleKey: 'history',
					url: '.',
				},
				{
					titleKey: 'starred',
					url: '.',
				},
				{
					titleKey: 'settings',
					url: '.',
				},
			],
		},
		{
			titleKey: 'models',
			url: '.',
			icon: 'lucideBot',
			items: [
				{
					titleKey: 'genesis',
					url: '.',
				},
				{
					titleKey: 'explorer',
					url: '.',
				},
				{
					titleKey: 'quantum',
					url: '.',
				},
			],
		},
		{
			titleKey: 'documentation',
			url: '.',
			icon: 'lucideBookOpen',
			items: [
				{
					titleKey: 'introduction',
					url: '.',
				},
				{
					titleKey: 'getStarted',
					url: '.',
				},
				{
					titleKey: 'tutorials',
					url: '.',
				},
				{
					titleKey: 'changelog',
					url: '.',
				},
			],
		},
		{
			titleKey: 'settings',
			url: '.',
			icon: 'lucideSettings2',
			items: [
				{
					titleKey: 'general',
					url: '.',
				},
				{
					titleKey: 'team',
					url: '.',
				},
				{
					titleKey: 'billing',
					url: '.',
				},
				{
					titleKey: 'limits',
					url: '.',
				},
			],
		},
	];

	protected readonly _projects = [
		{
			nameKey: 'designEngineering',
			url: '.',
			icon: 'lucideFrame',
		},
		{
			nameKey: 'salesMarketing',
			url: '.',
			icon: 'lucideChartPie',
		},
		{
			nameKey: 'travel',
			url: '.',
			icon: 'lucideMap',
		},
	];
}
