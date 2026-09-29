import { TestBed } from '@angular/core/testing';
import type { PrimitiveSnippets } from '../models/primitives-snippets.model';
import { PrimitiveSnippetsService } from './primitive-snippets.service';

describe('PrimitiveSnippetsService', () => {
	const fullSource = `import { Component } from '@angular/core';\n@Component({ template: \`<button>Button</button>\` })\nexport class ButtonPreview {}`;
	let service: PrimitiveSnippetsService;

	beforeEach(() => {
		service = TestBed.inject(PrimitiveSnippetsService);
		service.setSnippets({
			button: { default: '<button>Button</button>', defaultSource: fullSource, outline: 'outline source' },
			accordion: { default: 'full accordion source' },
		} as unknown as PrimitiveSnippets);
	});

	it('should resolve the full preview file of a template-only default snippet', () => {
		expect(service.getPreviewSource('<button>Button</button>')).toBe(fullSource);
	});

	it('should return null for snippets that are already full files', () => {
		expect(service.getPreviewSource('full accordion source')).toBeNull();
		expect(service.getPreviewSource('outline source')).toBeNull();
		expect(service.getPreviewSource(null)).toBeNull();
	});
});
