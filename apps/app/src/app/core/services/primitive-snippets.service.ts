import { Injectable, computed, signal } from '@angular/core';
import type { PrimitiveSnippet, PrimitiveSnippets } from '../models/primitives-snippets.model';

/**
 * Key the snippets generator stores the full preview file under when the `default` snippet only
 * holds the preview's template (see libs/tools/.../generate-primitive-snippets).
 */
const DEFAULT_SOURCE_KEY = 'defaultSource';

@Injectable({
	providedIn: 'root',
})
export class PrimitiveSnippetsService {
	private readonly _snippets = signal<PrimitiveSnippets | null>(null);

	setSnippets(data: PrimitiveSnippets): void {
		this._snippets.set(data);
	}

	getSnippets(component: PrimitiveSnippet) {
		return computed(() => this._snippets()?.[component] ?? {});
	}

	/**
	 * When `code` is a template-only `default` (main preview) snippet, returns the full preview file
	 * it was extracted from; otherwise null.
	 */
	getPreviewSource(code: string | null | undefined): string | null {
		if (!code) return null;
		for (const snippets of Object.values(this._snippets() ?? {})) {
			const source = snippets?.[DEFAULT_SOURCE_KEY];
			if (source && snippets['default'] === code) return source;
		}
		return null;
	}
}
