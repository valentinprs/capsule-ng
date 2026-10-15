// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-18656
// source=libs/caps/input/src/lib/caps-input.ts
// component=CapsInput
import figma from 'figma';

// A native file input styled by `capsInput`. Not mapped: `Button label`, `Placeholder` and
// `File name` (rendered by the browser), `File chosen` (the selected file is runtime state),
// `Size` and `Roundness` (no input in code), and `State` (focus is a CSS state, errors come from
// form validation).
export default {
	example: figma.code`<input capsInput type="file" />`,
	imports: ["import { CapsInputImports } from '@capsule-ng/caps/input';"],
	id: 'caps-input-file',
};
