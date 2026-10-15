// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1962-13741
// source=libs/caps/breadcrumb/src/lib/caps-breadcrumb.ts
// component=CapsBreadcrumb
import figma from 'figma';

// Only the items are rendered: `caps-breadcrumb-item` draws its own separator, so the
// `Breadcrumb / Separator` instances of the slot (not connected) are skipped.
const items = figma.selectedInstance.getSlot('Breadcrumb items')?.connectedInstances ?? [];
const content = items.reduce((code, item) => figma.code`${code}\n\t${item.executeTemplate().example}`, figma.code``);

export default {
	example: figma.code`<caps-breadcrumb>${content}\n</caps-breadcrumb>`,
	imports: ["import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';"],
	id: 'caps-breadcrumb',
};
