// ng-packagr only accepts assets inside its project root. Stage the canonical CSS unchanged.
import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../../libs/styles/src/', import.meta.url);
const destination = new URL('../../libs/caps/.generated/styles/', import.meta.url);
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const name of await readdir(source)) {
	if (name.endsWith('.css')) {
		await copyFile(new URL(name, source), new URL(name, destination));
	}
}
console.log(`Staged shared styles in ${fileURLToPath(destination)}`);
