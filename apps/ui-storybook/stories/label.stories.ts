import { FormsModule } from '@angular/forms';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<{}> = {
	title: 'Label',
	component: CapsLabel,
	tags: ['autodocs'],
	argTypes: { id: { control: 'text' } },
	decorators: [
		moduleMetadata({
			imports: [CapsInput, CapsLabel, FormsModule],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsLabel>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <label capsLabel ${argsToTemplate(args)}>E-Mail
        <input class='w-80' capsInput  type='email' placeholder='Email'/>
    </label>
    `,
	}),
};

export const InputRequired: Story = {
	render: ({ ...args }) => ({
		props: { ...args, value: '' },
		template: `
    <label capsLabel ${argsToTemplate(args)}>E-Mail *
        <input [(ngModel)]="value" class='w-80' capsInput  type='email' placeholder='Email *' required/>
    </label>
    `,
	}),
};
