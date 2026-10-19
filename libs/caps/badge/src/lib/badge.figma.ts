// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-31170
// source=libs/caps/badge/src/lib/caps-badge.ts
// component=CapsBadge
import figma from 'figma';
import { element, iconImports, labelWithIcons } from '../../../code-connect/helpers';

const badge = figma.selectedInstance;

const variant = badge.getEnum('Variant', {
	// `blue` is the default variant, so it is omitted.
	Blue: '',
	'Cool gray': ' variant="cool-gray"',
	Red: ' variant="red"',
	Magenta: ' variant="magenta"',
	Purple: ' variant="purple"',
	Cyan: ' variant="cyan"',
	Orange: ' variant="orange"',
	Yellow: ' variant="yellow"',
	Green: ' variant="green"',
});

const highContrast = badge.getEnum('High contrast', { True: ' highContrast', False: '' });
const spinner = badge.getBoolean('Show spinner');
const { children, icons } = labelWithIcons(badge, false);

const imports = ["import { CapsBadgeImports } from '@capsule-ng/caps/badge';"];
if (spinner) {
	imports.push("import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';");
}

const snippet = element(
	`<caps-badge${variant}${highContrast}>`,
	[spinner ? '<caps-spinner aria-hidden="true" class="text-xs" />' : null, ...children],
	'</caps-badge>',
);

export default {
	example: figma.code`${snippet}`,
	imports: [...imports, ...iconImports(icons)],
	id: 'caps-badge',
};
