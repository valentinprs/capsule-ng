// Helpers for the chat components (Bubble, Message, Marker, Attachment). The Code Connect CLI
// bundles relative imports into each template at publish time.
import figma, { type InstanceHandle, type TemplateStringResult } from 'figma';
import { icon, iconImports, lines, nested, slotContent, type Icon, type Part } from './helpers';

export const bubbleImport = "import { CapsBubbleImports } from '@capsule-ng/caps/bubble';";
export const buttonImport = "import { CapsButtonImports } from '@capsule-ng/caps/button';";

/** Bubble variants; Figma's Primary is the code default. */
export const bubbleVariant = {
	Primary: '',
	Secondary: ' variant="secondary"',
	Tinted: ' variant="tinted"',
	Outline: ' variant="outline"',
	Destructive: ' variant="destructive"',
	Ghost: ' variant="ghost"',
};

/** A fixed Lucide icon (not an instance-swap property), e.g. a chevron drawn in the component. */
export function fixedIcon(name: string, attributes = ''): Icon {
	return { markup: `<ng-icon name="${name}"${attributes} />`, name };
}

/** The icon placed on a layer that is not exposed as an instance-swap property. */
export function layerIcon(owner: InstanceHandle, layer: string): Icon {
	const found = owner.findInstance(layer);
	const name = found.type === 'INSTANCE' ? found.codeConnectId() : null;
	return name
		? fixedIcon(name)
		: { markup: `<!-- ${found.type === 'INSTANCE' ? found.name : 'icon'} has no Code Connect -->`, name: null };
}

/**
 * A Figma `Bubble`: the `.Bubble content` instance gives the variant, the message and the
 * collapsible trigger; the `Reaction` variant places the `.Reaction` instance.
 */
export function bubble(owner: InstanceHandle, align = ''): { snippet: TemplateStringResult; imports: string[] } {
	const imports = [bubbleImport];
	const content = owner.findInstance('.Bubble content');
	const variant = content.type === 'INSTANCE' ? (content.getEnum('Variant', bubbleVariant) ?? '') : '';
	const message = content.type === 'INSTANCE' ? content.getString('Message') : 'Message';
	const collapsible =
		content.type === 'INSTANCE' ? content.getEnum('Collapsible', { Default: null, Open: true, Closed: false }) : null;

	let body: string;
	if (collapsible === null || collapsible === undefined) {
		body = `<caps-bubble-content>${message}</caps-bubble-content>`;
	} else {
		// The collapsible trigger of the docs: the app toggles the text and `aria-expanded`.
		const chevron = fixedIcon('lucideChevronDown', collapsible ? ' class="rotate-180"' : '');
		imports.push(buttonImport, ...iconImports([chevron]));
		body = `<caps-bubble-content>
		<div>${message}</div>
		<button capsButton variant="link" class="text-muted-foreground gap-1 p-0" aria-expanded="${collapsible}">
			${collapsible ? 'Show less' : 'Show more'}
			${chevron.markup}
		</button>
	</caps-bubble-content>`;
	}

	const position = owner.getEnum('Reaction', {
		None: null,
		'Bottom left': ' align="start"',
		'Top left': ' side="top" align="start"',
		'Bottom right': '',
		'Top right': ' side="top"',
	});
	let reactions: Part = '';
	if (typeof position === 'string') {
		const reaction = owner.findInstance('.Reaction');
		const kind = reaction.type === 'INSTANCE' ? reaction.getEnum('Variant', { Reactions: 'text' }) : undefined;
		if (reaction.type === 'INSTANCE' && kind === 'text') {
			reactions = `\n\t<caps-bubble-reactions${position} role="img" aria-label="Reactions">
		<span>${reaction.getString('Reactions')}</span>
	</caps-bubble-reactions>`;
		} else if (reaction.type === 'INSTANCE') {
			// Action / emoji / icon buttons: Capsule Button instances, rendered by their own templates.
			const buttons = reaction
				.findConnectedInstances(() => true)
				.map((button) => (button.type === 'INSTANCE' ? button.executeTemplate().example : ''));
			reactions = figma.code`\n\t<caps-bubble-reactions${position}>${lines(buttons, '\t\t')}
	</caps-bubble-reactions>`;
		}
	}

	return {
		snippet: figma.code`<caps-bubble${variant}${align}>
	${body}${reactions}
</caps-bubble>`,
		imports,
	};
}

export const attachmentImport = "import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';";

/** `caps-attachment-media` from an Attachment Media instance (Horizontal or Vertical). */
export function attachmentMedia(
	media: InstanceHandle,
	iconProp: string,
	indent = '',
): { markup: string; icons: Icon[] } {
	const type = media.getEnum('Type', { Icon: 'icon', 'Icon destructive': 'icon', Image: 'image' });
	if (type === 'image') {
		return {
			markup: `<caps-attachment-media variant="image">\n${indent}\t<img src="" alt="" />\n${indent}</caps-attachment-media>`,
			icons: [],
		};
	}
	const glyph = icon(media, iconProp);
	return {
		markup: `<caps-attachment-media>\n${indent}\t${glyph.markup}\n${indent}</caps-attachment-media>`,
		icons: [glyph],
	};
}

/** `caps-attachment-actions` from the `Action 1` / `Action 2` icon buttons that are shown. */
export function attachmentActions(
	owner: InstanceHandle,
	actions: { layer: string; show: string }[],
	indent = '',
): { markup: string | null; icons: Icon[] } {
	const icons: Icon[] = [];
	const buttons = actions
		.filter((action) => owner.getBoolean(action.show))
		.map((action) => {
			const button = owner.findInstance(action.layer);
			if (button.type !== 'INSTANCE') {
				return null;
			}
			const glyph = icon(button, 'Icon');
			icons.push(glyph);
			return `${indent}\t<button capsAttachmentAction aria-label="">\n${indent}\t\t${glyph.markup}\n${indent}\t</button>`;
		})
		.filter((button): button is string => button !== null);
	return buttons.length === 0
		? { markup: null, icons }
		: { markup: `<caps-attachment-actions>\n${buttons.join('\n')}\n${indent}</caps-attachment-actions>`, icons };
}

/**
 * The content of a slot holding plain text: its connected instances (one per line at `indent`), else
 * the text of the `layer` placed in it, else `fallback`.
 */
export function slotText(owner: InstanceHandle, slot: string, layer: string, fallback: string, indent: string): Part {
	const connected = slotContent(owner, slot);
	if (connected.length > 0) {
		return figma.code`${nested(connected, indent)}\n${indent.slice(1)}`;
	}
	const text = owner.findText(layer);
	return text.type === 'TEXT' && text.textContent ? text.textContent : fallback;
}
