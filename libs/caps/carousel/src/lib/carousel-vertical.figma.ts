// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-26931
// source=libs/caps/carousel/src/lib/caps-carousel.ts
// component=CapsCarousel
import figma from 'figma';
import { carousel } from '../../../code-connect/carousel';

// The slides are data: the snippet shows one slide in an `@for` skeleton and the `Cards small` slot
// is not read. `Slides` (slides per view) is the `basis-*` class of `caps-carousel-item`; the content
// height is an example to adapt.
const { example, imports } = carousel(figma.selectedInstance, 'vertical');

export default { example, imports, id: 'caps-carousel-vertical' };
