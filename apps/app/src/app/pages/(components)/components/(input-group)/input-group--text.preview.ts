import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-input-group-text-preview',
	imports: [CapsTextareaImports, CapsInputImports, CapsInputGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<caps-input-group-addon>
				<caps-input-group-text>$</caps-input-group-text>
			</caps-input-group-addon>
			<input capsInput placeholder="0.00" aria-label="0.00" />
			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>USD</caps-input-group-text>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<caps-input-group-addon>
				<caps-input-group-text>https://</caps-input-group-text>
			</caps-input-group-addon>
			<input capsInput placeholder="example.com" class="pl-0.5!" aria-label="example.com" />
			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>.com</caps-input-group-text>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="Enter your username" aria-label="Enter your username" />
			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>&#64;company.com</caps-input-group-text>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<textarea capsTextarea placeholder="Enter your message" aria-label="Enter your message"></textarea>
			<caps-input-group-addon align="block-end">
				<caps-input-group-text class="text-muted-foreground text-xs">120 characters left</caps-input-group-text>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupTextPreview {}
