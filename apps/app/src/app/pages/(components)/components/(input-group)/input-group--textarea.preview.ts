import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { tablerBrandJavascript, tablerCopy, tablerCornerDownLeft, tablerRefresh } from '@ng-icons/tabler-icons';

@Component({
	selector: 'spartan-input-group-textarea-preview',
	imports: [CapsButtonImports, CapsTextareaImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ tablerBrandJavascript, tablerCopy, tablerCornerDownLeft, tablerRefresh })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<textarea
				capsTextarea
				id="textarea-code-32"
				placeholder="console.log('Hello, world!');"
				class="min-h-50"
				aria-label="console.log('Hello, world!');"
			></textarea>
			<caps-input-group-addon align="block-end" class="border-t">
				<caps-input-group-text>Line 1, Column 1</caps-input-group-text>
				<button capsButton size="sm" class="ml-auto" variant="default" type="button">
					Run
					<ng-icon name="tablerCornerDownLeft" />
				</button>
			</caps-input-group-addon>
			<caps-input-group-addon align="block-start" class="border-b">
				<caps-input-group-text class="font-mono font-medium">
					<ng-icon name="tablerBrandJavascript" />
					script.js
				</caps-input-group-text>
				<button capsButton class="ml-auto" size="icon-xs" variant="ghost" type="button" aria-label="Refresh code">
					<ng-icon name="tablerRefresh" />
				</button>
				<button capsButton variant="ghost" size="icon-xs" type="button" aria-label="Copy code">
					<ng-icon name="tablerCopy" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupTextareaPreview {}
