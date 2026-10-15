// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=4206-30906
// source=libs/caps/tabs/src/lib/caps-tabs.ts
// component=CapsTabs
import figma from 'figma';
import { tabs } from '../../../code-connect/helpers';

export default {
	example: tabs(figma.selectedInstance, 'line'),
	imports: ["import { CapsTabsImports } from '@capsule-ng/caps/tabs';"],
	id: 'caps-tabs-line',
};
