import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, numberAttribute } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideInfo, lucideLoader2, lucideOctagonX, lucideTriangleAlert } from '@ng-icons/lucide';
import { BrnSonnerImports, type ToasterProps } from '@spartan-ng/brain/sonner';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'caps-toaster',
	imports: [BrnSonnerImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCircleCheck, lucideInfo, lucideTriangleAlert, lucideOctagonX, lucideLoader2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<brn-sonner-toaster
			[class]="_computedClass()"
			[invert]="invert()"
			[theme]="theme()"
			[position]="position()"
			[hotKey]="hotKey()"
			[richColors]="richColors()"
			[expand]="expand()"
			[duration]="duration()"
			[visibleToasts]="visibleToasts()"
			[closeButton]="closeButton()"
			[toastOptions]="_computedToastOptions()"
			[offset]="offset()"
			[style]="userStyle()"
		>
			<ng-template #loadingIcon>
				<ng-icon
					aria-hidden="true"
					name="lucideLoader2"
					class="overflow-visible! text-base [&>svg]:motion-safe:animate-spin"
				/>
			</ng-template>
			<ng-template #successIcon>
				<ng-icon aria-hidden="true" name="lucideCircleCheck" class="overflow-visible! text-base" />
			</ng-template>
			<ng-template #errorIcon>
				<ng-icon aria-hidden="true" name="lucideOctagonX" class="overflow-visible! text-base" />
			</ng-template>
			<ng-template #infoIcon>
				<ng-icon aria-hidden="true" name="lucideInfo" class="overflow-visible! text-base" />
			</ng-template>
			<ng-template #warningIcon>
				<ng-icon aria-hidden="true" name="lucideTriangleAlert" class="overflow-visible! text-base" />
			</ng-template>
			<button
				*brnToastAction="let action; let toast = toast"
				type="button"
				data-caps-toast-action
				[style]="toast.actionButtonStyle"
				capsButton
				size="sm"
				(click)="action.onClick($event)"
			>
				{{ action.label }}
			</button>
			<button
				*brnToastCancelAction="let cancel; let toast = toast"
				type="button"
				data-caps-toast-cancel
				[style]="toast.cancelButtonStyle"
				capsButton
				size="sm"
				variant="secondary"
				(click)="cancel.onClick($event)"
			>
				{{ cancel.label }}
			</button>
		</brn-sonner-toaster>
	`,
})
export class CapsToaster {
	public readonly invert = input<ToasterProps['invert'], BooleanInput>(false, {
		transform: booleanAttribute,
	});
	public readonly theme = input<ToasterProps['theme']>('light');
	public readonly position = input<ToasterProps['position']>('bottom-right');
	public readonly hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
	public readonly richColors = input<ToasterProps['richColors'], BooleanInput>(false, {
		transform: booleanAttribute,
	});
	public readonly expand = input<ToasterProps['expand'], BooleanInput>(false, {
		transform: booleanAttribute,
	});
	public readonly duration = input<ToasterProps['duration'], NumberInput>(4000, {
		transform: numberAttribute,
	});
	public readonly visibleToasts = input<ToasterProps['visibleToasts'], NumberInput>(3, {
		transform: numberAttribute,
	});
	public readonly closeButton = input<ToasterProps['closeButton'], BooleanInput>(false, {
		transform: booleanAttribute,
	});
	public readonly toastOptions = input<ToasterProps['toastOptions']>({});

	protected readonly _computedToastOptions = computed(() => {
		const options = this.toastOptions();
		return {
			...options,
			classes: {
				...options?.classes,
				toast: hlm('caps-toast', options?.classes?.toast),
			},
		};
	});
	public readonly offset = input<ToasterProps['offset']>(null);
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly userStyle = input<Record<string, string>>(
		{
			'--normal-bg': 'var(--popover)',
			'--normal-text': 'var(--popover-foreground)',
			'--normal-border': 'var(--border)',
			'--border-radius': 'var(--radius)',
		},
		{ alias: 'style' },
	);

	protected readonly _computedClass = computed(() => hlm('caps-toaster group', this.userClass()));
}
