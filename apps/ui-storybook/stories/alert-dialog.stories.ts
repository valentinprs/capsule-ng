import { CapsAlertDialog, CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButton } from '@capsule-ng/caps/button';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsAlertDialog> = {
	title: 'Alert Dialog',
	component: CapsAlertDialog,
	tags: ['autodocs'],
	args: {},
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [CapsAlertDialogImports, CapsButton],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsAlertDialog>;

export const Default: Story = {
	render: () => ({
		template: `
    <caps-alert-dialog>
      <button id="delete-account" variant="outline" capsAlertDialogTrigger capsButton>Delete Account</button>
      <ng-template capsAlertDialogContent let-ctx >
           <caps-alert-dialog-header>
            <caps-alert-dialog-title >Are you absolutely sure?</caps-alert-dialog-title>
            <caps-alert-dialog-description >
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            </caps-alert-dialog-description>
          </caps-alert-dialog-header>
          <caps-alert-dialog-footer>
            <button capsAlertDialogCancel capsButton variant="outline" (click)="ctx.close()">Cancel</button>
            <button capsButton (click)="ctx.close()" type="submit">Delete account</button>
          </caps-alert-dialog-footer>
      </ng-template>
    </caps-alert-dialog>
    `,
	}),
};

export const Small: Story = {
	render: () => ({
		template: `
    <caps-alert-dialog>
      <button variant="outline" capsAlertDialogTrigger capsButton>Open small dialog</button>
      <ng-template capsAlertDialogContent size="sm" let-ctx>
        <caps-alert-dialog-header>
          <caps-alert-dialog-title>Allow notifications?</caps-alert-dialog-title>
          <caps-alert-dialog-description>
            You can change this later in your account settings.
          </caps-alert-dialog-description>
        </caps-alert-dialog-header>
        <caps-alert-dialog-footer>
          <button capsAlertDialogCancel capsButton variant="outline" (click)="ctx.close()">Don't allow</button>
          <button capsButton (click)="ctx.close()">Allow</button>
        </caps-alert-dialog-footer>
      </ng-template>
    </caps-alert-dialog>
    `,
	}),
};

export const Destructive: Story = {
	render: () => ({
		template: `
    <caps-alert-dialog>
      <button variant="destructive" capsAlertDialogTrigger capsButton>Delete project</button>
      <ng-template capsAlertDialogContent let-ctx>
        <caps-alert-dialog-header>
          <caps-alert-dialog-title>Delete this project?</caps-alert-dialog-title>
          <caps-alert-dialog-description>
            This action cannot be undone. The project and all of its data will be permanently deleted.
          </caps-alert-dialog-description>
        </caps-alert-dialog-header>
        <caps-alert-dialog-footer>
          <button capsAlertDialogCancel capsButton variant="outline" (click)="ctx.close()">Cancel</button>
          <button capsButton variant="destructive" (click)="ctx.close()">Delete</button>
        </caps-alert-dialog-footer>
      </ng-template>
    </caps-alert-dialog>
    `,
	}),
};
