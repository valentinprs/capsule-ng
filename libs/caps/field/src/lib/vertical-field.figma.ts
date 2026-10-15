// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-20683
// source=libs/caps/field/src/lib/caps-field.ts
// component=CapsField
import figma from 'figma';
import { field } from '../../../code-connect/field';

const { example, imports } = field(figma.selectedInstance, 'vertical');

export default { example, imports, id: 'caps-field-vertical' };
