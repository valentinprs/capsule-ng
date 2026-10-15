// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-30848
// source=libs/caps/breadcrumb/src/lib/caps-breadcrumb-item.ts
// component=CapsBreadcrumbItem
import figma from 'figma';
import { icon, iconImports } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// Separators are rendered by the items themselves, and the last item is the current page by
// default, so `State=Active` is an item without `href`. `Hover` is a CSS state.
const label = item.getString('⮑ Label');
const href = item.getEnum('State', { Default: ' href=""', Hover: ' href=""', Active: '' });
const content = item.getEnum('Content', { Label: 'label', Icon: 'icon' });
const glyph = icon(item, 'Icon');
const imports = ["import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';"];

function snippet(): string {
	if (content === 'icon') {
		// The ellipsis stands for collapsed items.
		const ellipsis = glyph.name === 'lucideEllipsis' ? '<caps-breadcrumb-ellipsis />' : glyph.markup;
		if (glyph.name !== 'lucideEllipsis') {
			imports.push(...iconImports([glyph]));
		}
		return `<caps-breadcrumb-item>\n\t${ellipsis}\n</caps-breadcrumb-item>`;
	}
	if (item.getBoolean('Show dropdown menu')) {
		// Same pattern as the breadcrumb dropdown example: a ghost button opening a `caps-menu`.
		imports.push(
			"import { CapsButtonImports } from '@capsule-ng/caps/button';",
			"import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';",
			"import { CapsMenuImports } from '@capsule-ng/caps/menu';",
			"import { NgIcon, provideIcons } from '@ng-icons/core';",
			"import { lucideChevronDown } from '@ng-icons/lucide';",
		);
		return `<caps-breadcrumb-item>
	<button capsButton variant="ghost" size="sm" [capsDropdownMenuTrigger]="menu">
		${label}
		<ng-icon name="lucideChevronDown" data-icon="inline-end" />
	</button>
	<ng-template #menu>
		<caps-menu></caps-menu>
	</ng-template>
</caps-breadcrumb-item>`;
	}
	return `<caps-breadcrumb-item${href}>${label}</caps-breadcrumb-item>`;
}

const example = snippet();

export default {
	example: figma.code`${example}`,
	imports,
	id: 'caps-breadcrumb-item',
};
