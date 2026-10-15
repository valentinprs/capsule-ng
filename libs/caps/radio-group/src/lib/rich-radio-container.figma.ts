// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2256-19124
// source=libs/caps/radio-group/src/lib/caps-radio.ts
// component=CapsRadio
import figma from 'figma';
import { choiceCard } from '../../../code-connect/field';

const { example, imports } = choiceCard(figma.selectedInstance, 'radio');

export default { example, imports, id: 'caps-radio-choice-card' };
