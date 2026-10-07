import { Component, inject } from '@angular/core';
import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import {
	CapsDialogDescription,
	CapsDialogHeader,
	CapsDialogRef,
	CapsDialogService,
	CapsDialogTitle,
	injectCapsDialogContext,
} from '@capsule-ng/caps/dialog';
import { CapsTableImports } from '@capsule-ng/caps/table';

type ExampleUser = {
	name: string;
	email: string;
	phone: string;
};

@Component({
	selector: 'spartan-dialog-dynamic-component-preview',
	imports: [CapsButton],
	template: `
		<button capsButton (click)="openDynamicComponent()">Select User</button>
	`,
})
export class DialogDynamicPreview {
	private readonly _capsDialogService = inject(CapsDialogService);

	private readonly _users: ExampleUser[] = [
		{
			name: 'Helena Chambers',
			email: 'helenachambers@chorizon.com',
			phone: '+1 (812) 588-3759',
		},
		{
			name: 'Josie Crane',
			email: 'josiecrane@hinway.com',
			phone: '+1 (884) 523-3324',
		},
		{
			name: 'Lou Hartman',
			email: 'louhartman@optyk.com',
			phone: '+1 (912) 479-3998',
		},
		{
			name: 'Lydia Zimmerman',
			email: 'lydiazimmerman@ultrasure.com',
			phone: '+1 (944) 511-2111',
		},
	];

	public openDynamicComponent() {
		const dialogRef = this._capsDialogService.open(SelectUser, {
			context: {
				users: this._users,
			},
			contentClass: 'sm:!max-w-[750px]',
		});

		dialogRef.closed$.subscribe((user) => {
			if (user) {
				console.log('Selected user:', user);
			}
		});
	}
}

@Component({
	selector: 'spartan-dynamic-content',
	imports: [CapsDialogHeader, CapsDialogTitle, CapsDialogDescription, ...CapsTableImports, CapsButtonImports],
	host: {
		class: 'flex flex-col gap-4',
	},
	template: `
		<caps-dialog-header>
			<caps-dialog-title>Select user</caps-dialog-title>
			<caps-dialog-description>Select a user by name.</caps-dialog-description>
		</caps-dialog-header>

		<table capsTable class="w-full">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone</th>
				</tr>
			</thead>
			<tbody>
				@for (user of _users; track user.name) {
					<tr>
						<th scope="row">
							<button type="button" capsButton variant="ghost" (click)="selectUser(user)">{{ user.name }}</button>
						</th>
						<td>{{ user.email }}</td>
						<td>{{ user.phone }}</td>
					</tr>
				}
			</tbody>
		</table>
	`,
})
class SelectUser {
	private readonly _dialogRef = inject<CapsDialogRef<ExampleUser>>(CapsDialogRef);
	private readonly _dialogContext = injectCapsDialogContext<{ users: ExampleUser[] }>();

	protected readonly _users = this._dialogContext.users;

	public selectUser(user: ExampleUser) {
		this._dialogRef.close(user);
	}
}
