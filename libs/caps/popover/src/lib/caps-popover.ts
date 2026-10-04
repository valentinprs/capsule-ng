import { Dir, Directionality, type Direction } from '@angular/cdk/bidi';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	contentChild,
	effect,
	inject,
	Injector,
	input,
	model,
	output,
	signal,
	TemplateRef,
	untracked,
	viewChild,
} from '@angular/core';
import { CapsFloatingDirection } from './caps-floating-direction';
import { CapsFloatingLayer } from './caps-floating-layer';
import { CapsPopoverContent } from './caps-popover-content';
@Component({
	selector: 'caps-popover',
	exportAs: 'capsPopover',
	imports: [NgTemplateOutlet],
	providers: [CapsFloatingDirection, { provide: Directionality, useExisting: CapsFloatingDirection }],
	viewProviders: [{ provide: Directionality, useExisting: CapsFloatingDirection }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsFloatingLayer,
			inputs: ['placement', 'autoAlign', 'caret', 'dropShadow', 'highContrast', 'alignmentAxisOffset'],
		},
	],
	host: { '[attr.dir]': '_direction.valueSignal()' },
	template: `
		<ng-content />
		<ng-template #portal>
			@if (_content(); as content) {
				<div
					class="caps-floating-content caps-popover-content"
					[class]="content.className()"
					[attr.data-state]="layer.stateComputed()"
					[attr.data-placement]="layer.activePlacement()"
					[attr.dir]="layer.direction()"
					[style.--caps-caret-cross]="layer.originCrossSize() / 2 + 'px'"
					[style.--caps-caret-axis]="layer.caretAxisOffset() + 'px'"
					[attr.data-caret]="layer.caret()"
					[attr.data-drop-shadow]="layer.dropShadow()"
					[attr.data-high-contrast]="layer.highContrast()"
				>
					<ng-container
						[ngTemplateOutlet]="content.template"
						[ngTemplateOutletContext]="{ $implicit: { close: close } }"
					/>
				</div>
			}
		</ng-template>
	`,
})
export class CapsPopover {
	public readonly open = model(false);
	public readonly dir = input<Direction | undefined>();
	private readonly _nativeDir = inject(Dir, { self: true, optional: true });
	protected readonly _direction = inject(CapsFloatingDirection);
	/** Standard ARIA name for the dialog; otherwise its trigger supplies the name. */
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	private readonly _document = inject(DOCUMENT);
	// Carbon Angular event name is intentionally preserved.
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	public readonly onOpen = output<void>();
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	public readonly onClose = output<void>();
	public readonly layer = inject(CapsFloatingLayer);
	protected readonly _content = contentChild(CapsPopoverContent);
	private readonly _portal = viewChild.required<TemplateRef<unknown>>('portal');
	private readonly _injector = inject(Injector);
	public readonly close = () => this.layer.close();
	constructor() {
		effect(() => {
			this._direction.explicit.set(this.dir());
		});
		effect(() => {
			if (this._nativeDir) this._nativeDir.dir = this._direction.valueSignal();
		});
		this.layer.stateChanged.subscribe((state) => {
			const isOpen = state === 'open';
			this.open.set(isOpen);
			if (isOpen) this.onOpen.emit();
			else this.onClose.emit();
		});
		afterNextRender(() => {
			this.layer.registerContent(this._portal(), signal(undefined), signal(undefined));
			effect(
				() => {
					const state = this.layer.stateComputed();
					const label = this.ariaLabel();
					const labelledBy = this.ariaLabelledBy();
					if (state !== 'open') return;
					const pane = this._document.getElementById(this.layer.id());
					const trigger = this.layer.originElement();
					if (labelledBy) {
						pane?.setAttribute('aria-labelledby', labelledBy);
						pane?.removeAttribute('aria-label');
					} else {
						pane?.removeAttribute('aria-labelledby');
						pane?.setAttribute(
							'aria-label',
							label ?? trigger?.getAttribute('aria-label') ?? trigger?.textContent?.trim() ?? '',
						);
					}
				},
				{ injector: this._injector },
			);
			effect(
				() => {
					const open = this.open();
					untracked(() => (open ? this.layer.open() : this.layer.close()));
				},
				{ injector: this._injector },
			);
		});
	}
}
