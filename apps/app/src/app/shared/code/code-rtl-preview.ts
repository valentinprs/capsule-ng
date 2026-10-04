import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsSeparator } from '@capsule-ng/caps/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { StyleService } from '@spartan-ng/app/app/shared/style.service';
import { TranslateService } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'div[spartanRtlCodePreview]',
	imports: [CapsSelectImports, NgIcon, CapsPopoverImports, CapsSeparator, CapsButtonImports],
	providers: [
		provideIcons({
			lucideInfo,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.data-style]': '_styleService.style()',
		'[class]': '"style-"+_styleService.style()',
	},
	template: `
		<div class="border-border flex flex-row items-center justify-between border-b p-4">
			<caps-select
				aria-label="Preview language"
				[(value)]="_languageService.language"
				[itemToString]="itemToString"
				class="inline-block w-52"
			>
				@for (language of languages; track language.value) {
					<caps-select-option [value]="language.value">
						{{ language.label }}
					</caps-select-option>
				}
			</caps-select>
			<caps-popover placement="bottom-end">
				<button capsPopoverTrigger capsButton variant="ghost" aria-label="Translation information">
					<ng-icon name="lucideInfo" />
				</button>
				<ng-template capsPopoverContent let-ctx [class]="'flex w-56 flex-col gap-2.5 text-xs'">
					<div>
						I used AI to translate the text for demonstration purposes. It&apos;s not perfect and may contain errors.
					</div>
					<caps-separator class="-mx-2.5 w-auto!" />
					<div data-lang="ar">
						لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون الترجمة دقيقة وقد تحتوي على
						أخطاء.
					</div>
					<caps-separator class="-mx-2.5 w-auto!" />
					<div data-lang="he">
						השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול להכיל שגיאות.
					</div>
				</ng-template>
			</caps-popover>
		</div>
		<div
			class="preview flex min-h-[350px] w-full items-center justify-center px-4 py-10 lg:px-10"
			[attr.data-lang]="_languageService.language()"
		>
			<ng-content />
		</div>
	`,
})
export class CodeRtlPreview {
	protected readonly _languageService = inject(TranslateService);
	protected readonly _styleService = inject(StyleService);

	public languages = [
		{ value: 'en', label: 'English' },
		{ value: 'ar', label: 'Arabic (العربية)' },
		{ value: 'he', label: 'Hebrew (עברית)' },
	];

	public itemToString = (value: string) => this.languages.find((lang) => lang.value === value)?.label ?? '';
}
