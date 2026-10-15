// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-12386
// source=libs/caps/tabs/src/lib/caps-tabs.ts
// component=CapsTabs
import figma from 'figma';
import { tabs } from '../../../code-connect/helpers';

export default {
	example: tabs(figma.selectedInstance, 'contained'),
	imports: ["import { CapsTabsImports } from '@capsule-ng/caps/tabs';"],
	id: 'caps-tabs-segmented',
};
