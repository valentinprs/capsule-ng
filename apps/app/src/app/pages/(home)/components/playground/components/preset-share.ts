import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-preset-share',
	imports: [CapsPopoverImports, NgIcon, CapsButton, CapsLabel, CapsInput],
	providers: [provideIcons({ lucideCopy })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-popover placement="bottom-end">
			<button id="save-presets" capsPopoverTrigger capsButton variant="secondary">Share</button>

			<ng-template capsPopoverContent let-ctx [class]="'flex w-[520px] flex-col gap-4'">
				<div class="flex flex-col gap-1 text-center sm:text-left">
					<h3 class="text-lg font-semibold">Share preset</h3>
					<p class="text-muted-foreground text-sm">
						Anyone who has this link and an OpenAI account will be able to view this.
					</p>
				</div>
				<div class="relative flex-1">
					<label capsLabel htmlFor="link" class="sr-only">Link</label>
					<input
						capsInput
						id="link"
						value="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
						readOnly
						class="h-9 pr-10"
					/>
					<button capsButton type="submit" size="icon-sm" variant="ghost" class="absolute top-1 right-1">
						<span class="sr-only">Copy</span>
						<ng-icon name="lucideCopy" />
					</button>
				</div>
			</ng-template>
		</caps-popover>
	`,
})
export class PresetShare {}
