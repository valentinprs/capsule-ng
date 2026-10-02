import { RouterTestingModule } from '@angular/router/testing';
import { CapsBreadcrumb, CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLink } from '@capsule-ng/caps/link';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsBreadcrumb> = {
	title: 'Breadcrumb',
	component: CapsBreadcrumb,
	tags: ['autodocs'],
	decorators: [moduleMetadata({ imports: [CapsBreadcrumbImports, CapsLink, RouterTestingModule] })],
};
export default meta;
type Story = StoryObj<CapsBreadcrumb>;
export const Default: Story = {
	render: () => ({
		template: `
 <caps-breadcrumb>
  <caps-breadcrumb-item href="/home">Home</caps-breadcrumb-item>
  <caps-breadcrumb-item><caps-breadcrumb-ellipsis /></caps-breadcrumb-item>
  <caps-breadcrumb-item href="/components">Components</caps-breadcrumb-item>
  <caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
 </caps-breadcrumb>`,
	}),
};
export const Custom: Story = {
	name: 'Router links',
	render: () => ({
		template: `
 <caps-breadcrumb aria-label="Page hierarchy">
  <caps-breadcrumb-item><a capsLink routerLink="/home">Home</a></caps-breadcrumb-item>
  <caps-breadcrumb-item><a capsLink routerLink="/components">Components</a></caps-breadcrumb-item>
  <caps-breadcrumb-item current>Breadcrumb</caps-breadcrumb-item>
 </caps-breadcrumb>`,
	}),
};
