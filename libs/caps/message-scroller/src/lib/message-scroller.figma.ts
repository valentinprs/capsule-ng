// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2294-12278
// source=libs/caps/message-scroller/src/lib/caps-message-scroller.ts
// component=CapsMessageScroller
import figma from 'figma';

// The Figma component is a showcase of a conversation in a card, without properties. In code the
// rows are rendered from the messages data: the snippet shows the `@for` skeleton of the docs.
export default {
	example: figma.code`<caps-message-scroller class="h-96" aria-label="Conversation" autoScroll>
	@for (message of messages; track message.id) {
		<caps-message-scroller-item [messageId]="message.id" [scrollAnchor]="message.role === 'user'">
			<!-- Compose Message / Bubble / Marker here. -->
		</caps-message-scroller-item>
	}
	<button caps-message-scroller-button type="button" aria-label="Return to latest messages"></button>
</caps-message-scroller>`,
	imports: ["import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';"],
	id: 'caps-message-scroller',
};
