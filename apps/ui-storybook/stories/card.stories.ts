import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmCard, HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<HlmCard> = {
	title: 'Card',
	component: HlmCard,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [HlmCardImports, CapsLabel, CapsInput, CapsButton, HlmBadge, HlmSelectImports],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmCard>;

export const Default: Story = {
	render: () => ({
		template: `
    <section class='max-w-lg mx-auto' hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Create new project</h3>
        <p hlmCardDescription>
          Deploy your new project in one-click.
        </p>
      </div>
      <p hlmCardContent>
       <label class='block' capsLabel>Name
       <input class='w-full mt-1.5' placeholder='Name of your project' capsInput>
       </label>
       <label class='block my-4' capsLabel>Framework
       <hlm-select class="inline-block w-full mt-1.5">
            <hlm-select-trigger class="w-full">
                <hlm-select-value placeholder="Select an option" />
            </hlm-select-trigger>
            <hlm-select-content *hlmSelectPortal>
              <hlm-select-group>
                <hlm-select-item value="Angular">Angular</hlm-select-item>
                <hlm-select-item value="React">React</hlm-select-item>
                <hlm-select-item value="Vue">Vue</hlm-select-item>
              </hlm-select-group>
            </hlm-select-content>
        </hlm-select>
       </label>
      </p>
      <div hlmCardFooter class='justify-between'>
        <button capsButton variant='ghost'>Cancel</button>
        <button capsButton>Create</button>
      </div>
    </section>
    `,
	}),
};

export const Transposed: Story = {
	render: () => ({
		template: `
    <section class='max-w-lg mx-auto' hlmCard>
       <div hlmCardHeader direction='row'>
        <h3 hlmCardTitle>AngularGPT</h3>
        <p hlmCardDescription>
          <span variant='secondary' class='mt-1.5' hlmBadge>beta</span>
        </p>
      </div>
      <p hlmCardContent>
       <label class='block' capsLabel>E-mail
       <input class='w-full mt-1.5' placeholder='you@spartan-ng' capsInput>
       </label>
         <label class='block my-4' capsLabel>Password
       <input class='w-full mt-1.5' type='password' capsInput>
       </label>
      </p>
      <div hlmCardFooter direction='column'>
        <button capsButton>Sign In</button>
        <button capsButton variant='ghost'>Create Account</button>
      </div>
    </section>
    `,
	}),
};
