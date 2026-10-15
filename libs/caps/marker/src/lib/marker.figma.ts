// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15944
// source=libs/caps/marker/src/lib/caps-marker.ts
// component=CapsMarker
import figma from 'figma';
import { fixedIcon } from '../../../code-connect/chat';
import { element, icon, iconImports, type Icon } from '../../../code-connect/helpers';

const marker = figma.selectedInstance;

// Button and Link are native `button[capsMarker]` / `a[capsMarker]` (the Button chevron is a fixed
// icon); Vertical stacks the icon with `flex-col`, as in the docs; Spinner is a live status with a
// spinner and a shimmering loading label. `State` (Hover / Focus) is a CSS state.
const variant = marker.getEnum('Variant', {
	Button: 'button',
	Vertical: 'vertical',
	Horizontal: 'horizontal',
	Link: 'link',
	Spinner: 'spinner',
});
const showIcon = marker.getBoolean('Show icon');
const icons: Icon[] = [];
const iconPart = (glyph: Icon) => {
	icons.push(glyph);
	return `<caps-marker-icon>\n\t\t${glyph.markup}\n\t</caps-marker-icon>`;
};

let snippet: string;
if (variant === 'spinner') {
	snippet = element(
		'<caps-marker role="status">',
		[
			showIcon ? '<caps-marker-icon>\n\t\t<caps-spinner aria-hidden="true" />\n\t</caps-marker-icon>' : null,
			`<caps-marker-content class="shimmer">${marker.getString('⮑ Loading label')}</caps-marker-content>`,
		],
		'</caps-marker>',
	);
} else {
	const children = [
		showIcon ? iconPart(icon(marker, '⮑ Icon')) : null,
		`<caps-marker-content>${marker.getString('Label')}</caps-marker-content>`,
		variant === 'button' ? iconPart(fixedIcon('lucideChevronRight')) : null,
	];
	const [open, close] =
		variant === 'button'
			? ['<button capsMarker type="button">', '</button>']
			: variant === 'link'
				? ['<a capsMarker href="">', '</a>']
				: [variant === 'vertical' ? '<caps-marker class="flex-col">' : '<caps-marker>', '</caps-marker>'];
	snippet = element(open, children, close);
}

export default {
	example: figma.code`${snippet}`,
	imports: [
		"import { CapsMarkerImports } from '@capsule-ng/caps/marker';",
		...(variant === 'spinner' && showIcon ? ["import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';"] : []),
		...iconImports(icons),
	],
	id: 'caps-marker',
};
