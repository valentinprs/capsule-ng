// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14453
// source=libs/caps/slider/src/lib/caps-slider.ts
// component=CapsSlider
import figma from 'figma';
import { slider } from '../../../code-connect/helpers';

export default {
	example: figma.code`${slider(figma.selectedInstance, 'horizontal')}`,
	imports: ["import { CapsSliderImports } from '@capsule-ng/caps/slider';"],
	id: 'caps-slider',
};
