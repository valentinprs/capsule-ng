import { Component, inject } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import {
	CapsDialogDescription,
	CapsDialogHeader,
	CapsDialogRef,
	CapsDialogService,
	CapsDialogTitle,
	injectCapsDialogContext,
} from '@capsule-ng/caps/dialog';
import { HlmTableImports } from '@spartan-ng/helm/table';

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
	imports: [CapsDialogHeader, CapsDialogTitle, CapsDialogDescription, ...HlmTableImports],
	host: {
		class: 'flex flex-col gap-4',
	},
	template: `
		<caps-dialog-header>
			<caps-dialog-title>Select user</caps-dialog-title>
			<caps-dialog-description>Click a row to select a user.</caps-dialog-description>
		</caps-dialog-header>

		<table hlmTable class="w-full">
			<tr hlmTr>
				<th hlmTh>Name</th>
				<th hlmTh>Email</th>
				<th hlmTh>Phone</th>
			</tr>
			@for (user of _users; track user.name) {
				<tr hlmTr (click)="selectUser(user)" class="cursor-pointer">
					<td hlmTd truncate class="font-medium">{{ user.name }}</td>
					<td hlmTd>{{ user.email }}</td>
					<td hlmTd>{{ user.phone }}</td>
				</tr>
			}
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
