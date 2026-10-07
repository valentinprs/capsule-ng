import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode, lucideX } from '@ng-icons/lucide';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-attachment-rtl-preview',
	imports: [CapsAttachmentImports, NgIcon],
	providers: [provideIcons({ lucideFileCode, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'theme-blue bg-surface dark:bg-background flex w-full max-w-sm flex-col gap-3',
	},
	template: `
		<div class="flex w-full flex-col gap-3" [dir]="_dir()">
			<caps-attachment class="w-full">
				<caps-attachment-media>
					<ng-icon name="lucideFileCode" />
				</caps-attachment-media>
				<caps-attachment-content>
					<caps-attachment-title>{{ _t()['title'] }}</caps-attachment-title>
					<caps-attachment-description>{{ _t()['description'] }}</caps-attachment-description>
				</caps-attachment-content>
				<caps-attachment-actions>
					<button capsAttachmentAction [attr.aria-label]="_t()['remove']">
						<ng-icon name="lucideX" />
					</button>
				</caps-attachment-actions>
			</caps-attachment>

			<caps-attachment orientation="vertical">
				<caps-attachment-media variant="image">
					<img
						src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
						[alt]="_t()['imageAlt']"
					/>
				</caps-attachment-media>
				<caps-attachment-content>
					<caps-attachment-title>{{ _t()['imageTitle'] }}</caps-attachment-title>
					<caps-attachment-description>{{ _t()['imageMeta'] }}</caps-attachment-description>
				</caps-attachment-content>
				<caps-attachment-actions>
					<button capsAttachmentAction [attr.aria-label]="_t()['remove']">
						<ng-icon name="lucideX" />
					</button>
				</caps-attachment-actions>
			</caps-attachment>
		</div>
	`,
})
export class AttachmentRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				title: 'message-renderer.tsx',
				description: 'TypeScript · 12 KB',
				remove: 'Remove attachment',
				imageTitle: 'workspace.png',
				imageMeta: 'PNG · 820 KB',
				imageAlt: 'Workspace',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				title: 'message-renderer.tsx',
				description: 'TypeScript · 12 كيلوبايت',
				remove: 'إزالة المرفق',
				imageTitle: 'workspace.png',
				imageMeta: 'PNG · 820 كيلوبايت',
				imageAlt: 'مساحة العمل',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				title: 'message-renderer.tsx',
				description: 'TypeScript · 12 ק״ב',
				remove: 'הסר קובץ מצורף',
				imageTitle: 'workspace.png',
				imageMeta: 'PNG · 820 ק״ב',
				imageAlt: 'סביבת עבודה',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
