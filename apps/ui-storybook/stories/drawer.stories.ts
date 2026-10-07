import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDrawer, CapsDrawerImports } from '@capsule-ng/caps/drawer';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
type Props = { side: 'top' | 'bottom' | 'left' | 'right' };
const meta: Meta<Props> = {
	title: 'Drawer',
	component: CapsDrawer,
	tags: ['autodocs'],
	args: { side: 'bottom' },
	argTypes: { side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } },
	decorators: [moduleMetadata({ imports: [CapsDrawerImports, CapsButtonImports, CapsFieldImports, CapsInputImports] })],
};
export default meta;
export const Default: StoryObj<Props> = {
	render: (args) => ({
		props: args,
		template: `
 <caps-drawer>
  <button capsButton capsDrawerTrigger variant="outline">Open Drawer</button>
  <ng-template capsDrawerContent ${argsToTemplate(args)}>
   <caps-drawer-header><caps-drawer-title>Edit profile</caps-drawer-title><caps-drawer-description>Update your public profile.</caps-drawer-description></caps-drawer-header>
   <caps-field-group class="px-4"><caps-field><caps-field-label>Name</caps-field-label><input capsInput value="Pedro Duarte" /></caps-field><caps-field><caps-field-label>Username</caps-field-label><input capsInput value="@peduarte" /></caps-field></caps-field-group>
   <caps-drawer-footer><button capsButton capsDrawerClose>Confirm</button><button capsButton capsDrawerClose variant="outline">Cancel</button></caps-drawer-footer>
  </ng-template>
 </caps-drawer>`,
	}),
};
