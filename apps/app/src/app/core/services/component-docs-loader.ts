import { useStorage } from 'nitropack/runtime';
import type { PrimitiveSnippets } from '../models/primitives-snippets.model';
import type { ComponentApiData, Primitives } from '../models/ui-docs.model';
import type { ComponentDocsData } from './component-docs';

// Read the data bundled by Nitro's `serverAssets` configuration. Relative $fetch calls stay
// inside the server function on Vercel, where public files are served separately by the CDN.
// Components without a particular data slice legitimately have no corresponding asset.
const sliceOrEmpty = async <T extends object>(key: string): Promise<T> =>
	(await useStorage('assets:data').getItem<T>(key)) ?? ({} as T);

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
		sliceOrEmpty<ComponentApiData>(`ui-api/${slug}.json`),
		sliceOrEmpty<PrimitiveSnippets>(`primitives-snippets/${slug}.json`),
		Promise.all(capsApiFrom.map((related) => sliceOrEmpty<ComponentApiData>(`ui-api/${related}.json`))),
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
