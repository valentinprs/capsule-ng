// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15480
// source=libs/caps/bubble/src/lib/caps-bubble.ts
// component=CapsBubble
import figma from 'figma';
import { bubble } from '../../../code-connect/chat';

// The variant, the message and the collapsible trigger come from the nested `.Bubble content`; the
// `Reaction` variant gives the side and alignment of `caps-bubble-reactions`. The reactions text is
// one example span to replace by the data. Not mapped: the bubble alignment, which comes from the
// parent Message or Bubble group. Figma's Secondary is mapped to `secondary` (`muted` has no
// Figma variant).
const { snippet, imports } = bubble(figma.selectedInstance);

export default {
	example: snippet,
	imports,
	id: 'caps-bubble',
};
