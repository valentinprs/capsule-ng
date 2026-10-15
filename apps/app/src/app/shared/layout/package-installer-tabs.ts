import { KeyValuePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { Code } from '../code/code';

const brnPackageInstallationCommands = {
	pnpm: 'pnpm add @spartan-ng/brain',
	npm: 'npm install @spartan-ng/brain',
	yarn: 'yarn add @spartan-ng/brain',
	bun: 'bun add @spartan-ng/brain',
} as const;

type PackageKey = keyof typeof brnPackageInstallationCommands;

const angularCdkPackageInstallationCommands = {
	pnpm: 'pnpm add @angular/cdk',
	npm: 'npm install @angular/cdk',
	yarn: 'yarn add @angular/cdk',
	bun: 'bun add @angular/cdk',
} as const;

const tabContent =
	'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border border-border';

const globalValue = signal<PackageKey>('pnpm');

@Component({
	selector: 'spartan-package-installer-tab',
	imports: [CapsTabsImports, Code, KeyValuePipe],
	host: {
		class: 'block',
	},
	template: `
		<caps-tabs [value]="value()" class="block" (tabActivated)="onTabActivated($event)">
			<caps-tabs-list
				type="line"
				aria-label="Package manager"
				class="border-border text-muted-foreground mb-4 inline-flex h-9 w-full items-center justify-start rounded-none border-b bg-transparent p-0"
			>
				@for (item of installationCommands() | keyvalue: collationComparator; track item.key) {
					<button capsTabsTrigger [value]="item.key">{{ item.key }}</button>
				}
			</caps-tabs-list>
			@for (item of installationCommands() | keyvalue: collationComparator; track item.key) {
				<caps-tabs-content class="${tabContent}" [value]="item.key">
					<spartan-code [language]="language()" [code]="item.value" />
				</caps-tabs-content>
			}
		</caps-tabs>
	`,
})
export class PackageInstallerTabs {
	public readonly value = globalValue;
	public readonly package = input<'brn' | 'cdk'>('brn');
	public readonly installCommand = computed(() => {
		const activeTab = this.value();
		return this.installationCommands()[activeTab] ?? '';
	});
	public readonly language = input<'ts' | 'sh' | 'js'>('sh');

	public installationCommands = computed(() => {
		return this.package() === 'cdk' ? angularCdkPackageInstallationCommands : brnPackageInstallationCommands;
	});

	public collationComparator = () => 0;

	protected onTabActivated(value: string) {
		this.value.set(value as PackageKey);
	}
}
