import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { TitleCasePipe } from '@angular/common';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { lucideChevronDown } from '@ng-icons/lucide';
import { StyleService } from '@spartan-ng/app/app/shared/style.service';
import { STYLES } from '@spartan-ng/styles';

@Component({
	selector: 'spartan-style-options-dropdown',
	imports: [CapsDropdownMenuImports, CapsButton, NgIconComponent, TitleCasePipe],
	providers: [provideIcons({ lucideChevronDown })],
	template: `
		<button capsButton size="sm" variant="secondary" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
			Style {{ _styleService.style() | titlecase }}
			<ng-icon name="lucideChevronDown" />
		</button>
		<ng-template #menu>
			<caps-menu>
				<caps-menu-group type="radio" [value]="_styleService.style()" (valueChange)="_setStyle($event)">
					@for (style of _styles; track style) {
						<button capsMenuRadioItem [value]="style">
							{{ style | titlecase }}
						</button>
					}
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class StyleOptionsDropdown {
	protected readonly _styleService = inject(StyleService);

	protected readonly _styles = STYLES;

	protected _setStyle(value: string | string[]) {
		const style = this._styles.find((style) => style === value);
		if (style) this._styleService.style.set(style);
	}
}
