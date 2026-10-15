import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { BrnCommandInput } from '@spartan-ng/brain/command';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'input[capsCommandInput]',
	hostDirectives: [{ directive: BrnCommandInput, inputs: ['id'] }],
	host: { 'data-slot': 'command-input', 'aria-label': 'Search commands' },
})
export class CapsCommandInputControl {
	constructor() {
		classes(() => 'caps-command-input outline-hidden');
	}
}

@Component({
	selector: 'caps-command-input',
	imports: [CapsCommandInputControl],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'command-input-wrapper' },
	template: `
		<div class="caps-command-input-group">
			<svg
				class="caps-command-input-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
				focusable="false"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</svg>
			<input capsCommandInput [id]="inputId()" [placeholder]="placeholder()" [attr.aria-label]="ariaLabel()" />
		</div>
	`,
})
export class CapsCommandInput {
	public readonly inputId = input<string | undefined>();
	public readonly placeholder = input<string>('');
	public readonly ariaLabel = input<string>('Search commands', { alias: 'aria-label' });
	constructor() {
		classes(() => 'caps-command-input-wrapper');
	}
}
