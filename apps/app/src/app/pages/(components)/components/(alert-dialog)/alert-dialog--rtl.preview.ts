import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBluetooth } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-alert-dialog-rtl',
	imports: [CapsAlertDialogImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideBluetooth })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex gap-4" [dir]="_dir()">
			<caps-alert-dialog>
				<button capsAlertDialogTrigger capsButton variant="outline">{{ _t()['showDialog'] }}</button>
				<ng-template capsAlertDialogContent let-ctx>
					<caps-alert-dialog-header>
						<caps-alert-dialog-title>{{ _t()['title'] }}</caps-alert-dialog-title>
						<caps-alert-dialog-description>
							{{ _t()['description'] }}
						</caps-alert-dialog-description>
					</caps-alert-dialog-header>
					<caps-alert-dialog-footer>
						<button capsAlertDialogCancel capsButton variant="outline">{{ _t()['cancel'] }}</button>
						<button capsButton (click)="ctx.close()">{{ _t()['continue'] }}</button>
					</caps-alert-dialog-footer>
				</ng-template>
			</caps-alert-dialog>
			<caps-alert-dialog>
				<button capsAlertDialogTrigger capsButton variant="outline">{{ _t()['showDialogSm'] }}</button>
				<ng-template capsAlertDialogContent let-ctx size="sm">
					<caps-alert-dialog-header>
						<caps-alert-dialog-media>
							<ng-icon name="lucideBluetooth" />
						</caps-alert-dialog-media>
						<caps-alert-dialog-title>{{ _t()['smallTitle'] }}</caps-alert-dialog-title>
						<caps-alert-dialog-description>
							{{ _t()['smallDescription'] }}
						</caps-alert-dialog-description>
					</caps-alert-dialog-header>
					<caps-alert-dialog-footer>
						<button capsAlertDialogCancel capsButton variant="outline">{{ _t()['dontAllow'] }}</button>
						<button capsButton (click)="ctx.close()">{{ _t()['allow'] }}</button>
					</caps-alert-dialog-footer>
				</ng-template>
			</caps-alert-dialog>
		</div>
	`,
})
export class AlertDialogRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				showDialog: 'Show Dialog',
				showDialogSm: 'Show Dialog (sm)',
				title: 'Are you absolutely sure?',
				description: 'This action cannot be undone. This will permanently delete your account from our servers.',
				cancel: 'Cancel',
				continue: 'Continue',
				smallTitle: 'Allow accessory to connect?',
				smallDescription: 'Do you want to allow the USB accessory to connect to this device?',
				dontAllow: "Don't allow",
				allow: 'Allow',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				showDialog: 'إظهار الحوار',
				showDialogSm: 'إظهار الحوار (صغير)',
				title: 'هل أنت متأكد تمامًا؟',
				description: 'لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.',
				cancel: 'إلغاء',
				continue: 'متابعة',
				smallTitle: 'السماح للملحق بالاتصال؟',
				smallDescription: 'هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟',
				dontAllow: 'عدم السماح',
				allow: 'السماح',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				showDialog: 'הצג דיאלוג',
				showDialogSm: 'הצג דיאלוג (קטן)',
				title: 'האם אתה בטוח לחלוטין?',
				description: 'פעולה זו לא ניתנת לביטול. זה ימחק לצמיתות את החשבון שלך מהשרתים שלנו.',
				cancel: 'ביטול',
				continue: 'המשך',
				smallTitle: 'לאפשר להתקן להתחבר?',
				smallDescription: 'האם אתה רוצה לאפשר להתקן USB להתחבר למכשיר זה?',
				dontAllow: 'אל תאפשר',
				allow: 'אפשר',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
