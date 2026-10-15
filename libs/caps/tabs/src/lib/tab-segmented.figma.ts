// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-11877
// source=libs/caps/tabs/src/lib/caps-tabs-trigger.ts
// component=CapsTabsTrigger
import figma from 'figma';
import { iconImports, tabTrigger } from '../../../code-connect/helpers';

// Rendered inside `<caps-tabs-list>`.
const { snippet, icons } = tabTrigger(figma.selectedInstance);

export default {
	example: figma.code`${snippet}`,
	imports: ["import { CapsTabsImports } from '@capsule-ng/caps/tabs';", ...iconImports(icons)],
	id: 'caps-tabs-trigger-segmented',
};
