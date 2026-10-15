// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-16066
// source=libs/caps/marker/src/lib/caps-marker.ts
// component=CapsMarkerDirective
import figma from 'figma';
import { fixedIcon, layerIcon } from '../../../code-connect/chat';
import { iconImports } from '../../../code-connect/helpers';

const marker = figma.selectedInstance;

// The marker has no accordion in code: the snippet is a `button[capsMarker]` with `aria-expanded`,
// the expanded content being owned by the app. The icon is not an instance-swap property: the icon
// placed on the `square-dashed` layer is used. `State` (Hover / Focus) is a CSS state.
const open = marker.getEnum('Variant', { Open: true, Closed: false }) ?? false;
const glyph = layerIcon(marker, 'square-dashed');
const chevron = fixedIcon(open ? 'lucideChevronUp' : 'lucideChevronDown');

export default {
	example: figma.code`<button capsMarker type="button" aria-expanded="${open}">
	<caps-marker-icon>
		${glyph.markup}
	</caps-marker-icon>
	<caps-marker-content>${marker.getString('Label')}</caps-marker-content>
	<caps-marker-icon>
		${chevron.markup}
	</caps-marker-icon>
</button>`,
	imports: ["import { CapsMarkerImports } from '@capsule-ng/caps/marker';", ...iconImports([glyph, chevron])],
	id: 'caps-marker-accordion',
};
