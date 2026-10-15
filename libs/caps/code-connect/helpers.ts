// Shared helpers for the component templates. The Code Connect CLI bundles relative imports into
// each template at publish time.
import figma, { type InstanceHandle, type ResultSection, type TemplateStringResult } from 'figma';

/** A line of a snippet: plain markup or the example of a nested template. */
export type Part = string | TemplateStringResult | ResultSection[];

export type Icon = { markup: string; name: string | null };

/**
 * Resolves the icon placed in an instance-swap property. Lucide icons are connected by
 * `code-connect/icons/lucide-icon.figma.batch.ts` (repository root), whose template id is the `@ng-icons/lucide` export name.
 */
export function icon(owner: InstanceHandle, swapProp: string, attributes = ''): Icon {
	const swapped = owner.getInstanceSwap(swapProp);
	const name = swapped?.type === 'INSTANCE' ? swapped.codeConnectId() : null;
	const markup = name
		? `<ng-icon name="${name}"${attributes} />`
		: `<!-- ${swapped?.type === 'INSTANCE' ? swapped.name : 'icon'} has no Code Connect -->`;
	return { markup, name };
}

/** Imports for the `<ng-icon>` elements of a snippet. */
export function iconImports(icons: Icon[]): string[] {
	const names = [...new Set(icons.map((i) => i.name).filter((name): name is string => name !== null))];
	return names.length === 0
		? []
		: [
				"import { NgIcon, provideIcons } from '@ng-icons/core';",
				`import { ${names.join(', ')} } from '@ng-icons/lucide';`,
			];
}

/**
 * The `Show left icon` / `⮑ Left icon` / `Label` / `Show right icon` / `⮑ Right icon` properties
 * shared by Button, Button Group Button and Toggle Button. `dataIcon` adds the
 * `data-icon="inline-start|inline-end"` hooks that `capsButton` uses to adjust its padding.
 */
export function labelWithIcons(owner: InstanceHandle, dataIcon: boolean): { children: string[]; icons: Icon[] } {
	const icons: Icon[] = [];
	const side = (show: string, swap: string, position: string) => {
		if (!owner.getBoolean(show)) {
			return null;
		}
		const resolved = icon(owner, swap, dataIcon ? ` data-icon="${position}"` : '');
		icons.push(resolved);
		return resolved.markup;
	};
	const left = side('Show left icon', '⮑ Left icon', 'inline-start');
	const label = owner.getString('Label');
	const right = side('Show right icon', '⮑ Right icon', 'inline-end');
	return { children: [left, label, right].filter((child): child is string => child !== null), icons };
}

/** An element with one child per line; empty and `null` children are dropped. */
export function element(open: string, children: (string | null)[], close: string): string {
	const lines = children.filter((child): child is string => child !== null && child !== '');
	return lines.length === 0 ? `${open}${close}` : `${open}\n\t${lines.join('\n\t')}\n${close}`;
}

/** Button sizes for components that render `button[capsButton]` with a text label. */
export const buttonSize = { Default: '', 'Extra small': ' size="xs"', Small: ' size="sm"', Large: ' size="lg"' };

/** Button sizes for icon-only `button[capsButton]`. */
export const iconButtonSize = {
	Default: ' size="icon"',
	'Extra small': ' size="icon-xs"',
	Small: ' size="icon-sm"',
	Large: ' size="icon-lg"',
};

export const disabled = { True: ' disabled', False: '' };

/**
 * A `button[capsTabsTrigger]` for the Tab → Segmented and Tab → Line components. Not mapped:
 * `Active` (the selected tab is the `value` of the parent `caps-tabs`), `Size` and the counter
 * (no equivalent in code), and `State` (CSS states). The tab style is the `type` of the parent
 * `caps-tabs-list`.
 */
export function tabTrigger(tab: InstanceHandle): { snippet: string; icons: Icon[] } {
	const label = tab.getString('Label');
	const value = label.toLowerCase().trim().replace(/\s+/g, '-');
	const glyph = icon(tab, 'Icon');
	const content = tab.getEnum('Content', { Label: 'label', Icon: 'icon', 'Icon + label': 'both' });
	const disabledAttribute = tab.getEnum('Disabled', disabled);
	// An icon-only tab needs an accessible name.
	const open =
		content === 'icon'
			? `<button capsTabsTrigger value="${value}"${disabledAttribute} aria-label="${label}">`
			: `<button capsTabsTrigger value="${value}"${disabledAttribute}>`;
	const children = [content === 'label' ? null : glyph.markup, content === 'icon' ? null : label];
	return { snippet: element(open, children, '</button>'), icons: content === 'label' ? [] : [glyph] };
}

/** Slider Horizontal / Vertical. Values approximate the Figma variants (Range = two thumbs). */
export function slider(owner: InstanceHandle, orientation: 'horizontal' | 'vertical'): string {
	const value = owner.getEnum('Type', { Default: '[50]', 'Range narrow': '[35, 65]', 'Range wide': '[20, 80]' });
	const vertical = orientation === 'vertical' ? ' orientation="vertical"' : '';
	return `<caps-slider aria-label="" [value]="${value}"${vertical}${owner.getEnum('Disabled', disabled)} />`;
}

/**
 * Tabs → Segmented / Line: `caps-tabs` with the triggers of the slot, rendered by their own
 * templates, and one content panel per tab. The selected tab is the active trigger. `Size` has no
 * equivalent in code.
 */
export function tabs(owner: InstanceHandle, type: 'contained' | 'line') {
	const triggers = owner.getSlot('Slot')?.connectedInstances ?? [];
	const values = triggers.map((trigger) => trigger.getString('Label').toLowerCase().trim().replace(/\s+/g, '-'));
	const active = triggers.findIndex((trigger) => trigger.getEnum('Active', { True: true, False: false }));
	const list = triggers.reduce(
		(code, trigger) => figma.code`${code}\n\t\t${trigger.executeTemplate().example}`,
		figma.code``,
	);
	const panels = values.map((value) => `\n\t<caps-tabs-content value="${value}"></caps-tabs-content>`).join('');
	return figma.code`<caps-tabs value="${values[active] ?? values[0] ?? ''}">
	<caps-tabs-list aria-label=""${type === 'line' ? ' type="line"' : ''}>${list}
	</caps-tabs-list>${panels}
</caps-tabs>`;
}

/** Avatar sizes; Figma's Default is the code default. */
export const avatarSize = { Default: '', Small: ' size="sm"', Large: ' size="lg"' };

/** Joins nested snippets, one per line, at the given indentation. */
export function lines(parts: Part[], indent: string): TemplateStringResult {
	return parts.reduce<TemplateStringResult>((code, part) => figma.code`${code}\n${indent}${part}`, figma.code``);
}

/** The snippets of the connected instances placed in a slot, rendered by their own templates. */
export function slotContent(owner: InstanceHandle, slot: string): Part[] {
	return (owner.getSlot(slot)?.connectedInstances ?? []).map((item) => item.executeTemplate().example);
}

/** A template reference variable derived from a label, e.g. `File` → `fileMenu`. */
export function templateRef(label: string, suffix = 'Menu'): string {
	const words = label
		.trim()
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean);
	const camel = words.map((word, i) => (i === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1))).join('');
	return `${camel || 'item'}${suffix}`;
}

/** The label of a Capsule Button instance, or a fallback. */
export function buttonLabel(button: InstanceHandle | undefined, fallback: string): string {
	return button?.type === 'INSTANCE' && button.hasCodeConnect() ? button.getString('Label') : fallback;
}

/** The connected content of an overlay slot, or a placeholder comment. */
export function overlayBody(owner: InstanceHandle, slot: string, indent: string): Part {
	const content = slotContent(owner, slot);
	return content.length === 0 ? `\n${indent}<!-- content -->` : lines(content, indent);
}

/** Re-indents a nested snippet (the example of another template) so that it lines up at `indent`. */
export function indented(part: Part, indent: string): Part {
	const shift = (sections: ResultSection[]): ResultSection[] =>
		sections.map((section) => {
			if (section.type === 'CODE') {
				return { ...section, code: section.code.replace(/\n/g, `\n${indent}`) };
			}
			if (section.type === 'INSTANCE' && section.resultSections) {
				return { ...section, resultSections: shift(section.resultSections) };
			}
			return section;
		});
	if (typeof part === 'string') {
		return part.replace(/\n/g, `\n${indent}`);
	}
	return Array.isArray(part) ? shift(part) : { ...part, sections: shift(part.sections) };
}

/** Nested snippets, one per line at `indent`, each re-indented. */
export function nested(parts: Part[], indent: string): TemplateStringResult {
	return lines(
		parts.map((part) => indented(part, indent)),
		indent,
	);
}
