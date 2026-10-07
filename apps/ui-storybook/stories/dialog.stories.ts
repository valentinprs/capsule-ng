import { Component, inject } from '@angular/core';
import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import {
	CapsDialog,
	CapsDialogImports,
	CapsDialogRef,
	CapsDialogService,
	injectCapsDialogContext,
	provideCapsDialogDefaultOptions,
} from '@capsule-ng/caps/dialog';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsDialog> = {
	title: 'Dialog',
	component: CapsDialog,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsDialogImports, CapsLabel, CapsButton, CapsInput, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsDialog>;

export const Default: Story = {
	render: () => ({
		template: `
    <caps-dialog>
    <button id='edit-profile' capsDialogTrigger capsButton>Edit Profile</button>
    <ng-template capsDialogContent let-ctx class='sm:max-w-[425px]' >
         <caps-dialog-header>
          <caps-dialog-title >Edit profile</caps-dialog-title>
          <caps-dialog-description >
            Make changes to your profile here. Click save when you're done.
          </caps-dialog-description>
        </caps-dialog-header>
        <div class='py-4 grid gap-4'>
          <div class='items-center grid grid-cols-4 gap-4'>
            <label capsLabel for='name' class='text-right'>
              Name
            </label>
            <input capsInput id='name' value='Pedro Duarte' class='col-span-3' />
          </div>
          <div class='items-center grid grid-cols-4 gap-4'>
            <label capsLabel for='username' class='text-right'>
              Username
            </label>
            <input capsInput id='username' value='@peduarte' class='col-span-3' />
          </div>
        </div>
        <caps-dialog-footer>
          <button capsButton type='submit'>Save changes</button>
        </caps-dialog-footer>
    </ng-template>
    </caps-dialog>
    `,
	}),
};

@Component({
	selector: 'nested-dialog-story',
	imports: [CapsDialogImports, CapsButtonImports],
	template: `
		<caps-dialog>
			<button capsDialogTrigger capsButton>Open Dialog</button>
			<ng-template capsDialogContent>
				<caps-dialog-header>
					<caps-dialog-title>First dialog</caps-dialog-title>
					<caps-dialog-description>Click the button below to open a nested dialog.</caps-dialog-description>
				</caps-dialog-header>

				<caps-dialog>
					<button capsDialogTrigger capsButton class="w-full">Open Nested Dialog</button>
					<ng-template capsDialogContent let-ctx>
						<caps-dialog-header>
							<caps-dialog-title>Nested dialog</caps-dialog-title>
							<caps-dialog-description>I am a nested dialog!</caps-dialog-description>
						</caps-dialog-header>

						<button capsButton (click)="ctx.close()">Close Nested Dialog</button>
					</ng-template>
				</caps-dialog>
			</ng-template>
		</caps-dialog>
	`,
})
class NestedDialogStory {}

export const NestedDialog: Story = {
	name: 'Nested Dialog',
	decorators: [
		moduleMetadata({
			imports: [NestedDialogStory],
		}),
	],
	render: () => ({
		template: '<nested-dialog-story />',
	}),
};

@Component({
	selector: 'dialog-context-menu-story',
	imports: [CapsButtonImports, CapsContextMenuImports, CapsDialogImports],
	template: `
		<div
			[capsContextMenuTrigger]="menu"
			class="border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
			tabindex="0"
		>
			Right click here
		</div>

		<ng-template #menu>
			<caps-menu class="w-64">
				<caps-menu-group>
					<button capsMenuItem>
						Save
						<caps-menu-shortcut>Cmd+S</caps-menu-shortcut>
					</button>

					<button disabled capsMenuItem>
						Archive
						<caps-menu-shortcut>Cmd+A</caps-menu-shortcut>
					</button>

					<button capsMenuItem inset="true" [capsDialogTriggerFor]="dialog">
						Print
						<caps-menu-shortcut>Cmd+P</caps-menu-shortcut>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<caps-dialog #dialog>
			<ng-template capsDialogContent let-ctx class="sm:max-w-[425px]">
				<caps-dialog-header>
					<caps-dialog-title>Print this page</caps-dialog-title>
					<caps-dialog-description>
						Are you sure you want to print this page? Only print if absolutely necessary.
					</caps-dialog-description>
				</caps-dialog-header>
				<caps-dialog-footer>
					<button capsButton variant="ghost" (click)="ctx.close()">Cancel</button>
					<button capsButton>Print</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
class DialogContextMenuStory {}

export const ContextMenu: Story = {
	name: 'Context Menu',
	decorators: [
		moduleMetadata({
			imports: [DialogContextMenuStory],
		}),
	],
	render: () => ({
		template: '<dialog-context-menu-story />',
	}),
};

type ExampleUser = {
	name: string;
	email: string;
	phone: string;
};

@Component({
	selector: 'dialog-dynamic-component-story',
	imports: [CapsButton],
	template: `
		<button capsButton (click)="openDynamicComponent()">Select User</button>
		<button capsButton (click)="openDynamicComponent(false)">Select Team (Dialog without close btn)</button>
	`,
})
class DialogDynamicStory {
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

	public openDynamicComponent(showCloseButton = true) {
		const dialogRef = this._capsDialogService.open(SelectUser, {
			context: {
				users: this._users,
			},
			contentClass: 'sm:!max-w-[750px]',
			showCloseButton,
		});

		dialogRef.closed$.subscribe((user) => {
			if (user) {
				console.log('Selected user:', user);
			}
		});
	}
}

@Component({
	selector: 'dynamic-content',
	imports: [CapsDialogImports, HlmTableImports],
	providers: [provideIcons({ lucideCheck })],
	template: `
		<caps-dialog-header>
			<caps-dialog-title>Select user</caps-dialog-title>
			<caps-dialog-description>Click a row to select a user.</caps-dialog-description>
		</caps-dialog-header>

		<table hlmTable>
			<tr hlmTr>
				<th hlmTh>Name</th>
				<th hlmTh>Email</th>
				<th hlmTh>Phone</th>
			</tr>
			@for (user of users; track user.name) {
				<tr hlmTr (click)="selectUser(user)" class="cursor-pointer">
					<td hlmTd truncate class="font-medium">{{ user.name }}</td>
					<td hlmTd>{{ user.email }}</td>
					<td hlmTd>{{ user.phone }}</td>
				</tr>
			}
		</table>
	`,
	host: {
		class: 'flex flex-col gap-4',
	},
})
class SelectUser {
	private readonly _capsDialogService = inject(CapsDialogService);
	private readonly _dialogContext = injectCapsDialogContext<{ users: ExampleUser[] }>();

	protected readonly users = this._dialogContext.users;

	public selectUser(user: ExampleUser) {
		this._capsDialogService.open(SelectUser, { context: { users: [user] }, contentClass: 'sm:!max-w-[750px]' });
	}
}

export const DynamicComponent: Story = {
	name: 'Dynamic Component',
	decorators: [
		moduleMetadata({
			imports: [DialogDynamicStory],
		}),
	],
	render: () => ({
		template: '<dialog-dynamic-component-story />',
	}),
};

export const DynamicComponentWithDefaultOptions: Story = {
	name: 'Dynamic Component with default options',
	decorators: [
		applicationConfig({
			providers: [provideCapsDialogDefaultOptions({ hasBackdrop: false })],
		}),
		moduleMetadata({
			imports: [DialogDynamicStory],
		}),
	],
	render: () => ({
		template: '<dialog-dynamic-component-story />',
	}),
};

@Component({
	selector: 'nested-dialog-dynamic-first',
	imports: [CapsButtonImports, CapsDialogImports],
	template: `
		<caps-dialog-header>
			<caps-dialog-title>First dialog</caps-dialog-title>
			<caps-dialog-description>Click the button below to open a nested dialog.</caps-dialog-description>
		</caps-dialog-header>

		<button capsButton (click)="openNestedDialog()">Open Nested Dialog</button>
	`,
	host: {
		class: 'flex flex-col gap-4',
	},
})
class NestedDialogDynamicFirst {
	private readonly _capsDialogService = inject(CapsDialogService);

	public openNestedDialog() {
		this._capsDialogService.open(NestedDialogDynamicNested);
	}
}

@Component({
	selector: 'nested-dialog-dynamic-nested',
	imports: [CapsButtonImports, CapsDialogImports],
	template: `
		<caps-dialog-header>
			<caps-dialog-title>Nested dialog</caps-dialog-title>
			<caps-dialog-description>I am a nested dialog!</caps-dialog-description>
		</caps-dialog-header>

		<button capsButton (click)="close()">Close Nested Dialog</button>
	`,
	host: {
		class: 'flex flex-col gap-4',
	},
})
class NestedDialogDynamicNested {
	private readonly _brnDialogRef = inject(CapsDialogRef);

	public close() {
		this._brnDialogRef.close();
	}
}

@Component({
	selector: 'nested-dialog-dynamic-content-story',
	imports: [CapsButton],
	template: `
		<button capsButton (click)="openDialog()">Open Dialog</button>
	`,
})
class NestedDialogDynamicStory {
	private readonly _capsDialogService = inject(CapsDialogService);

	public openDialog() {
		this._capsDialogService.open(NestedDialogDynamicFirst);
	}
}

export const NestedDynamicComponent: Story = {
	name: 'Nested Dynamic Component',
	decorators: [
		moduleMetadata({
			imports: [NestedDialogDynamicStory],
		}),
	],
	render: () => ({
		template: '<nested-dialog-dynamic-content-story />',
	}),
};
