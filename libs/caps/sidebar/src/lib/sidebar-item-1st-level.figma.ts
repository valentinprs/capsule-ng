// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-13506
// source=libs/caps/sidebar/src/lib/caps-sidebar-menu-item.ts
// component=CapsSidebarMenuItem
import figma from 'figma';
import { icon, iconImports, type Icon } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// `State=Active` / `Active Focus` is `isActive`; `Focus` is a CSS state. `Type`:
// - Expanded / Collapsed: a collapsible item (`caps-collapsible` with `[expanded]`) whose sub menu
//   receives the `Sidebar Item / Expanded / 2nd Level` items;
// - Dropdown: a `capsSidebarMenuAction` (the `+` mini button) opening an example `caps-menu`;
// - Badge: a `caps-sidebar-menu-badge` with the count of the nested `Sidebar Badge`.
const label = item.getString('Label');
const glyph = icon(item, 'Icon', ' aria-hidden="true"');
const icons: Icon[] = [glyph];
const active =
	item.getEnum('State', { Default: '', Focus: '', Active: ' isActive', 'Active Focus': ' isActive' }) ?? '';
const type = item.getEnum('Type', {
	Base: 'base',
	Expanded: 'expanded',
	Collapsed: 'collapsed',
	Dropdown: 'dropdown',
	Badge: 'badge',
});
const imports = ["import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';"];

function snippet(): string {
	if (type === 'expanded' || type === 'collapsed') {
		imports.push("import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';");
		icons.push({ markup: '', name: 'lucideChevronRight' });
		return `<caps-sidebar-menu-item>
	<caps-collapsible [expanded]="${type === 'expanded'}" class="group/collapsible">
		<button capsCollapsibleTrigger capsSidebarMenuButton${active}>
			${glyph.markup}
			<span>${label}</span>
			<ng-icon
				aria-hidden="true"
				name="lucideChevronRight"
				class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
			/>
		</button>
		<caps-collapsible-content>
			<caps-sidebar-menu-sub>
				<!-- 2nd level items -->
			</caps-sidebar-menu-sub>
		</caps-collapsible-content>
	</caps-collapsible>
</caps-sidebar-menu-item>`;
	}
	const button = `<a capsSidebarMenuButton href=""${active}>
		${glyph.markup}
		<span>${label}</span>
	</a>`;
	if (type === 'dropdown') {
		imports.push(
			"import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';",
			"import { CapsMenuImports } from '@capsule-ng/caps/menu';",
		);
		icons.push({ markup: '', name: 'lucidePlus' });
		return `<caps-sidebar-menu-item>
	${button}
	<button capsSidebarMenuAction [capsDropdownMenuTrigger]="menu">
		<ng-icon aria-hidden="true" name="lucidePlus" />
		<span class="sr-only">More</span>
	</button>
	<ng-template #menu>
		<caps-menu></caps-menu>
	</ng-template>
</caps-sidebar-menu-item>`;
	}
	if (type === 'badge') {
		const badge = item.findInstance('Sidebar Badge');
		const count = badge.type === 'INSTANCE' ? badge.getString('Count') : '';
		return `<caps-sidebar-menu-item>
	${button}
	<caps-sidebar-menu-badge>${count}</caps-sidebar-menu-badge>
</caps-sidebar-menu-item>`;
	}
	return `<caps-sidebar-menu-item>
	${button}
</caps-sidebar-menu-item>`;
}

const example = snippet();

export default {
	example: figma.code`${example}`,
	imports: [...imports, ...iconImports(icons)],
	id: 'caps-sidebar-menu-item',
};
