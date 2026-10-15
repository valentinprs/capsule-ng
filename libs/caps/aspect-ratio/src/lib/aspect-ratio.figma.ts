// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-31310
// source=libs/caps/aspect-ratio/src/lib/caps-aspect-ratio.ts
// component=CapsAspectRatio
import figma from 'figma';

const ratio = figma.selectedInstance.getEnum('Aspect', {
	'16:9': '16 / 9',
	'1:1': '1',
	'9:16': '9 / 16',
	'21:9': '21 / 9',
});

export default {
	example: figma.code`<caps-aspect-ratio [ratio]="${ratio}">
	<!-- content -->
</caps-aspect-ratio>`,
	imports: ["import { CapsAspectRatioImports } from '@capsule-ng/caps/aspect-ratio';"],
	id: 'caps-aspect-ratio',
};
