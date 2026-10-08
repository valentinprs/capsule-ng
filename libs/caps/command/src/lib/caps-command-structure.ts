import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input } from '@angular/core';
import { BrnCommandGroup, BrnCommandList, BrnCommandSeparator, injectBrnCommand } from '@spartan-ng/brain/command';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-command-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnCommandList, inputs: ['id'] }],
	host: { 'data-slot': 'command-list', '[attr.aria-label]': 'ariaLabel() ?? "Commands"' },
	template: `
		<ng-content />
	`,
})
export class CapsCommandList {
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	constructor() {
		classes(() => 'caps-command-list overflow-x-hidden overflow-y-auto');
	}
}

@Component({
	selector: 'caps-command-group-label',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'command-group-label', role: 'presentation' },
	template: `
		<ng-content />
	`,
})
export class CapsCommandGroupLabel {
	constructor() {
		classes(() => 'caps-command-group-label');
	}
}

@Component({
	selector: 'caps-command-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnCommandGroup, inputs: ['id'] }],
	host: {
		'data-slot': 'command-group',
		'[attr.aria-label]': 'label() || null',
		'[attr.aria-labelledby]': '!label() && _heading() ? _headingId() : null',
	},
	template: `
		@if (label()) {
			<div class="caps-command-group-label" data-slot="command-group-label" aria-hidden="true">{{ label() }}</div>
		}
		@if (_heading()) {
			<div [id]="_headingId()"><ng-content select="caps-command-group-label" /></div>
		}
		<ng-content />
	`,
})
export class CapsCommandGroup {
	public readonly label = input<string>('');
	protected readonly _heading = contentChild(CapsCommandGroupLabel);
	private readonly _group = inject(BrnCommandGroup);
	protected readonly _headingId = computed(() => this._group.id() + '-label');
	constructor() {
		classes(() => 'caps-command-group block data-hidden:hidden');
	}
}

@Component({
	selector: 'caps-command-empty',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'command-empty', '[hidden]': '_hasItems()', role: 'status', 'aria-live': 'polite' },
	template: `
		<ng-content />
	`,
})
export class CapsCommandEmpty {
	private readonly _command = injectBrnCommand();
	protected readonly _hasItems = computed(() => this._command.items().some((item) => item.visible()));
	constructor() {
		classes(() => 'caps-command-empty block');
	}
}

@Component({
	selector: 'caps-command-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnCommandSeparator],
	host: { 'data-slot': 'command-separator' },
	template: ``,
})
export class CapsCommandSeparator {
	constructor() {
		classes(() => 'caps-command-separator block data-hidden:hidden');
	}
}

@Component({
	selector: 'caps-command-shortcut',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'command-shortcut' },
	template: `
		<ng-content />
	`,
})
export class CapsCommandShortcut {
	constructor() {
		classes(() => 'caps-command-shortcut');
	}
}
