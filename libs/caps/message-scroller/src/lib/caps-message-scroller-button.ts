import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	inject,
	input,
	signal,
} from '@angular/core';
import { CapsButton, type CapsButtonSize, type CapsButtonVariant } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowDown } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';
import { CapsMessageScrollerBehavior } from './caps-message-scroller-behavior';
import type { CapsMessageScrollerButtonDirection } from './caps-message-scroller.types';

/** A native jump action projected outside the owned scrolling log. */
@Component({
	selector: 'button[caps-message-scroller-button]',
	imports: [NgIcon],
	providers: [provideIcons({ lucideArrowDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		type: 'button',
		'data-slot': 'message-scroller-button',
		'[attr.aria-label]': 'resolvedAriaLabel()',
		'[attr.data-direction]': 'direction()',
		'[attr.data-active]': 'active() ? "true" : "false"',
		'[attr.inert]': 'active() ? null : ""',
		'[attr.tabindex]': 'active() ? null : -1',
		'[style.opacity]': '_pending() ? "0" : null',
		'(click)': 'jump($event)',
	},
	template: `
		<ng-icon name="lucideArrowDown" aria-hidden="true" />
		<ng-content />
		<span class="sr-only">{{ resolvedAriaLabel() }}</span>
	`,
})
export class CapsMessageScrollerButton extends CapsButton {
	private readonly _controller = inject(CapsMessageScrollerBehavior);
	private readonly _element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
	protected readonly _pending = signal(true);
	public override readonly variant = input<CapsButtonVariant | undefined>('secondary');
	public override readonly size = input<CapsButtonSize | undefined>('icon-sm');
	public readonly direction = input<CapsMessageScrollerButtonDirection>('end');
	public readonly behavior = input<ScrollBehavior>('smooth');
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly active = computed(() =>
		this.direction() === 'end' ? this._controller.scrollable().end : this._controller.scrollable().start,
	);
	public readonly resolvedAriaLabel = computed(
		() => this.ariaLabel() ?? (this.direction() === 'end' ? 'Scroll to end' : 'Scroll to start'),
	);
	constructor() {
		super();
		classes(
			() =>
				'caps-message-scroller-button border-border bg-background text-foreground hover:bg-muted hover:text-foreground absolute inset-s-1/2 -translate-x-1/2 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[direction=end]:bottom-4 data-[direction=start]:top-4 motion-safe:transition-[translate,scale,opacity] motion-safe:duration-(--caps-duration-200) motion-reduce:transition-none motion-reduce:duration-0 rtl:translate-x-1/2 data-[direction=start]:[&_ng-icon]:rotate-180',
		);
		afterNextRender(() => requestAnimationFrame(() => this._pending.set(false)));
	}
	protected jump(event: MouseEvent): void {
		if (event.defaultPrevented || this._element.disabled || !this.active()) return;
		const options = { behavior: this.behavior() };
		const accepted =
			this.direction() === 'end' ? this._controller.scrollToEnd(options) : this._controller.scrollToStart(options);
		if (accepted) this._controller.focusViewport();
	}
}
