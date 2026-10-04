import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-password-input',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideEye, lucideEyeOff })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-input-group>
			<input
				capsInput
				[id]="inputId()"
				[placeholder]="placeholder()"
				[value]="value()"
				[disabled]="disabled()"
				[readonly]="readonly()"
				autoComplete="current-password"
				[type]="_inputType()"
				(input)="value.set($event.target.value)"
				(blur)="touchedChange.emit(true)"
				[attr.aria-label]="placeholder()"
			/>
			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					size="icon-xs"
					[disabled]="disabled()"
					[attr.aria-label]="_inputType() === 'password' ? 'Show password' : 'Hide password'"
					(click)="togglePasswordVisibility()"
					variant="ghost"
					type="button"
				>
					<ng-icon [name]="_icon()" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class PasswordInput implements FormValueControl<string> {
	public readonly value = model<string>('');
	public readonly disabled = input<boolean>(false);
	public readonly readonly = input<boolean>(false);

	// use touchedChange with Angular v21
	public readonly touchedChange = output<boolean>();
	// use touch output in starting with Angular v22
	// public readonly touch = output<void>();

	public readonly inputId = input<string>();
	public readonly placeholder = input<string>('********');

	protected readonly _inputType = signal<'text' | 'password'>('password');

	protected readonly _icon = computed(() => (this._inputType() === 'password' ? 'lucideEye' : 'lucideEyeOff'));

	public togglePasswordVisibility() {
		this._inputType.set(this._inputType() === 'password' ? 'text' : 'password');
	}
}

export const passwordInputCode = `
// password-input.ts
import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-password-input',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideEye, lucideEyeOff })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: \`
		<caps-input-group>
		<input
			capsInput
			[id]="inputId()"
			[placeholder]="placeholder()"
			[value]="value()"
			[disabled]="disabled()"
			[readonly]="readonly()"
			autoComplete="current-password"
			[type]="_inputType()"
			(input)="value.set($event.target.value)"
			(blur)="touchedChange.emit(true)" [attr.aria-label]="placeholder()">
		<caps-input-group-addon align="inline-end">
			<button capsButton size="icon-xs" [disabled]="disabled()" [attr.aria-label]="_inputType() === 'password' ? 'Show password' : 'Hide password'" (click)="togglePasswordVisibility()" variant="ghost" type="button">
				<ng-icon [name]="_icon()" />
			</button>
		</caps-input-group-addon>
		</caps-input-group>
	\`,
})
export class PasswordInput implements FormValueControl<string> {
	public readonly value = model<string>('');
	public readonly disabled = input<boolean>(false);
	public readonly readonly = input<boolean>(false);

	// use touchedChange with Angular v21
	public readonly touchedChange = output<boolean>();
	// use touch output in starting with Angular v22
	// public readonly touch = output<void>();

	public readonly inputId = input<string>();
	public readonly placeholder = input<string>('********');

	protected readonly _inputType = signal<'text' | 'password'>('password');

	protected readonly _icon = computed(() => (this._inputType() === 'password' ? 'lucideEye' : 'lucideEyeOff'));

	public togglePasswordVisibility() {
		this._inputType.set(this._inputType() === 'password' ? 'text' : 'password');
	}
}
`;
