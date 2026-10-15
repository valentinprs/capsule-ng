// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-26893
// source=libs/caps/carousel/src/lib/caps-carousel.ts
// component=CapsCarousel
import figma from 'figma';
import { carousel } from '../../../code-connect/carousel';

// The slides are data: the snippet shows one slide in an `@for` skeleton and the `Cards` slot is not
// read. `Slides` (slides per view) is the `basis-*` class of `caps-carousel-item`.
const { example, imports } = carousel(figma.selectedInstance, 'horizontal');

export default { example, imports, id: 'caps-carousel' };
