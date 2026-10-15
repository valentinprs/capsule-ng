// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-14542
// source=libs/caps/sonner/src/lib/caps-toaster.ts
// component=CapsToaster
import figma from 'figma';

const sonner = figma.selectedInstance;

// `caps-toaster` is placed once in the app; the toast itself comes from the nested Sonner Content,
// rendered by its own template (an example trigger calling `toast(...)`). `Order` is the toaster
// position. Not mapped: `Stack` (the number of toasts shown at runtime) and `Type` (read from the
// Sonner Content).
const position = sonner.getEnum('Order', { 'Bottom to top': '', 'Top to bottom': ' position="top-right"' });
const content = sonner.findInstance('Sonner Content');
const trigger = content.type === 'INSTANCE' && content.hasCodeConnect() ? content.executeTemplate().example : '';

export default {
	example: figma.code`<caps-toaster${position} />
${trigger}`,
	// The trigger's imports (`toast`, `CapsButtonImports`) come from the Sonner Content template.
	imports: ["import { CapsSonnerImports } from '@capsule-ng/caps/sonner';"],
	id: 'caps-toaster',
};
