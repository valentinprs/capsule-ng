import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsSheet, CapsSheetImports } from '@capsule-ng/caps/sheet';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

export type SheetProps = { side: 'top' | 'bottom' | 'left' | 'right' };
const meta: Meta<SheetProps> = {
	title: 'Sheet',
	component: CapsSheet,
	tags: ['autodocs'],
	args: { side: 'right' },
	argTypes: {
		side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsSheetImports, CapsButtonImports, CapsInputImports, CapsLabelImports],
		}),
	],
};

export default meta;
type Story = StoryObj<SheetProps>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <caps-sheet>
    <button id='edit-profile' variant='outline' capsSheetTrigger capsButton>Edit Profile</button>
    <ng-template capsSheetContent ${argsToTemplate(args)} >
         <caps-sheet-header>
          <caps-sheet-title>Edit Profile</caps-sheet-title>
          <caps-sheet-description>
          Make changes to your profile here. Click save when you're done.
          </caps-sheet-description>
        </caps-sheet-header>
                <div class='px-4 py-4 grid gap-4'>
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
        <caps-sheet-footer>
          <button capsButton type='submit'>Save Changes</button>
        </caps-sheet-footer>
    </ng-template>
    </caps-sheet>
    `,
	}),
};
