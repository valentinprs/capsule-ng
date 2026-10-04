import { CapsAvatar, CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsAvatar> = {
	title: 'Avatar',
	component: CapsAvatar,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsAvatarImports],
		}),
	],
	render: ({ ...args }) => ({
		props: { args },
		template: `
    <caps-avatar ${argsToTemplate(args)}>
      <img src='/mountains.jpg' alt='Snow-covered mountains'  capsAvatarImage>
      <caps-avatar-fallback class='bg-sky-600 text-sky-50'>MT</caps-avatar-fallback>
    </caps-avatar>
`,
	}),
};

export default meta;
type Story = StoryObj<CapsAvatar>;

export const Default: Story = {};
