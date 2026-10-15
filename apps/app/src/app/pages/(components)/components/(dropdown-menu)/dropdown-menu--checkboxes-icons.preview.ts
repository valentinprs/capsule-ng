import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideMail, lucideMessageSquare } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-dropdown-checkboxes-icons',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideMail, lucideBell, lucideMessageSquare })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open</button>

		<ng-template #menu>
			<caps-menu class="w-52">
				<caps-menu-group label="Notification Preferences">
					<button capsMenuCheckboxItem [(checked)]="email">
						<ng-icon name="lucideMail" />
						Email notifications
					</button>

					<button capsMenuCheckboxItem [(checked)]="sms">
						<ng-icon name="lucideMessageSquare" />
						SMS notifications
					</button>

					<button capsMenuCheckboxItem [(checked)]="push">
						<ng-icon name="lucideBell" />
						Push notifications
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownCheckboxesIcons {
	public readonly email = signal(true);
	public readonly sms = signal(false);
	public readonly push = signal(true);
}
