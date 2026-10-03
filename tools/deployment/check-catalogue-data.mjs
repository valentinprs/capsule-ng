import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Exercise the deployed function without a static file server, just like Vercel's runtime.
// A prerendered page can contain valid snippets while client navigation receives fallback HTML.
const { default: handler } = await import(
	pathToFileURL(resolve('.vercel/output/functions/__fallback.func/index.mjs')).href
);
const server = createServer(handler);
await new Promise((resolve, reject) => {
	server.once('error', reject);
	server.listen(0, '127.0.0.1', resolve);
});

try {
	const origin = `http://127.0.0.1:${server.address().port}`;
	for (const slug of ['button', 'dialog', 'alert-dialog', 'breadcrumb']) {
		const response = await fetch(`${origin}/api/_analog/pages/(components)/components/(${slug})/${slug}`, {
			signal: AbortSignal.timeout(10000),
		});
		assert.equal(response.status, 200, `${slug}: loader status`);
		const { primitivesData, docsData } = await response.json();
		assert.equal(typeof primitivesData?.[slug]?.default, 'string', `${slug}: missing default snippet`);
		assert.ok(primitivesData[slug].default.trim().length > 0, `${slug}: empty default snippet`);
		assert.ok(docsData?.[slug]?.caps, `${slug}: missing Capsule API`);
		if (slug === 'breadcrumb') assert.ok(docsData.breadcrumb.caps.CapsLink, 'breadcrumb: missing related Link API');
		console.log(`${slug}: snippets and API available from the server function`);
	}
} finally {
	await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
