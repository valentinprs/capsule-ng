// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-13164
// source=libs/caps/switch/src/lib/caps-switch.ts
// component=CapsSwitch
import figma from 'figma';
import { choiceCard } from '../../../code-connect/field';

const { example, imports } = choiceCard(figma.selectedInstance, 'switch');

export default { example, imports, id: 'caps-switch-choice-card' };
