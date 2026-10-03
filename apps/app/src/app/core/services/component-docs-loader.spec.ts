import { loadComponentDocs } from './component-docs-loader';

const storage = vi.hoisted(() => ({ getItem: vi.fn() }));
vi.mock('nitropack/runtime', () => ({ useStorage: () => storage }));

const capsEntry = (selector: string) => ({ file: '', inputs: [], outputs: [], models: [], selector });

const files: Record<string, unknown> = {
	'ui-api/breadcrumb.json': {
		breadcrumb: {
			caps: { CapsBreadcrumb: capsEntry('caps-breadcrumb') },
			helm: { HlmBreadcrumb: capsEntry('[hlmBreadcrumb]') },
		},
	},
	'ui-api/link.json': { link: { caps: { CapsLink: capsEntry('a[capsLink]') } } },
};

describe('loadComponentDocs', () => {
	beforeEach(() => {
		storage.getItem.mockImplementation(async (key: string) => files[key] ?? null);
	});

	afterEach(() => vi.unstubAllGlobals());

	it('loads bundled snippets when HTTP asset requests resolve to the deployed fallback page', async () => {
		const snippets = { button: { default: '<button capsButton>Button</button>' } };
		vi.stubGlobal('$fetch', vi.fn().mockResolvedValue('<!DOCTYPE html><title>Page not found</title>'));
		storage.getItem.mockImplementation(async (key: string) =>
			key === 'primitives-snippets/button.json' ? snippets : null,
		);

		const result = await loadComponentDocs('button');

		expect(result.primitivesData).toEqual(snippets);
		expect(result.docsData).toEqual({});
	});

	it('propagates storage failures instead of silently returning empty docs', async () => {
		storage.getItem.mockRejectedValue(new Error('Unreadable asset'));

		await expect(loadComponentDocs('button')).rejects.toThrow('Unreadable asset');
	});

	it('keeps the component slice as is by default', async () => {
		const { docsData } = await loadComponentDocs('breadcrumb');

		expect(Object.keys(docsData.breadcrumb.caps ?? {})).toEqual(['CapsBreadcrumb']);
		expect(Object.keys(docsData.breadcrumb.helm ?? {})).toEqual(['HlmBreadcrumb']);
	});

	it('documents the caps API of the related entry points on the component page', async () => {
		const { docsData } = await loadComponentDocs('breadcrumb', { capsApiFrom: ['link'] });

		expect(Object.keys(docsData.breadcrumb.caps ?? {})).toEqual(['CapsBreadcrumb', 'CapsLink']);
		expect(Object.keys(docsData.breadcrumb.helm ?? {})).toEqual(['HlmBreadcrumb']);
	});

	it('ignores related entry points that have no caps API yet', async () => {
		const { docsData } = await loadComponentDocs('breadcrumb', { capsApiFrom: ['button'] });

		expect(Object.keys(docsData.breadcrumb.caps ?? {})).toEqual(['CapsBreadcrumb']);
	});
});
