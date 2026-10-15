import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';
describe('Command and Kbd public API metadata', () => {
	it('documents search/filter/disabled and native activation rather than exposing internal adapters', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/command.json'), 'utf8'),
		) as NestedStructure;
		const caps = docs['command']['caps'];
		expect(caps['CapsCommand'].selector).toBe('caps-command');
		expect(caps['CapsCommand'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['id', 'filter', 'search', 'disabled']),
		);
		expect(caps['CapsCommand'].inputs.map((i) => i.name)).not.toContain('class');
		expect(caps['CapsCommand'].outputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['searchChange', 'valueChange']),
		);
		expect(caps['CapsCommandItem'].selector).toBe('button[capsCommandItem]');
		expect(caps['CapsCommandItem'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['value', 'disabled', 'id']),
		);
		expect(caps['CapsCommandItem'].outputs.map((i) => i.name)).toContain('selected');
		expect(caps['CapsCommandInputControl'].selector).toBe('input[capsCommandInput]');
		expect(caps['CapsCommandInput'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['inputId', 'placeholder', 'aria-label']),
		);
		expect(caps['CapsCommandGroup'].inputs.map((i) => i.name)).toContain('label');
		expect(caps['CapsCommandDialog'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['title', 'description', 'showCloseButton', 'dialogContentClass']),
		);
		expect(caps['CapsCommandDialog'].models).toContainEqual(
			expect.objectContaining({ name: 'open', type: 'boolean', defaultValue: 'false' }),
		);
		expect(caps['CapsCommandDialog'].inputs).toContainEqual(
			expect.objectContaining({ name: 'dialogContentClass', type: 'ClassValue' }),
		);
	});
	it('documents native kbd and structural groups without shortcut inputs', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/kbd.json'), 'utf8'),
		) as NestedStructure;
		expect(docs['kbd']['caps']['CapsKbd'].selector).toBe('kbd[capsKbd]');
		expect(docs['kbd']['caps']['CapsKbdGroup'].selector).toBe('caps-kbd-group');
		expect(docs['kbd']['caps']['CapsKbd'].outputs).toEqual([]);
	});
});
