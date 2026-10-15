// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-29720
// source=libs/caps/button/src/lib/caps-button.ts
// component=CapsButton
import figma from 'figma';
import { buttonSize, disabled, element, iconImports, labelWithIcons } from '../../../code-connect/helpers';

const button = figma.selectedInstance;

// `State` (Hover / Focus / Error) is not mapped: hover and focus are CSS states, and the button
// has no error styling in code.
const variant = button.getEnum('Variant', {
	Primary: '',
	Secondary: ' variant="secondary"',
	Outline: ' variant="outline"',
	Ghost: ' variant="ghost"',
	Destructive: ' variant="destructive"',
	Link: ' variant="link"',
});

const spinner = button.getBoolean('Show spinner');
const { children, icons } = labelWithIcons(button, true);

const imports = ["import { CapsButtonImports } from '@capsule-ng/caps/button';"];
if (spinner) {
	imports.push("import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';");
}

const snippet = element(
	`<button capsButton${variant}${button.getEnum('Size', buttonSize)}${button.getEnum('Disabled', disabled)}>`,
	[spinner ? '<caps-spinner aria-hidden="true" />' : null, ...children],
	'</button>',
);

export default {
	example: figma.code`${snippet}`,
	imports: [...imports, ...iconImports(icons)],
	id: 'caps-button',
};
