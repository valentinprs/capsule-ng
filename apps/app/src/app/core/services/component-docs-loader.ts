import type { PrimitiveSnippets } from '../models/primitives-snippets.model';
import type { ComponentApiData } from '../models/ui-docs.model';
import type { ComponentDocsData } from './component-docs';

// A per-slug file only exists for components that have that kind of data (e.g. data-table has no
// ui-api), so a 404 is treated as empty; any other error is a real failure and propagates.
const sliceOrEmpty = <T extends object>(url: string): Promise<T> =>
	$fetch<T>(url).catch((error) => {
		if (error?.statusCode === 404) return {} as T;
		throw error;
	});

// Loads one component's docs slice from the per-slug data files.
export const loadComponentDocs = async (slug: string): Promise<ComponentDocsData> => {
	const [docsData, primitivesData] = await Promise.all([
		sliceOrEmpty<ComponentApiData>(`/data/ui-api/${slug}.json`),
		sliceOrEmpty<PrimitiveSnippets>(`/data/primitives-snippets/${slug}.json`),
	]);
	return { docsData, primitivesData };
};
