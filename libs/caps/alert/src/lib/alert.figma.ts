// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32858
// source=libs/caps/alert/src/lib/caps-alert.ts
// component=CapsAlert
import figma from 'figma';
import { icon, iconImports } from '../../../code-connect/helpers';

const alert = figma.selectedInstance;

const variant = alert.getEnum('Variant', { Neutral: '', Error: ' variant="destructive"' });
const media = icon(alert, '⮑ Icon', ' aria-hidden="true"');
const title = alert.getBoolean('Show title')
	? `\n\t<caps-alert-title>${alert.getString('⮑ Title')}</caps-alert-title>`
	: '';
const description = alert.getBoolean('Show description')
	? `\n\t<caps-alert-description>${alert.getString('⮑ Description')}</caps-alert-description>`
	: '';
// The action is a Capsule Button instance, rendered by its own template (button.figma.ts).
const button = alert.getBoolean('Show button') ? alert.findInstance('Button') : null;
const actions = button?.type === 'INSTANCE' ? button.executeTemplate().example : null;

export default {
	example: actions
		? figma.code`<caps-alert${variant}>
	<caps-alert-media>${media.markup}</caps-alert-media>${title}${description}
	<caps-alert-actions>${actions}</caps-alert-actions>
</caps-alert>`
		: figma.code`<caps-alert${variant}>
	<caps-alert-media>${media.markup}</caps-alert-media>${title}${description}
</caps-alert>`,
	imports: ["import { CapsAlertImports } from '@capsule-ng/caps/alert';", ...iconImports([media])],
	id: 'caps-alert',
};
