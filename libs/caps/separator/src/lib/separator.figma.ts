// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14894
// source=libs/caps/separator/src/lib/caps-separator.ts
// component=CapsSeparator
import figma from 'figma';

const spacing = figma.selectedInstance.getEnum('Spacing', {
	None: '',
	Regular: ' spacing="regular"',
	Spacious: ' spacing="spacious"',
});
const orientation = figma.selectedInstance.getEnum('Orientation', {
	Horizontal: '',
	Vertical: ' orientation="vertical"',
});

export default {
	example: figma.code`<caps-separator${orientation}${spacing} />`,
	imports: ["import { CapsSeparatorImports } from '@capsule-ng/caps/separator';"],
	id: 'caps-separator',
};
