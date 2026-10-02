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
});
