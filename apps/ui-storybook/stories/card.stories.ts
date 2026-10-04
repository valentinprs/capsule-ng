import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCard, CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { HlmBadge } from '@spartan-ng/helm/badge';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsCard> = {
	title: 'Card',
	component: CapsCard,
	tags: ['autodocs'],
	args: { width: 'fill', maxWidth: 'lg', density: 'default' },
	argTypes: {
		width: { control: 'select', options: ['fill', 'auto'] },
		maxWidth: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
		density: { control: 'select', options: ['default', 'compact'] },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsCardImports, CapsFieldImports, CapsInput, CapsButton, HlmBadge, CapsSelectImports],
		}),
	],
};
export default meta;
type Story = StoryObj<CapsCard>;

export const Default: Story = {
	render: (args) => ({
		props: args,
		template: `
  <caps-card [width]="width" [maxWidth]="maxWidth" [density]="density" class="mx-auto">
   <caps-card-header>
    <caps-card-title [level]="2">Create new project</caps-card-title>
    <caps-card-description>Deploy your new project in one click.</caps-card-description>
   </caps-card-header>
   <caps-card-content>
    <caps-field-group>
     <caps-field>
      <caps-field-label>Name</caps-field-label>
      <input capsInput placeholder="Name of your project" />
     </caps-field>
     <caps-field>
      <caps-field-label>Framework</caps-field-label>
      <caps-select placeholder="Select an option">

                <caps-select-option value="Angular">Angular</caps-select-option>
                <caps-select-option value="React">React</caps-select-option>
                <caps-select-option value="Vue">Vue</caps-select-option>
        </caps-select>
     </caps-field>
    </caps-field-group>
   </caps-card-content>
   <caps-card-footer class="justify-between">
    <button capsButton variant="ghost">Cancel</button><button capsButton>Create</button>
   </caps-card-footer>
  </caps-card>
  `,
	}),
};

export const Transposed: Story = {
	render: (args) => ({
		props: args,
		template: `
  <caps-card [width]="width" [maxWidth]="maxWidth" [density]="density" class="mx-auto">
   <caps-card-header>
    <caps-card-title [level]="2">AngularGPT</caps-card-title>
    <caps-card-action><span hlmBadge variant="secondary">beta</span></caps-card-action>
   </caps-card-header>
   <caps-card-content>
    <caps-field-group>
     <caps-field><caps-field-label>Email</caps-field-label><input capsInput type="email" placeholder="you@example.com" /></caps-field>
     <caps-field><caps-field-label>Password</caps-field-label><input capsInput type="password" /></caps-field>
    </caps-field-group>
   </caps-card-content>
   <caps-card-footer class="flex-col items-stretch gap-2">
    <button capsButton>Sign In</button><button capsButton variant="ghost">Create Account</button>
   </caps-card-footer>
  </caps-card>
  `,
	}),
};

export const Compact: Story = { ...Default, args: { density: 'compact', maxWidth: 'sm' } };
export const ContentWidth: Story = { ...Default, args: { width: 'auto', maxWidth: 'none' } };
