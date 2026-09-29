import { type Tree, formatFiles, joinPathFragments, logger } from '@nx/devkit';
import ts from 'typescript';
import { writePerComponentData } from '../../write-per-component-data';
import { getVariableNameFromFilename } from './getVarNameFromFileName';

function readFileAsSourceFile(tree: Tree, filePath: string): ts.SourceFile | null {
	const content = tree.read(filePath, 'utf-8');
	if (!content) {
		logger.warn(`File not found: ${filePath}`);
		return null;
	}

	return ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
}

function shouldSkipNode(node: ts.Node, sourceFile: ts.SourceFile): boolean {
	const nodeText = node.getFullText(sourceFile);

	return (
		nodeText.includes('export const defaultSkeleton =') ||
		nodeText.includes('export const defaultStyles =') ||
		nodeText.includes('export const defaultCode =') ||
		nodeText.includes('export const defaultImports =')
	);
}

function extractCleanCodeFromSourceFile(sourceFile: ts.SourceFile): string {
	let cleanContent = '';

	// Use AST to properly traverse and filter nodes
	ts.forEachChild(sourceFile, (node) => {
		if (shouldSkipNode(node, sourceFile)) {
			return; // Skip this node - it's an export we don't want
		}

		// Keep this node - add its text to our clean content
		cleanContent += node.getFullText(sourceFile);
	});

	return cleanContent.trim();
}

/** Key under which the full preview file is kept when the `default` snippet is template-only. */
export const DEFAULT_SOURCE_KEY = 'defaultSource';

/** Removes the common leading indentation (and surrounding blank lines) from a block of text. */
export function dedent(text: string): string {
	const lines = text.replace(/\r\n/g, '\n').split('\n');
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

	const indents = lines.filter((line) => line.trim()).map((line) => /^[ \t]*/.exec(line)?.[0].length ?? 0);
	const common = indents.length ? Math.min(...indents) : 0;

	return lines
		.map((line) => line.slice(Math.min(common, /^[ \t]*/.exec(line)?.[0].length ?? 0)))
		.join('\n')
		.trim();
}

/** `const x = '...'` / `` const x = `...` `` - docs strings some previews export for their page. */
function isStringConstant(stmt: ts.Statement): boolean {
	return (
		ts.isVariableStatement(stmt) &&
		stmt.declarationList.declarations.every(
			(decl) =>
				!!decl.initializer &&
				(ts.isStringLiteral(decl.initializer) || ts.isNoSubstitutionTemplateLiteral(decl.initializer)),
		)
	);
}

function getComponentDecoratorArg(node: ts.ClassDeclaration): ts.ObjectLiteralExpression | null {
	for (const decorator of ts.getDecorators(node) ?? []) {
		const call = decorator.expression;
		if (
			ts.isCallExpression(call) &&
			ts.isIdentifier(call.expression) &&
			call.expression.text === 'Component' &&
			call.arguments.length === 1 &&
			ts.isObjectLiteralExpression(call.arguments[0])
		) {
			return call.arguments[0];
		}
	}
	return null;
}

/**
 * Returns the dedented inline template of a preview file when showing only the markup loses
 * nothing: besides imports (and docs string constants), the file holds a single `@Component` class
 * with an empty body, whose `template` is a plain template literal (no `${}` substitutions).
 * Otherwise returns null so the caller falls back to the full file.
 */
export function extractTemplateOnlySnippet(sourceFile: ts.SourceFile): string | null {
	let componentClass: ts.ClassDeclaration | null = null;

	for (const stmt of sourceFile.statements) {
		if (ts.isImportDeclaration(stmt) || shouldSkipNode(stmt, sourceFile) || isStringConstant(stmt)) continue;
		if (ts.isClassDeclaration(stmt) && !componentClass) {
			componentClass = stmt;
			continue;
		}
		// Anything else (helper consts, extra components, ...) would be hidden by a template-only snippet.
		return null;
	}

	if (!componentClass || componentClass.members.length > 0) return null;

	const metadata = getComponentDecoratorArg(componentClass);
	if (!metadata) return null;

	const templateProp = metadata.properties.find(
		(prop): prop is ts.PropertyAssignment =>
			ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'template',
	);
	if (!templateProp || !ts.isNoSubstitutionTemplateLiteral(templateProp.initializer)) return null;

	const template = dedent(templateProp.initializer.text);
	return template || null;
}

function getComponentDirectories(tree: Tree, basePath: string): string[] {
	if (!tree.exists(basePath)) {
		logger.warn(`Base components directory not found: ${basePath}`);
		return [];
	}

	return tree.children(basePath).filter((name) => {
		const fullPath = joinPathFragments(basePath, name);
		return tree.isFile(fullPath) === false; // Only directories
	});
}

function getExampleFiles(tree: Tree, primitiveDir: string): string[] {
	return tree
		.children(primitiveDir)
		.filter((fileName) => fileName.endsWith('.preview.ts') || fileName.endsWith('.example.ts'));
}

function processExampleFile(
	tree: Tree,
	primitiveDir: string,
	fileName: string,
	primitiveNameClean: string,
): { name: string; code: string; source?: string } | null {
	const filePath = joinPathFragments(primitiveDir, fileName);
	const sourceFile = readFileAsSourceFile(tree, filePath);

	if (!sourceFile) {
		return null;
	}

	// Use AST to extract clean code
	const cleanCode = extractCleanCodeFromSourceFile(sourceFile);

	if (!cleanCode || !cleanCode.includes('@Component')) {
		logger.warn(`No component found in: ${filePath}`);
		return null;
	}

	// Determine variable name based on filename
	const variableName = getVariableNameFromFilename(fileName, primitiveNameClean);

	// The main preview's Code tab only shows the markup when that is all there is to it; the full
	// file is kept alongside it.
	if (variableName === 'default' && fileName.endsWith('.preview.ts')) {
		const template = extractTemplateOnlySnippet(sourceFile);
		if (template) {
			return { name: variableName, code: template, source: cleanCode };
		}
	}

	return {
		name: variableName,
		code: cleanCode,
	};
}

function processPrimitive(tree: Tree, basePath: string, primitiveName: string): Record<string, string> | null {
	const primitiveNameClean = primitiveName.replaceAll('(', '').replaceAll(')', '');
	const primitiveDir = joinPathFragments(basePath, primitiveName);

	// Process the preview last so it owns the `default` key even if an example also maps to it
	// (e.g. `button--default.example.ts`).
	const exampleFiles = getExampleFiles(tree, primitiveDir).sort(
		(a, b) => Number(a.endsWith('.preview.ts')) - Number(b.endsWith('.preview.ts')),
	);
	if (exampleFiles.length === 0) {
		logger.info(`No example files found for ${primitiveName}. Skipping.`);
		return null;
	}

	const codeSnippets: Array<{ name: string; code: string; source?: string }> = [];

	// Process each example file using AST
	for (const fileName of exampleFiles) {
		const snippet = processExampleFile(tree, primitiveDir, fileName, primitiveNameClean);
		if (snippet) {
			codeSnippets.push(snippet);
		}
	}

	if (codeSnippets.length === 0) {
		logger.info(`No valid code snippets found for ${primitiveName}. Skipping.`);
		return null;
	}

	const snippetsMap: Record<string, string> = {};
	for (const snippet of codeSnippets) {
		snippetsMap[snippet.name] = snippet.code;
		if (snippet.source) snippetsMap[DEFAULT_SOURCE_KEY] = snippet.source;
	}
	return snippetsMap;
}

export async function extractPrimitiveCodeGenerator(tree: Tree): Promise<void> {
	logger.info('Extract Primitive Code generator running...');

	const componentsDir = 'apps/app/src/app/pages/(components)/components';
	const componentDirs = getComponentDirectories(tree, componentsDir);

	if (componentDirs.length === 0) {
		logger.info('No component directories found. Writing empty snippets file.');
	} else {
		logger.info(`Found ${componentDirs.length} component directories.`);
	}

	const allPrimitivesSnippets: Record<string, Record<string, string>> = {};

	// Process each primitive directory
	for (const primitiveName of componentDirs) {
		try {
			const snippets = processPrimitive(tree, componentsDir, primitiveName);
			if (snippets) {
				const primitiveNameClean = primitiveName.replaceAll('(', '').replaceAll(')', '');
				allPrimitivesSnippets[primitiveNameClean] = snippets;
			}
		} catch (error) {
			logger.error(`Failed to process ${primitiveName}: ${error}`);
			// Continue with other primitives even if one fails
		}
	}

	const outputDir = 'apps/app/src/public/data/primitives-snippets';
	writePerComponentData(allPrimitivesSnippets, outputDir, (filePath, content) => tree.write(filePath, content));
	logger.info(`Generated primitives snippets at: ${outputDir}`);

	await formatFiles(tree);
	logger.info('Code generation complete!');
}

export default extractPrimitiveCodeGenerator;
