// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-11724
// source=libs/caps/textarea/src/lib/caps-textarea.ts
// component=CapsTextarea
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

// `State` (Focus / Error) is not mapped: focus is a CSS state and errors come from form validation.
// `Filled` and `Show resizable` have no input in code.
export default {
	example: figma.code`<textarea capsTextarea${figma.selectedInstance.getEnum('Disabled', disabled)}></textarea>`,
	imports: ["import { CapsTextareaImports } from '@capsule-ng/caps/textarea';"],
	id: 'caps-textarea',
};
