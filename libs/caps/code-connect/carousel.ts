// Shared logic of the Carousel (Horizontal) and Carousel (Vertical) templates.
import figma, { type InstanceHandle } from 'figma';
import { disabled, icon, iconButtonSize, iconImports, type Icon } from './helpers';

const variant = {
	Primary: '',
	Secondary: ' variant="secondary"',
	Outline: ' variant="outline"',
	Ghost: ' variant="ghost"',
	Destructive: ' variant="destructive"',
};

/** A `capsCarouselPrevious` / `capsCarouselNext` button styled like the Figma Icon Button. */
function navigation(button: InstanceHandle | undefined, directive: string, label: string, icons: Icon[]): string {
	if (button === undefined) {
		return `<button capsButton ${directive} variant="outline" size="icon">${label}</button>`;
	}
	const glyph = icon(button, 'Icon');
	icons.push(glyph);
	const attributes = `${button.getEnum('Variant', variant)}${button.getEnum('Size', iconButtonSize)}${button.getEnum('Disabled', disabled)}`;
	return `<button capsButton ${directive}${attributes} aria-label="${label}">
		${glyph.markup}
	</button>`;
}

/**
 * `caps-carousel` with one slide in an `@for` skeleton: the slides are data, so the `Cards` slot is
 * not read. `Slides` (slides per view) is the `basis-*` class of the items.
 */
export function carousel(owner: InstanceHandle, orientation: 'horizontal' | 'vertical') {
	const basis = owner.getEnum('Slides', { '1': '', '2': ' class="basis-1/2"', '3': ' class="basis-1/3"' });
	const buttons = owner
		.findConnectedInstances((node) => node.codeConnectId() === 'caps-icon-button')
		.filter((node): node is InstanceHandle => node.type === 'INSTANCE');
	const icons: Icon[] = [];
	const previous = navigation(buttons[0], 'capsCarouselPrevious', 'Previous slide', icons);
	const next = navigation(buttons[1], 'capsCarouselNext', 'Next slide', icons);
	// A vertical carousel needs a height on its content.
	const vertical = orientation === 'vertical';
	return {
		example: figma.code`<caps-carousel aria-label=""${vertical ? ' orientation="vertical"' : ''}>
	<caps-carousel-content${vertical ? ' class="h-72"' : ''}>
		@for (item of items; track item) {
			<caps-carousel-item${basis}>
				<!-- slide -->
			</caps-carousel-item>
		}
	</caps-carousel-content>
	${previous}
	${next}
</caps-carousel>`,
		imports: [
			"import { CapsCarouselImports } from '@capsule-ng/caps/carousel';",
			"import { CapsButtonImports } from '@capsule-ng/caps/button';",
			...iconImports(icons),
		],
	};
}
