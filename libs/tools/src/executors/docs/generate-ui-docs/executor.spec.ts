import { workspaceRoot } from '@nx/devkit';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';

function readGeneratedJson() {
	// Reassemble the per-component ui-api files into one object for the snapshot.
	const dir = join(workspaceRoot, 'dist/extracted-metadata/ui-api');
	const merged: Record<string, unknown> = {};
	for (const file of readdirSync(dir).sort()) {
		Object.assign(merged, JSON.parse(readFileSync(join(dir, file), 'utf8')));
	}
	return merged;
}

/**
 * Strip properties that change frequently and aren't essential for API structure validation
 */
function stripVolatileProperties(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map((item) => stripVolatileProperties(item));
	}

	if (obj && typeof obj === 'object') {
		const result: any = {};
		for (const [key, value] of Object.entries(obj)) {
			// Skip properties that change frequently
			if (key === 'file' || key === 'description' || key === 'defaultValue') {
				continue;
			}
			result[key] = stripVolatileProperties(value);
		}
		return result;
	}

	return obj;
}

describe('generate-ui-docs executor', () => {
	it('produces stable output', async () => {
		const generated = readGeneratedJson();
		const stripped = stripVolatileProperties(generated);
		expect(stripped).toMatchSnapshot();
	});

	it('documents the modal panel anatomy and controlled Capsule state', () => {
		const generated = readGeneratedJson() as NestedStructure;
		for (const [slug, name] of [
			['sheet', 'Sheet'],
			['drawer', 'Drawer'],
		]) {
			const family = generated[slug]['caps'];
			expect(family['Caps' + name].selector).toBe('caps-' + slug);
			expect(family['Caps' + name].models).toContainEqual(expect.objectContaining({ name: 'open', type: 'boolean' }));
			expect(family['Caps' + name].inputs.map(({ name }) => name)).toEqual(
				expect.arrayContaining(['disableClose', 'autoFocus', 'restoreFocus', 'aria-label']),
			);
			expect(family['Caps' + name + 'Content'].selector).toBe('ng-template[caps' + name + 'Content]');
			expect(family['Caps' + name + 'Content'].inputs.map(({ name }) => name)).toEqual(
				expect.arrayContaining(['class', 'side']),
			);
			expect(family['Caps' + name + 'Trigger'].selector).toContain('button[caps' + name + 'Trigger]');
			expect(family['Caps' + name + 'Close'].selector).toBe('button[caps' + name + 'Close]');
			expect(Object.keys(family)).not.toContain('Caps' + name + 'Panel');
		}
	});

	it('documents the caps components of each caps entry point under the caps library', () => {
		const generated = readGeneratedJson() as NestedStructure;

		const breadcrumb = generated['breadcrumb']['caps'];
		expect(Object.keys(breadcrumb)).toEqual(expect.arrayContaining(['CapsBreadcrumb', 'CapsBreadcrumbItem']));
		expect(breadcrumb['CapsBreadcrumb'].selector).toBe('caps-breadcrumb');
		expect(breadcrumb['CapsBreadcrumb'].inputs).toContainEqual(
			expect.objectContaining({ name: 'aria-label', type: 'string', defaultValue: "'breadcrumb'" }),
		);
		expect(breadcrumb['CapsBreadcrumbItem'].selector).toBe('caps-breadcrumb-item');
		expect(breadcrumb['CapsBreadcrumbItem'].inputs).toContainEqual(expect.objectContaining({ name: 'current' }));

		expect(generated['link']['caps']['CapsLink'].selector).toBe('a[capsLink]');
	});

	it('documents the native caps form controls and their exposed Brain inputs', () => {
		const generated = readGeneratedJson() as NestedStructure;

		for (const [slug, name, selector] of [
			['input', 'CapsInput', 'input[capsInput]'],
			['textarea', 'CapsTextarea', 'textarea[capsTextarea]'],
		]) {
			const control = generated[slug]['caps'][name];
			expect(control.selector).toBe(selector);
			expect(control.inputs.map((input: { name: string }) => input.name)).toEqual(
				expect.arrayContaining(['id', 'forceInvalid', 'aria-describedby']),
			);
			expect(control.outputs).toEqual([]);
			expect(control.models).toEqual([]);
		}

		const label = generated['label']['caps']['CapsLabel'];
		expect(label.selector).toBe('label[capsLabel]');
		expect(label.inputs.map((input: { name: string }) => input.name)).toEqual(['id', 'for']);
	});
	it('documents the Capsule Field composition and native semantic grouping', () => {
		const field = (readGeneratedJson() as NestedStructure)['field']['caps'];
		expect(Object.keys(field)).toEqual(
			expect.arrayContaining([
				'CapsField',
				'CapsFieldGroup',
				'CapsFieldContent',
				'CapsFieldDescription',
				'CapsFieldError',
				'CapsFieldSet',
				'CapsFieldLegend',
				'CapsFieldLabel',
				'CapsFieldSeparator',
			]),
		);
		expect(field['CapsField'].selector).toBe('caps-field');
		expect(field['CapsField'].inputs.map(({ name }) => name)).toEqual(
			expect.arrayContaining(['orientation', 'forceInvalid']),
		);
		expect(field['CapsFieldError'].inputs.map(({ name }) => name)).toEqual(
			expect.arrayContaining(['id', 'validator', 'forceShow']),
		);
		expect(field['CapsFieldSet'].selector).toBe('caps-field-set');
		expect(field['CapsFieldSet'].inputs.map(({ name }) => name)).toContain('aria-describedby');
		expect(field['CapsFieldLegend'].selector).toBe('caps-field-legend');
		expect(field['CapsFieldLabel'].selector).toBe('caps-field-label');
		expect(field['CapsFieldSet'].inputs.map(({ name }) => name)).toContain('disabled');
	});
	it('documents composed Capsule inputs without exposing the private OTP view adapter', () => {
		const generated = readGeneratedJson() as NestedStructure;
		const group = generated['input-group']['caps'];
		expect(Object.keys(group)).toEqual(['CapsInputGroup', 'CapsInputGroupAddon', 'CapsInputGroupText']);
		expect(group['CapsInputGroupAddon'].inputs.map(({ name }) => name)).toEqual(['align']);
		const otp = generated['input-otp']['caps'];
		expect(Object.keys(otp)).not.toContain('CapsInputOtpBrain');
		expect(otp['CapsInputOtp'].inputs.map(({ name }) => name)).toEqual(
			expect.arrayContaining([
				'length',
				'inputMode',
				'autocomplete',
				'autofocus',
				'disabled',
				'value',
				'transformPaste',
				'id',
				'aria-label',
				'aria-labelledby',
				'aria-describedby',
			]),
		);
		expect(otp['CapsInputOtp'].inputs.map(({ name }) => name)).not.toContain('inputStyles');
		expect(otp['CapsInputOtp'].outputs.map(({ name }) => name)).toEqual(['valueChange', 'completed']);
	});
	it('documents native action menus and their controlled selection contracts', () => {
		const generated = readGeneratedJson() as NestedStructure;
		const menu = generated['menu']['caps'];
		expect(menu['CapsMenu'].inputs).toContainEqual(
			expect.objectContaining({ name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", defaultValue: "'lg'" }),
		);
		expect(menu['CapsMenuItem'].selector).toBe('button[capsMenuItem],a[capsMenuItem]');
		expect(menu['CapsMenuItem'].outputs.map(({ name }) => name)).toEqual(['itemClick']);
		for (const name of ['CapsMenuCheckboxItem', 'CapsMenuRadioItem']) {
			expect(menu[name].selector).toMatch(/^button\[capsMenu/);
			expect(menu[name].models).toContainEqual(expect.objectContaining({ name: 'checked', type: 'boolean' }));
		}
		expect(menu['CapsMenuGroup'].models).toContainEqual(
			expect.objectContaining({ name: 'value', type: 'string | string[]' }),
		);
		const dropdown = generated['dropdown-menu']['caps']['CapsDropdownMenuTrigger'];
		expect(dropdown.selector).toBe('button[capsDropdownMenuTrigger]');
		expect(dropdown.models).toContainEqual(expect.objectContaining({ name: 'open', type: 'boolean' }));
		expect(dropdown.inputs).toContainEqual(
			expect.objectContaining({ name: 'capsDropdownMenuTrigger', required: true }),
		);
		expect(dropdown.outputs.map(({ name }) => name)).toEqual(['opened', 'closed']);
		expect(generated['context-menu']['caps']['CapsContextMenuTrigger'].inputs.map(({ name }) => name)).toContain(
			'disabled',
		);
		expect(generated['menubar']['caps']['CapsMenubarTrigger'].selector).toBe('button[capsMenubarTrigger]');
		expect(Object.keys(menu)).not.toEqual(expect.arrayContaining(['CapsMenuCdk', 'CapsMenuSelection']));
	});
	it('documents native Table and router-free Pagination public contracts', () => {
		const generated = readGeneratedJson() as NestedStructure;
		const table = generated['table']['caps'];
		expect(table['CapsTable'].selector).toBe('table[capsTable]');
		expect(table['CapsTableContainer'].selector).toBe('caps-table-container');
		expect(table['CapsTable'].inputs.map(({ name }) => name)).toEqual(['size', 'striped', 'noBorder']);
		const pagination = generated['pagination']['caps'];
		for (const name of ['CapsPaginationLink', 'CapsPaginationPrevious', 'CapsPaginationNext']) {
			expect(pagination[name].inputs.map(({ name }) => name)).toEqual(expect.arrayContaining(['isActive', 'disabled']));
			expect(pagination[name].inputs.map(({ name }) => name)).not.toContain('routerLink');
		}
		expect(pagination['CapsNumberedPagination'].models.map(({ name }) => name)).toEqual([
			'currentPage',
			'itemsPerPage',
		]);
	});
	it('documents the Capsule chart engine contract as one required options input', () => {
		const chart = (readGeneratedJson() as NestedStructure)['chart']['caps']['CapsChart'];
		expect(chart.selector).toBe('caps-chart');
		expect(chart.inputs).toContainEqual(
			expect.objectContaining({
				name: 'options',
				type: 'ChartOptions<TDatum, TXValue, TYValue>',
				required: true,
			}),
		);
		expect(chart.outputs).toEqual([]);
		expect(chart.models).toEqual([]);
	});
	it('documents the projected Carousel and native navigation contracts', () => {
		const generated = readGeneratedJson() as NestedStructure;
		const carousel = generated['carousel']['caps'];
		expect(carousel['CapsCarousel'].selector).toBe('caps-carousel');
		expect(carousel['CapsCarousel'].inputs.map(({ name }) => name)).toEqual([
			'orientation',
			'options',
			'plugins',
			'aria-label',
		]);
		expect(carousel['CapsCarouselContent'].selector).toBe('caps-carousel-content');
		expect(carousel['CapsCarouselItem'].inputs.map(({ name }) => name)).toEqual(['aria-label', 'aria-labelledby']);
		for (const name of ['Previous', 'Next', 'Autoplay']) {
			expect(carousel[`CapsCarousel${name}`].selector).toBe(`button[capsCarousel${name}]`);
		}
		expect(carousel['CapsCarouselSlideDisplay'].inputs.map(({ name }) => name)).toEqual(['slideClass', 'label']);
	});
});

describe('Capsule conversation API metadata', () => {
	it('documents public structural and native forms, states and independent action inputs', () => {
		const docs = readGeneratedJson() as NestedStructure;
		expect(docs['bubble']['caps']['CapsBubble'].inputs).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'variant', defaultValue: "'default'" }),
				expect.objectContaining({ name: 'align', defaultValue: "'start'" }),
			]),
		);
		expect(docs['bubble']['caps']['CapsBubbleContent'].selector).toBe('caps-bubble-content');
		expect(docs['bubble']['caps']['CapsBubbleContentDirective'].selector).toBe(
			'button[capsBubbleContent], a[capsBubbleContent]',
		);
		expect(docs['message']['caps']['CapsMessage'].selector).toBe('caps-message');
		expect(docs['attachment']['caps']['CapsAttachment'].inputs.map((item) => item.name)).toEqual(
			expect.arrayContaining(['state', 'size', 'orientation']),
		);
		expect(docs['attachment']['caps']['CapsAttachmentAction'].inputs.map((item) => item.name)).toEqual(
			expect.arrayContaining(['type', 'variant', 'size', 'disabled']),
		);
		for (const family of ['bubble', 'message', 'attachment'])
			for (const component of Object.values(docs[family]['caps'])) expect(component.outputs).toHaveLength(0);
	});
});
