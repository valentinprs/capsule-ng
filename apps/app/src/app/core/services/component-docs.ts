import { injectLoad } from '@analogjs/router';
import { inject, Injector, runInInjectionContext } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { PrimitiveSnippets } from '../models/primitives-snippets.model';
import type { ComponentApiData } from '../models/ui-docs.model';
import { ApiDocsService } from './api-docs.service';
import { PrimitiveSnippetsService } from './primitive-snippets.service';

// Docs payload for a single component, loaded by each page's sibling `.server.ts`.
export type ComponentDocsData = {
	docsData: ComponentApiData;
	primitivesData: PrimitiveSnippets;
};

// Signature of a component page's `.server.ts` `load`.
export type ComponentDocsLoad = () => Promise<ComponentDocsData>;

// Pushes a component page's loaded docs slice into the shared docs services. Call from an injection
// context, or pass an `injector` to run it outside one.
export function injectComponentDocs(injector?: Injector): void {
	runInInjectionContext(injector ?? inject(Injector), () => {
		const data = toSignal(injectLoad<ComponentDocsLoad>(), { requireSync: true });
		const { docsData, primitivesData } = data();
		inject(ApiDocsService).setApiDocs(docsData);
		inject(PrimitiveSnippetsService).setSnippets(primitivesData);
	});
}
