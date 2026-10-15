// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14894
// source=libs/caps/separator/src/lib/caps-separator.ts
// component=CapsSeparator
import figma from 'figma';

// `Spacing` has no input in code: the surrounding layout sets the margins.
const orientation = figma.selectedInstance.getEnum('Orientation', {
	Horizontal: '',
	Vertical: ' orientation="vertical"',
});

export default {
	example: figma.code`<caps-separator${orientation} />`,
	imports: ["import { CapsSeparatorImports } from '@capsule-ng/caps/separator';"],
	id: 'caps-separator',
};
