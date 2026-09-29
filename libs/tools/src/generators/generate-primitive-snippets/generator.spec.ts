import { type Tree, readJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { extractPrimitiveCodeGenerator } from './generator';

describe('extractPrimitiveCodeGenerator', () => {
	let tree: Tree;
	const componentsBasePath = 'apps/app/src/app/pages/(components)/components';

	beforeEach(() => {
		tree = createTreeWithEmptyWorkspace();
	});

	it('should produce a per-component JSON file with snippets', async () => {
		// Arrange
		tree.write(
			`${componentsBasePath}/button/button.preview.ts`,
			`import { Component } from '@angular/core';
			@Component({ selector: 'spartan-button-preview', template: '<button>Button</button>' })
			export class ButtonPreviewComponent {}`,
		);
		tree.write(
			`${componentsBasePath}/accordion/accordion.preview.ts`,
			`import { Component } from '@angular/core';
			@Component({ selector: 'spartan-accordion-preview', template: '<div>Accordion</div>' })
			export class AccordionPreviewComponent {}`,
		);

		// Act
		await extractPrimitiveCodeGenerator(tree);

		// Assert
		const button = readJson(tree, 'apps/app/src/public/data/primitives-snippets/button.json');
		expect(button['button']['default']).toContain('spartan-button-preview');

		const accordion = readJson(tree, 'apps/app/src/public/data/primitives-snippets/accordion.json');
		expect(accordion['accordion']['default']).toContain('spartan-accordion-preview');
	});

	it('should not emit StackBlitz example sibling files', async () => {
		tree.write(
			`${componentsBasePath}/data-table/data-table.preview.ts`,
			`import { Component } from '@angular/core';
			import { payments } from './payments';
			@Component({ selector: 'spartan-data-table-preview', template: '<table></table>' })
			export class DataTablePreviewComponent { data = payments; }`,
		);
		tree.write(`${componentsBasePath}/data-table/payments.ts`, `export const payments = [];`);

		await extractPrimitiveCodeGenerator(tree);

		expect(tree.exists('apps/app/src/public/data/stackblitz-example-files.json')).toBe(false);
	});

	it('should handle multiple examples for a single primitive', async () => {
		// Arrange
		tree.write(
			`${componentsBasePath}/toggle/toggle.preview.ts`,
			`import { Component } from '@angular/core';
			@Component({ selector: 'spartan-toggle-preview', template: '<button>Toggle</button>' })
			export class TogglePreviewComponent {}`,
		);
		tree.write(
			`${componentsBasePath}/toggle/toggle-disabled.example.ts`,
			`import { Component } from '@angular/core';
			@Component({ selector: 'spartan-toggle-disabled', template: '<button disabled>Disabled</button>' })
			export class ToggleDisabledComponent {}`,
		);

		// Act
		await extractPrimitiveCodeGenerator(tree);

		// Assert
		const toggle = readJson(tree, 'apps/app/src/public/data/primitives-snippets/toggle.json');

		expect(toggle['toggle']['default']).toContain('spartan-toggle-preview');
		expect(toggle['toggle']['disabled']).toContain('spartan-toggle-disabled');
	});

	describe('preview (default) snippet', () => {
		const readButton = () => readJson(tree, `apps/app/src/public/data/primitives-snippets/button.json`)['button'];

		it('should only keep the dedented template when the preview class is empty', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				[
					`import { Component } from '@angular/core';`,
					`import { HlmButtonImports } from '@spartan-ng/helm/button';`,
					``,
					`@Component({`,
					`\tselector: 'spartan-button-preview',`,
					`\timports: [HlmButtonImports],`,
					`\thost: { class: 'flex gap-2' },`,
					`\ttemplate: \``,
					`\t\t<div class="flex">`,
					`\t\t\t<button hlmBtn>Button</button>`,
					`\t\t</div>`,
					`\t\``,
					`})`,
					`export class ButtonPreview {}`,
					``,
					`export const defaultImports = \`import { HlmButtonImports } from '@spartan-ng/helm/button';\`;`,
					`export const defaultSkeleton = \`<button hlmBtn>Button</button>\`;`,
				].join('\n'),
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			const button = readButton();
			expect(button['default']).toBe('<div class="flex">\n\t<button hlmBtn>Button</button>\n</div>');
		});

		it('should keep the full preview file under defaultSource for template-only snippets', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				`import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-button-preview',
	imports: [HlmButtonImports],
	template: \`<button hlmBtn>Button</button>\`,
})
export class ButtonPreview {}

export const defaultImports = \`import { HlmButtonImports } from '@spartan-ng/helm/button';\`;`,
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			const button = readButton();
			expect(button['default']).toBe('<button hlmBtn>Button</button>');
			expect(button['defaultSource']).toContain('@Component({');
			expect(button['defaultSource']).toContain('export class ButtonPreview {}');
			expect(button['defaultSource']).not.toContain('defaultImports');
		});

		it('should ignore exported docs string constants when checking for template-only', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				`import { Component } from '@angular/core';

@Component({ selector: 'spartan-button-preview', template: \`<button>Button</button>\` })
export class ButtonPreview {}

export const anatomyCode = \`<button>Anatomy</button>\`;`,
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			expect(readButton()['default']).toBe('<button>Button</button>');
		});

		it('should fall back to the full file when the preview file declares other code', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				`import { Component } from '@angular/core';

@Component({ selector: 'spartan-button-inner', template: \`<button>Inner</button>\` })
export class ButtonInner {
	public readonly label = 'Inner';
}

@Component({ selector: 'spartan-button-preview', imports: [ButtonInner], template: \`<spartan-button-inner />\` })
export class ButtonPreview {}`,
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			expect(readButton()['default']).toContain('export class ButtonInner');
		});

		it('should fall back to the full file when the preview class has members', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				`import { Component, signal } from '@angular/core';

@Component({
	selector: 'spartan-button-preview',
	template: \`<button (click)="count.set(count() + 1)">{{ count() }}</button>\`,
})
export class ButtonPreview {
	public readonly count = signal(0);
}

export const defaultSkeleton = \`<button hlmBtn>Button</button>\`;`,
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			const button = readButton();
			expect(button['default']).toContain('@Component({');
			expect(button['default']).toContain('public readonly count = signal(0);');
			expect(button['default']).not.toContain('defaultSkeleton');
			expect(button['defaultSource']).toBeUndefined();
		});

		it('should fall back to the full file when the template is not a plain template literal', async () => {
			// Arrange
			tree.write(
				`${componentsBasePath}/(button)/button.preview.ts`,
				`import { Component } from '@angular/core';
const label = 'Button';

@Component({
	selector: 'spartan-button-preview',
	template: \`<button>\${label}</button>\`,
})
export class ButtonPreview {}`,
			);
			tree.write(
				`${componentsBasePath}/(badge)/badge.preview.ts`,
				`import { Component } from '@angular/core';

@Component({ selector: 'spartan-badge-preview', templateUrl: './badge.html' })
export class BadgePreview {}`,
			);

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			expect(readButton()['default']).toContain('@Component({');
			const badge = readJson(tree, 'apps/app/src/public/data/primitives-snippets/badge.json')['badge'];
			expect(badge['default']).toContain('@Component(');
		});

		it('should keep the full file for examples and variant previews', async () => {
			// Arrange
			const emptyComponent = (selector: string) => `import { Component } from '@angular/core';

@Component({
	selector: '${selector}',
	template: \`<button>Button</button>\`,
})
export class Example {}`;
			tree.write(`${componentsBasePath}/(button)/button.preview.ts`, emptyComponent('spartan-button-preview'));
			tree.write(`${componentsBasePath}/(button)/button--outline.example.ts`, emptyComponent('spartan-button-outline'));
			tree.write(`${componentsBasePath}/(button)/button--small.preview.ts`, emptyComponent('spartan-button-small'));
			// Also maps to the `default` key - the preview must win regardless of file order.
			tree.write(`${componentsBasePath}/(button)/button--default.example.ts`, emptyComponent('spartan-button-default'));

			// Act
			await extractPrimitiveCodeGenerator(tree);

			// Assert
			const button = readButton();
			expect(button['default']).toBe('<button>Button</button>');
			expect(button['defaultSource']).toContain('spartan-button-preview');
			expect(button['outline']).toContain("selector: 'spartan-button-outline'");
			expect(button['small']).toContain("selector: 'spartan-button-small'");
		});
	});

	it('should not write any files if no primitives are found', async () => {
		// Arrange
		tree.write(`${componentsBasePath}/empty/some-other-file.ts`, 'const a = 1;');

		// Act
		await extractPrimitiveCodeGenerator(tree);

		// Assert
		expect(tree.children('apps/app/src/public/data/primitives-snippets').length).toBe(0);
	});
});
