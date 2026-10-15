// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1962-14345
// source=libs/caps/drawer/src/lib/caps-drawer.ts
// component=CapsDrawer
import figma from 'figma';
import { overlayBody } from '../../../code-connect/helpers';

// The Figma component is the open overlay. In code it is declared with its trigger, so the snippet
// shows an example trigger to replace.
export default {
	example: figma.code`<caps-drawer>
	<button capsDrawerTrigger capsButton variant="outline">Open</button>
	<ng-template capsDrawerContent>${overlayBody(figma.selectedInstance, 'Slot', '\t\t')}
	</ng-template>
</caps-drawer>`,
	imports: [
		"import { CapsDrawerImports } from '@capsule-ng/caps/drawer';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-drawer',
};
