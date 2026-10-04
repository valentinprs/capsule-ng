import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCreditCard, lucideInfo, lucideMail, lucideSearch, lucideStar } from '@ng-icons/lucide';

import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';

@Component({
	selector: 'spartan-input-group-icon-preview',
	imports: [CapsInputImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideSearch, lucideMail, lucideCheck, lucideCreditCard, lucideStar, lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input capsInput placeholder="Search..." aria-label="Search" />
			<caps-input-group-addon>
				<ng-icon name="lucideSearch" />
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput type="email" placeholder="Enter your email" aria-label="Enter your email" />
			<caps-input-group-addon>
				<ng-icon name="lucideMail" />
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="Card number" aria-label="Card number" />
			<caps-input-group-addon>
				<ng-icon name="lucideCreditCard" />
			</caps-input-group-addon>
			<caps-input-group-addon align="inline-end">
				<ng-icon name="lucideCheck" />
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="Card number" aria-label="Card number" />
			<caps-input-group-addon align="inline-end">
				<ng-icon name="lucideStar" />
				<ng-icon name="lucideInfo" />
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupIconPreview {}
