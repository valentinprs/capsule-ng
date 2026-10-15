// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-16016
// source=libs/caps/marker/src/lib/caps-marker.ts
// component=CapsMarker
import figma from 'figma';
import { element, icon, iconImports, indented, type Icon } from '../../../code-connect/helpers';

const marker = figma.selectedInstance;

// Default and Link render the label between the separator lines; Button places the Capsule Button
// instance between the lines, rendered by its own template. `State` (Hover / Focus) is a CSS state.
const variant = marker.getEnum('Variant', { Default: 'default', Button: 'button', Link: 'link' });
const markerImport = "import { CapsMarkerImports } from '@capsule-ng/caps/marker';";

function labelled(open: string, close: string) {
	const icons: Icon[] = [];
	const children: (string | null)[] = [];
	if (marker.getBoolean('Show icon')) {
		const glyph = icon(marker, '⮑ Icon');
		icons.push(glyph);
		children.push(`<caps-marker-icon>\n\t\t${glyph.markup}\n\t</caps-marker-icon>`);
	}
	children.push(`<caps-marker-content>${marker.getString('Label')}</caps-marker-content>`);
	return { example: figma.code`${element(open, children, close)}`, imports: [markerImport, ...iconImports(icons)] };
}

function withButton() {
	const button = marker.findInstance('Button');
	const example =
		button.type === 'INSTANCE' && button.hasCodeConnect() ? indented(button.executeTemplate().example, '\t') : '';
	return {
		example: figma.code`<caps-marker variant="separator">\n\t${example}\n</caps-marker>`,
		imports: [markerImport],
	};
}

const result =
	variant === 'button'
		? withButton()
		: variant === 'link'
			? labelled('<a capsMarker variant="separator" href="">', '</a>')
			: labelled('<caps-marker variant="separator">', '</caps-marker>');

export default { ...result, id: 'caps-marker-separator' };
