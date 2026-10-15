// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-31170
// source=libs/caps/badge/src/lib/caps-badge.ts
// component=CapsBadge
import figma from 'figma';
import { element, iconImports, labelWithIcons } from '../../../code-connect/helpers';

const badge = figma.selectedInstance;

// `State` (Focus) is not mapped: it is a CSS state.
const variant = badge.getEnum('Variant', {
	Primary: ' variant="primary"',
	Secondary: ' variant="secondary"',
	Outline: ' variant="outline"',
	Ghost: ' variant="ghost"',
	Destructive: ' variant="destructive"',
});

const spinner = badge.getBoolean('Show spinner');
const { children, icons } = labelWithIcons(badge, false);

const imports = ["import { CapsBadgeImports } from '@capsule-ng/caps/badge';"];
if (spinner) {
	imports.push("import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';");
}

const snippet = element(
	`<caps-badge${variant}>`,
	[spinner ? '<caps-spinner aria-hidden="true" class="text-xs" />' : null, ...children],
	'</caps-badge>',
);

export default {
	example: figma.code`${snippet}`,
	imports: [...imports, ...iconImports(icons)],
	id: 'caps-badge',
};
