// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-15016
// source=libs/caps/resizable/src/lib/caps-resizable-group.ts
// component=CapsResizableGroup
import figma from 'figma';

// The Figma component is the handle; in code it sits between two panels of a group. A vertical
// divider separates panels side by side (the default direction), a horizontal one stacks them.
const direction = figma.selectedInstance.getEnum('Orientation', { Vertical: '', Horizontal: ' direction="vertical"' });

export default {
	example: figma.code`<caps-resizable-group${direction}>
	<caps-resizable-panel defaultSize="50"></caps-resizable-panel>
	<caps-resizable-handle aria-label="" withHandle />
	<caps-resizable-panel defaultSize="50"></caps-resizable-panel>
</caps-resizable-group>`,
	imports: ["import { CapsResizableImports } from '@capsule-ng/caps/resizable';"],
	id: 'caps-resizable',
};
