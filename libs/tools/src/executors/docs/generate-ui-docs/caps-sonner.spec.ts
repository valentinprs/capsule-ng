import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';

describe('Sonner public API metadata', () => {
	it('documents the Capsule container with exactly the documented Spartan inputs', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/sonner.json'), 'utf8'),
		) as NestedStructure;
		const caps = docs['sonner']['caps'];
		expect(Object.keys(caps)).toEqual(['CapsToaster']);
		expect(caps['CapsToaster'].selector).toBe('caps-toaster');
		expect(caps['CapsToaster'].inputs.map((i) => i.name).sort()).toEqual(
			[
				'invert',
				'position',
				'theme',
				'duration',
				'expand',
				'visibleToasts',
				'hotKey',
				'richColors',
				'toastOptions',
				'offset',
				'class',
				'style',
			].sort(),
		);
		expect(caps['CapsToaster'].inputs.find((i) => i.name === 'theme')?.defaultValue).toBe("'light'");
		expect(caps['CapsToaster'].outputs).toEqual([]);
	});
});
