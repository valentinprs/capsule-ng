import { Component } from '@angular/core';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { BrnField } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-label-preview',
	imports: [CapsLabelImports, HlmCheckboxImports, BrnField, BrnInput],
	template: `
		<div class="grid w-full max-w-sm gap-6">
			<div class="flex gap-2">
				<hlm-checkbox inputId="terms" />
				<label capsLabel for="terms">Accept terms and conditions</label>
			</div>
			<div class="grid gap-2">
				<label capsLabel for="label-email">Email address</label>
				<input class="border-input rounded-md border px-3 py-2" id="label-email" type="email" />
			</div>
			<div class="grid gap-2">
				<label capsLabel for="label-message">Message</label>
				<textarea class="border-input rounded-md border px-3 py-2" id="label-message" rows="3"></textarea>
			</div>
			<div brnField class="grid gap-2">
				<label capsLabel>Automatically associated by Field</label>
				<input brnInput class="border-input rounded-md border px-3 py-2" />
			</div>
			<div class="flex items-center gap-2">
				<input class="peer" id="label-native-terms" type="checkbox" />
				<label capsLabel for="label-native-terms">Accept with a native checkbox</label>
			</div>
			<div class="flex items-center gap-2">
				<input class="peer" id="label-disabled-terms" type="checkbox" disabled />
				<label capsLabel for="label-disabled-terms">Disabled native checkbox</label>
			</div>
		</div>
	`,
})
export class LabelPreview {}

export const defaultImports = `
import { CapsLabelImports } from '@capsule-ng/caps/label';
`;
export const defaultSkeleton = `
<label capsLabel for="email">Your email address</label>
<input id="email" type="email" />
`;
