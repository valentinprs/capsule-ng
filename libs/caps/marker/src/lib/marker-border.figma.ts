// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2294-12183
// source=libs/caps/marker/src/lib/caps-marker.ts
// component=CapsMarker
import figma from 'figma';
import { layerIcon } from '../../../code-connect/chat';
import { iconImports } from '../../../code-connect/helpers';

// The icon is not an instance-swap property: the icon placed on the `square-dashed` layer is used.
const marker = figma.selectedInstance;
const glyph = layerIcon(marker, 'square-dashed');

export default {
	example: figma.code`<caps-marker variant="border">
	<caps-marker-icon>
		${glyph.markup}
	</caps-marker-icon>
	<caps-marker-content>${marker.getString('Label')}</caps-marker-content>
</caps-marker>`,
	imports: ["import { CapsMarkerImports } from '@capsule-ng/caps/marker';", ...iconImports([glyph])],
	id: 'caps-marker-border',
};
