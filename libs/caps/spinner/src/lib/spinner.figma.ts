// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14612
// source=libs/caps/spinner/src/lib/caps-spinner.ts
// component=CapsSpinner
import figma from 'figma';

// `Type=Mirrored` has no code equivalent, so both types render the same snippet.
// Size=Default is the 16px `text-base` default; Size=Small is 12px (`text-xs`).
const size = figma.selectedInstance.getEnum('Size', { Default: '', Small: ' class="text-xs"' });

export default {
	example: figma.code`<caps-spinner${size} />`,
	imports: ["import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';"],
	id: 'caps-spinner',
};
