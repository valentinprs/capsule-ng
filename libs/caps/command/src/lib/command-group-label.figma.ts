// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-15041
// source=libs/caps/command/src/lib/caps-command-structure.ts
// component=CapsCommandGroupLabel
import figma from 'figma';

// `Type` and `Indented` have no input in code. Inside `Command Group`, the label is passed to the
// group's `label` input instead.
export default {
	example: figma.code`<caps-command-group-label>${figma.selectedInstance.getString('Label')}</caps-command-group-label>`,
	imports: ["import { CapsCommandImports } from '@capsule-ng/caps/command';"],
	id: 'caps-command-group-label',
};
