import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCard, CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsCard> = {
	title: 'Card',
	component: CapsCard,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({ imports: [CapsCardImports, CapsFieldImports, CapsInput, CapsButton, HlmBadge, HlmSelectImports] }),
	],
};
export default meta;
type Story = StoryObj<CapsCard>;

export const Default: Story = {
	render: () => ({
		template: `
  <caps-card class="mx-auto max-w-lg">
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
      <caps-field-label for="card-framework">Framework</caps-field-label>
      <!-- Helm Select remains until its Capsule family is available. Its trigger needs an explicit label target. -->
      <hlm-select>
       <hlm-select-trigger buttonId="card-framework" class="w-full"><hlm-select-value placeholder="Select an option" /></hlm-select-trigger>
       <hlm-select-content *hlmSelectPortal>
        <hlm-select-group>
         <hlm-select-item value="Angular">Angular</hlm-select-item>
         <hlm-select-item value="React">React</hlm-select-item>
         <hlm-select-item value="Vue">Vue</hlm-select-item>
        </hlm-select-group>
       </hlm-select-content>
      </hlm-select>
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
	render: () => ({
		template: `
  <caps-card class="mx-auto max-w-lg">
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
