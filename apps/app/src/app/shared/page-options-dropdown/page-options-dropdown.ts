import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { lucideChevronDown } from '@ng-icons/lucide';
import { remixClaudeFill, remixOpenaiFill } from '@ng-icons/remixicon';
import { AiChatLinkDirective } from './ai-chat-link-directive';

@Component({
	selector: 'spartan-page-options-dropdown',
	imports: [CapsDropdownMenuImports, CapsButton, NgIconComponent, AiChatLinkDirective],
	providers: [provideIcons({ remixOpenaiFill, remixClaudeFill, lucideChevronDown })],
	template: `
		<button capsButton size="sm" variant="secondary" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
			AI Assist
			<ng-icon name="lucideChevronDown" />
		</button>
		<ng-template #menu>
			<caps-menu>
				<a capsMenuItem spartanAiChatLink aiType="chatgpt">
					<ng-icon name="remixOpenaiFill" />
					Open in ChatGPT
				</a>
				<a capsMenuItem spartanAiChatLink aiType="claude">
					<ng-icon name="remixClaudeFill" />
					Open in Claude
				</a>
			</caps-menu>
		</ng-template>
	`,
})
export class PageOptionsDropdown {}
