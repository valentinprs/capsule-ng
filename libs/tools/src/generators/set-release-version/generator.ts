import { formatFiles, type Tree, updateJson } from '@nx/devkit';
import process from 'node:process';

// semantic-release computes one version; we stamp it into the package.json of every lib we publish.
const PUBLISHABLE_PACKAGE_JSONS = ['libs/brain/package.json'];

export default async function setReleaseVersionGenerator(tree: Tree, options?: { newVersion?: string }): Promise<void> {
	const newVersion = options?.newVersion ?? process.env.VERSION;

	if (!newVersion) {
		throw new Error(
			'set-release-version: no version provided. Pass --newVersion=<version> (or --new-version=<version>) or set the VERSION environment variable.',
		);
	}

	for (const packageJsonPath of PUBLISHABLE_PACKAGE_JSONS) {
		updateJson(tree, packageJsonPath, (pkgJson) => {
			pkgJson.version = newVersion;
			return pkgJson;
		});
	}

	await formatFiles(tree);

	console.log(`Set brain version to ${newVersion}`);
}
