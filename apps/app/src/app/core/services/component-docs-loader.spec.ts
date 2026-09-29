import { loadComponentDocs } from './component-docs-loader';

const capsEntry = (selector: string) => ({ file: '', inputs: [], outputs: [], models: [], selector });

const files: Record<string, unknown> = {
	'/data/ui-api/breadcrumb.json': {
		breadcrumb: {
			caps: { CapsBreadcrumb: capsEntry('caps-breadcrumb') },
			helm: { HlmBreadcrumb: capsEntry('[hlmBreadcrumb]') },
		},
	},
	'/data/ui-api/link.json': { link: { caps: { CapsLink: capsEntry('a[capsLink]') } } },
	'/data/stackblitz-meta.json': {},
	'/data/manual-install-snippets/utils.json': {},
};

describe('loadComponentDocs', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'$fetch',
			vi.fn(async (url: string) => {
				if (url in files) return files[url];
				throw { statusCode: 404 };
			}),
		);
	});

	afterEach(() => vi.unstubAllGlobals());

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
