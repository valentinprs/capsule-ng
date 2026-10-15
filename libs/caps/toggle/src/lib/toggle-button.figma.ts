// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-10837
// source=libs/caps/toggle/src/lib/caps-toggle.ts
// component=CapsToggle
import figma from 'figma';
import { disabled, element, iconImports, labelWithIcons } from '../../../code-connect/helpers';

const toggle = figma.selectedInstance;

// `State` (Focus) is not mapped: it is a CSS state. The toggle has no `xs` size, so
// Extra small falls back to `sm`.
// A `Single` toggle is a standalone `capsToggle`; the other positions are items of a
// `caps-toggle-group`, which spaces and joins them.
const directive = toggle.getEnum('Position', {
	Single: 'capsToggle',
	Left: 'capsToggleItem value=""',
	Middle: 'capsToggleItem value=""',
	Right: 'capsToggleItem value=""',
});
const variant = toggle.getEnum('Variant', { Outline: ' variant="outline"', Ghost: '' });
const size = toggle.getEnum('Size', {
	Default: '',
	'Extra small': ' size="sm"',
	Small: ' size="sm"',
	Large: ' size="lg"',
});
const state = toggle.getEnum('Active', { True: ' state="on"', False: '' });
const { children, icons } = labelWithIcons(toggle, false);
const open = `<button ${directive}${variant}${size}${state}${toggle.getEnum('Disabled', disabled)}>`;

export default {
	example: figma.code`${element(open, children, '</button>')}`,
	imports: [
		toggle.getEnum('Position', {
			Single: "import { CapsToggleImports } from '@capsule-ng/caps/toggle';",
			Left: "import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';",
			Middle: "import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';",
			Right: "import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';",
		}) ?? '',
		...iconImports(icons),
	],
	id: 'caps-toggle',
};
