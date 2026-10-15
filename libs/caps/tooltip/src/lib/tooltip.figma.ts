// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-11601
// source=libs/caps/tooltip/src/lib/caps-tooltip.ts
// component=CapsTooltip
import figma from 'figma';

const tooltip = figma.selectedInstance;

// The Figma component is the tooltip bubble. In code, `capsTooltip` is set on the element that
// triggers it, so the snippet shows it on an example button to replace.
const text = tooltip.getString('Tooltip text');
const placement = tooltip.getEnum('Side', { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' });
const type = tooltip.getEnum('Type', { Default: 'default', Formatted: 'formatted', Shortcut: 'shortcut' });
const imports = [
	"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	"import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';",
];

/** Rich content is passed to `[capsTooltip]` as a template. */
function richTooltip() {
	if (type === 'shortcut') {
		// The shortcut is a Capsule `kbd` instance, rendered by its own template (kbd.figma.ts).
		const kbd = tooltip.findInstance('kbd');
		const shortcut = kbd.type === 'INSTANCE' ? kbd.executeTemplate().example : '';
		return figma.code`<button capsButton variant="outline" [capsTooltip]="tooltip" placement="${placement}">Trigger</button>

<ng-template #tooltip>
	<span class="flex items-center gap-2">
		${text}
		${shortcut}
	</span>
</ng-template>`;
	}
	const line2 = tooltip.findText('Line 2');
	return figma.code`<button capsButton variant="outline" [capsTooltip]="tooltip" placement="${placement}">Trigger</button>

<ng-template #tooltip>
	<span class="flex flex-col">
		<span>${text}</span>
		<span>${line2.type === 'TEXT' ? line2.textContent : ''}</span>
	</span>
</ng-template>`;
}

export default {
	example:
		type === 'default'
			? figma.code`<button capsButton variant="outline" capsTooltip="${text}" placement="${placement}">Trigger</button>`
			: richTooltip(),
	imports,
	id: 'caps-tooltip',
};
