import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	numberAttribute,
} from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsInputOtp } from './caps-input-otp';

@Component({
	selector: 'caps-input-otp-slot',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'input-otp-slot',
		'aria-hidden': 'true',
		'[attr.data-active]': '_slot().isActive',
		'[attr.data-invalid]': '_root.fieldControl.invalid() ? "true" : null',
		'[attr.data-touched]': '_root.fieldControl.touched() ? "true" : null',
		'[attr.data-dirty]': '_root.fieldControl.dirty() ? "true" : null',
		'[attr.data-matches-spartan-invalid]': '_visualInvalid() ? "true" : null',
	},
	template: `
		{{ _slot().char }}
		@if (_slot().hasFakeCaret) {
			<span class="caps-input-otp-caret"></span>
		}
	`,
})
export class CapsInputOtpSlot {
	protected readonly _root = inject(CapsInputOtp);
	public readonly index = input.required<number, NumberInput>({ transform: numberAttribute });
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	protected readonly _slot = computed(
		() => this._root.context()[this.index()] ?? { char: null, isActive: false, hasFakeCaret: false },
	);
	protected readonly _visualInvalid = computed(() => this.forceInvalid() || !!this._root.fieldControl.spartanInvalid());
	constructor() {
		classes(() => 'caps-input-otp-slot relative flex items-center justify-center');
	}
}

@Component({
	selector: 'caps-input-otp-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'input-otp-group', 'aria-hidden': 'true' },
	template: '<ng-content />',
})
export class CapsInputOtpGroup {
	constructor() {
		classes(() => 'caps-input-otp-group flex items-center');
	}
}

@Component({
	selector: 'caps-input-otp-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'input-otp-separator', 'aria-hidden': 'true' },
	template: '<span>−</span>',
})
export class CapsInputOtpSeparator {
	constructor() {
		classes(() => 'caps-input-otp-separator flex items-center justify-center');
	}
}
