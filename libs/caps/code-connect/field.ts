// Shared helpers for the Field family templates (fields, labelled controls and choice cards).
import figma, { type InstanceHandle } from 'figma';
import { lines, type Part } from './helpers';

export type Control = 'checkbox' | 'radio' | 'switch';

const controlImports: Record<Control, string> = {
	checkbox: "import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';",
	radio: "import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';",
	switch: "import { CapsSwitchImports } from '@capsule-ng/caps/switch';",
};
export const fieldImport = "import { CapsFieldImports } from '@capsule-ng/caps/field';";

/** A `value` for radios, derived from their label. */
export function slug(label: string): string {
	return label.toLowerCase().trim().replace(/\s+/g, '-');
}

/** The text of the nested Label component instance, e.g. in Figma's Radio Group. */
export function nestedLabel(owner: InstanceHandle): string {
	const label = owner.findInstance('Label');
	return label.type === 'INSTANCE' ? label.getString('Label') : '';
}

/** The text of a TEXT layer, or an empty string when the layer is missing. */
export function text(owner: InstanceHandle, layer: string): string {
	const node = owner.findText(layer);
	return node.type === 'TEXT' ? node.textContent : '';
}

/**
 * The control of a labelled control or choice card, from its `Checked` and, when the component has
 * one (choice cards do not), `Disabled` properties.
 */
function control(owner: InstanceHandle, kind: Control, label: string, hasDisabled: boolean, attributes = ''): string {
	const checked = owner.getEnum('Checked', { True: kind === 'radio' ? '' : ' checked', False: '' }) ?? '';
	const disabled = hasDisabled ? (owner.getEnum('Disabled', { True: ' disabled', False: '' }) ?? '') : '';
	return kind === 'radio'
		? `<caps-radio value="${slug(label)}"${disabled}${attributes} />`
		: `<caps-${kind}${checked}${disabled}${attributes} />`;
}

/**
 * Checkbox Group / Switch Group: a control next to its label. `Layout` has no equivalent in code;
 * `Weight=Normal` is the `font-normal` label of the docs examples.
 */
export function labelledControl(owner: InstanceHandle, kind: Exclude<Control, 'radio'>) {
	const label = owner.getString('Label');
	const weight = owner.getEnum('Weight', { Medium: '', Normal: ' class="font-normal"' }) ?? '';
	return {
		example: figma.code`<caps-field orientation="horizontal">
	${control(owner, kind, label, true)}
	<caps-field-label${weight}>${label}</caps-field-label>
</caps-field>`,
		imports: [fieldImport, controlImports[kind]],
	};
}

/**
 * Rich Checkbox / Radio / Switch Container: the choice card pattern of the docs, a
 * `caps-field-label` wrapping a horizontal `caps-field`. `Hover` is a CSS state.
 */
export function choiceCard(owner: InstanceHandle, kind: Control) {
	const label = owner.getString('Label');
	const flipped = owner.getEnum('Flipped', { True: true, False: false }) ?? false;
	const invalid = owner.getEnum('Error', { True: ' forceInvalid', False: '' }) ?? '';
	const input = control(owner, kind, label, false, ` aria-label="${label}"`);

	const content: Part[] = [`<span class="text-sm font-medium">${label}</span>`];
	if (owner.getBoolean('Show description')) {
		content.push(`<caps-field-description>${owner.getString('⮑ Description')}</caps-field-description>`);
	}
	if (owner.getBoolean('Show slot')) {
		// Connected instances of the slot are rendered by their own templates.
		for (const item of owner.getSlot('⮑ Slot')?.connectedInstances ?? []) {
			content.push(item.executeTemplate().example);
		}
	}
	// Rich Switch Container has no shortcut.
	const kbd = kind !== 'switch' && owner.getBoolean('Show shortcut') ? owner.findInstance('kbd') : null;
	const shortcut = kbd?.type === 'INSTANCE' ? [kbd.executeTemplate().example] : [];

	const row = [
		...(flipped ? [] : [input]),
		figma.code`<caps-field-content>${lines(content, '\t\t\t')}\n\t\t</caps-field-content>`,
		...shortcut,
		...(flipped ? [input] : []),
	];
	return {
		example: figma.code`<caps-field-label>
	<caps-field orientation="horizontal"${invalid}>${lines(row, '\t\t')}
	</caps-field>
</caps-field-label>`,
		imports: [fieldImport, controlImports[kind]],
	};
}

/** Vertical Field / Horizontal Field. */
export function field(owner: InstanceHandle, orientation: 'vertical' | 'horizontal') {
	const type = owner.getEnum('Type', {
		'Text value': 'Input',
		Textarea: 'Textarea',
		Select: 'Select & Combobox',
		Slider: 'Slider Horizontal',
		Radio: 'radio',
		Checkbox: 'checkbox',
	});
	const label = nestedLabel(owner);
	const error = owner.getEnum('State', { Default: false, Error: true }) ?? false;
	const imports = [fieldImport];
	const parts: Part[] = [];

	if (type === 'checkbox') {
		// A list of checkboxes is a fieldset whose legend is styled as a label.
		parts.push(`<caps-field-legend variant="label">${label}</caps-field-legend>`);
		const options = owner.getSlot('Checkbox options')?.connectedInstances ?? [];
		parts.push(
			figma.code`<caps-field-group class="gap-3">${lines(
				options.map((option) => option.executeTemplate().example),
				'\t\t',
			)}\n\t</caps-field-group>`,
		);
	} else if (type === 'radio') {
		parts.push(`<caps-field-label>${label}</caps-field-label>`);
		const options = owner.getSlot('Radio options')?.connectedInstances ?? [];
		const checked = options.find((option) => option.getEnum('Checked', { True: true, False: false }));
		const value = checked ? slug(nestedLabel(checked)) : '';
		parts.push(
			figma.code`<caps-radio-group value="${value}">${lines(
				options.map((option) => option.executeTemplate().example),
				'\t\t',
			)}\n\t</caps-radio-group>`,
		);
		imports.push(controlImports.radio);
	} else if (type) {
		parts.push(`<caps-field-label>${label}</caps-field-label>`);
		const input = owner.findInstance(type);
		if (input.type === 'INSTANCE' && input.hasCodeConnect()) {
			parts.push(input.executeTemplate().example);
		}
	}

	if (owner.getBoolean('Show description')) {
		parts.push(`<caps-field-description>${text(owner, 'Description')}</caps-field-description>`);
	}
	if (error && owner.getBoolean('Show error')) {
		parts.push(`<caps-field-error forceShow>${text(owner, 'Error message')}</caps-field-error>`);
	}

	const tag = type === 'checkbox' ? 'caps-field-set' : 'caps-field';
	const attributes = `${orientation === 'horizontal' && tag === 'caps-field' ? ' orientation="horizontal"' : ''}${
		error && tag === 'caps-field' ? ' forceInvalid' : ''
	}`;
	return {
		example: figma.code`<${tag}${attributes}>${lines(parts, '\t')}\n</${tag}>`,
		imports,
	};
}
