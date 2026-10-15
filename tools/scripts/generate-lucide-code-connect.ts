/**
 * Generates `code-connect/icons/lucide.figma.batch.json`: one Code Connect entry per icon
 * component of the Lucide Icons Figma file that has an export in the installed `@ng-icons/lucide`.
 * Every entry is rendered by the shared `lucide-icon.figma.batch.ts` template.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<token> node tools/scripts/generate-lucide-code-connect.ts
 *   node tools/scripts/generate-lucide-code-connect.ts --components <file.json>
 *
 * `--components` reads a `[{ "id": "1:254", "name": "a-arrow-down" }]` list instead of calling
 * the Figma REST API.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FIGMA_FILE_KEY = 'QC8Ma0R5wWEDmofetaVHel';
const FIGMA_FILE_URL = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Lucide-Icons`;
const OUTPUT = resolve(import.meta.dirname, '../../code-connect/icons/lucide.figma.batch.json');

type FigmaComponent = { id: string; name: string };
type FigmaNode = { id: string; name: string; type: string; children?: FigmaNode[] };

async function fetchFigmaComponents(): Promise<FigmaComponent[]> {
	const token = process.env['FIGMA_ACCESS_TOKEN'];
	if (!token) {
		throw new Error('Set FIGMA_ACCESS_TOKEN or pass --components <file.json>.');
	}
	const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`, {
		headers: { 'X-Figma-Token': token },
	});
	if (!response.ok) {
		throw new Error(`Figma API responded ${response.status}: ${await response.text()}`);
	}
	const { document } = (await response.json()) as { document: FigmaNode };
	const components: FigmaComponent[] = [];
	const walk = (node: FigmaNode) => {
		if (node.type === 'COMPONENT') {
			components.push({ id: node.id, name: node.name });
		}
		node.children?.forEach(walk);
	};
	walk(document);
	return components;
}

/** Figma names are kebab-case (`grid-2x2`); exports are `lucide` + PascalCase (`lucideGrid2x2`). */
const normalize = (name: string) =>
	name
		.replace(/^lucide/, '')
		.replace(/-/g, '')
		.toLowerCase();

async function main() {
	const componentsArg = process.argv.indexOf('--components');
	const components: FigmaComponent[] =
		componentsArg === -1
			? await fetchFigmaComponents()
			: JSON.parse(readFileSync(process.argv[componentsArg + 1], 'utf-8'));

	const exportsByName = new Map(
		Object.keys(await import('@ng-icons/lucide')).map((exportName) => [normalize(exportName), exportName]),
	);

	const entries: { url: string; component: string }[] = [];
	const unmatched: string[] = [];
	for (const { id, name } of components) {
		const exportName = exportsByName.get(normalize(name));
		if (exportName) {
			entries.push({ url: `${FIGMA_FILE_URL}?node-id=${id.replace(':', '-')}`, component: exportName });
		} else {
			unmatched.push(name);
		}
	}
	entries.sort((a, b) => a.component.localeCompare(b.component) || a.url.localeCompare(b.url));

	const batch = { templateFile: './lucide-icon.figma.batch.ts', components: entries };
	writeFileSync(OUTPUT, `${JSON.stringify(batch, null, '\t')}\n`);

	console.log(`Wrote ${entries.length} icons to ${OUTPUT}`);
	if (unmatched.length > 0) {
		console.log(`${unmatched.length} Figma icons have no @ng-icons/lucide export:`);
		console.log(unmatched.sort().join(', '));
	}
}

await main();
