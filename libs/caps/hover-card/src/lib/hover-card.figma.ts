// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1962-14383
// source=libs/caps/hover-card/src/lib/caps-hover-card.ts
// component=CapsHoverCard
import figma from 'figma';
import { overlayBody } from '../../../code-connect/helpers';

// The Figma component is the open card. In code it is declared with its trigger, so the snippet
// shows an example link to replace.
export default {
	example: figma.code`<caps-hover-card>
	<a capsLink capsHoverCardTrigger href="#">Trigger</a>
	<ng-template capsHoverCardContent>${overlayBody(figma.selectedInstance, 'Slot', '\t\t')}
	</ng-template>
</caps-hover-card>`,
	imports: [
		"import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';",
		"import { CapsLinkImports } from '@capsule-ng/caps/link';",
	],
	id: 'caps-hover-card',
};
