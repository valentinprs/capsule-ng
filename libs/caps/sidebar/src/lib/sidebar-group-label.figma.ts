// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-13640
// source=libs/caps/sidebar/src/lib/caps-sidebar-group-label.ts
// component=CapsSidebarGroupLabel
import figma from 'figma';

const group = figma.selectedInstance;

// `Type=Action` (and `Expanded` / `Collapsed`, drawn the same way) adds the `+` mini button, a
// `capsSidebarGroupAction`. A collapsible group wraps the whole `caps-sidebar-group` in a
// `caps-collapsible`, which the label alone cannot express.
const label = `<caps-sidebar-group-label>${group.getString('Label')}</caps-sidebar-group-label>`;
const hasAction = group.getEnum('Type', { Base: false, Action: true, Expanded: true, Collapsed: true });
const example = hasAction
	? `${label}
<button capsSidebarGroupAction title="Add">
	<ng-icon aria-hidden="true" name="lucidePlus" />
	<span class="sr-only">Add</span>
</button>`
	: label;

export default {
	example: figma.code`${example}`,
	imports: [
		"import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';",
		...(hasAction
			? ["import { NgIcon, provideIcons } from '@ng-icons/core';", "import { lucidePlus } from '@ng-icons/lucide';"]
			: []),
	],
	id: 'caps-sidebar-group-label',
};
