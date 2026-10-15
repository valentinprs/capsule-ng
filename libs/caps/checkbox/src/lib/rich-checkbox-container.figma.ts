// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2255-18585
// source=libs/caps/checkbox/src/lib/caps-checkbox.ts
// component=CapsCheckbox
import figma from 'figma';
import { choiceCard } from '../../../code-connect/field';

const { example, imports } = choiceCard(figma.selectedInstance, 'checkbox');

export default { example, imports, id: 'caps-checkbox-choice-card' };
