// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-14610
// source=libs/caps/sonner/src/lib/caps-toaster.ts
// component=CapsToaster
import figma from 'figma';
import { buttonLabel } from '../../../code-connect/helpers';

const content = figma.selectedInstance;

// A toast is created from TypeScript with `toast(...)`, so the snippet shows an example trigger
// calling it; `toast` must be exposed to the template (`protected readonly toast = toast;`).
// Not mapped: the icon (`Show icon` / `⮑ Icon`): `toast.success` / `info` / `warning` / `error` set
// a built-in icon, and a custom `icon` option is an Angular component, not an icon name.
const quote = (text: string) => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;')}'`;
const title = quote(content.getString('Title'));
const type = content.getEnum('Type', {
	Simple: 'simple',
	'Line and button': 'line',
	'Lines and button': 'lines',
	Loading: 'loading',
});

let call = `toast(${title})`;
if (type === 'loading') {
	call = `toast.loading(${quote(content.getString('⮑ Loading label'))})`;
} else if (type === 'lines') {
	const button = content.findInstance('Button');
	const label = quote(buttonLabel(button.type === 'INSTANCE' ? button : undefined, 'Undo'));
	call = `toast(${title}, { description: ${quote(content.getString('Description'))}, action: { label: ${label}, onClick: onAction } })`;
}

export default {
	example: figma.code`<button capsButton variant="outline" (click)="${call}">Show toast</button>`,
	imports: [
		"import { toast } from '@capsule-ng/caps/sonner';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-toast',
};
