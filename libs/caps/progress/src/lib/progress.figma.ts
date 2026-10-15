// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-17809
// source=libs/caps/progress/src/lib/caps-progress.ts
// component=CapsProgress
import figma from 'figma';

// `Show %` has no equivalent in code: the percentage is a separate text next to the bar.
const value = figma.selectedInstance.getEnum('Progress', {
	'0': '0',
	'10': '10',
	'20': '20',
	'25': '25',
	'33': '33',
	'40': '40',
	'50': '50',
	'60': '60',
	'66': '66',
	'75': '75',
	'80': '80',
	'90': '90',
	'100': '100',
});

export default {
	example: figma.code`<caps-progress [value]="${value}" aria-label="" />`,
	imports: ["import { CapsProgressImports } from '@capsule-ng/caps/progress';"],
	id: 'caps-progress',
};
