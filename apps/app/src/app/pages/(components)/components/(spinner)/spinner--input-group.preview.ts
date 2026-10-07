import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-spinner-input-group-preview',
	imports: [
		CapsButtonImports,
		CapsTextareaImports,
		CapsInputImports,
		CapsSpinnerImports,
		CapsInputGroupImports,
		NgIcon,
	],
	providers: [provideIcons({ lucideArrowUp })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-md flex-col gap-4">
			<caps-input-group>
				<input capsInput placeholder="Send a message..." disabled aria-label="Send a message" />
				<caps-input-group-addon align="inline-end">
					<caps-spinner aria-hidden="true" />
				</caps-input-group-addon>
			</caps-input-group>
			<caps-input-group>
				<textarea capsTextarea placeholder="Send a message..." disabled aria-label="Send a message"></textarea>
				<caps-input-group-addon align="block-end">
					<caps-spinner aria-hidden="true" />
					Validating...
					<button class="ml-auto" capsButton variant="default" size="xs" type="button">
						<ng-icon name="lucideArrowUp" />
						<span class="sr-only">Send</span>
					</button>
				</caps-input-group-addon>
			</caps-input-group>
		</div>
	`,
})
export class SpartanSpinnerInputGroupPreview {}
