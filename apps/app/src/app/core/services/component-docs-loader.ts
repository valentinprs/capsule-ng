import type { PrimitiveSnippets } from '../models/primitives-snippets.model';
import type { ComponentApiData, Primitives } from '../models/ui-docs.model';
import type { ComponentDocsData } from './component-docs';

// A per-slug file only exists for components that have that kind of data (e.g. data-table has no
// ui-api), so a 404 is treated as empty; any other error is a real failure and propagates.
const sliceOrEmpty = <T extends object>(url: string): Promise<T> =>
	$fetch<T>(url).catch((error) => {
		if (error?.statusCode === 404) return {} as T;
		throw error;
	});

export type LoadComponentDocsOptions = {
	// Slugs of other `caps` entry points whose API is documented on this component's page, e.g. the
	// `capsLink` directive (`link`) used inside the breadcrumb.
	capsApiFrom?: string[];
};

// Loads one component's docs slice from the per-slug data files.
export const loadComponentDocs = async (
	slug: string,
	{ capsApiFrom = [] }: LoadComponentDocsOptions = {},
): Promise<ComponentDocsData> => {
	const [docsData, primitivesData, relatedDocs] = await Promise.all([
		sliceOrEmpty<ComponentApiData>(`/data/ui-api/${slug}.json`),
		sliceOrEmpty<PrimitiveSnippets>(`/data/primitives-snippets/${slug}.json`),
		Promise.all(capsApiFrom.map((related) => sliceOrEmpty<ComponentApiData>(`/data/ui-api/${related}.json`))),
	]);
	return { docsData: withCapsApiFrom(docsData, slug, capsApiFrom, relatedDocs), primitivesData };
};

// Appends the related entry points' `caps` components to the component's own `caps` API.
const withCapsApiFrom = (
	docsData: ComponentApiData,
	slug: string,
	capsApiFrom: string[],
	relatedDocs: ComponentApiData[],
): ComponentApiData => {
	if (!capsApiFrom.length) return docsData;

	const slices = docsData as Record<string, ComponentApiData[Primitives]>;
	const caps = Object.assign(
		{},
		slices[slug]?.caps,
		...relatedDocs.map((related, index) => (related as typeof slices)[capsApiFrom[index]]?.caps),
	);
	return { ...docsData, [slug]: { ...slices[slug], caps } };
};
