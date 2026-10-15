import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	effect,
	inject,
	input,
	numberAttribute,
} from '@angular/core';
import {
	BrnMessageScrollerContent,
	BrnMessageScrollerRoot,
	provideBrnMessageScroller,
} from '@spartan-ng/brain/message-scroller';
import { classes, hlm } from '@spartan-ng/helm/utils';
import { CapsMessageScrollerBehavior, CapsMessageScrollerViewportBehavior } from './caps-message-scroller-behavior';
import type {
	CapsMessageScrollerDefaultScrollPosition,
	CapsMessageScrollerScrollOptions,
} from './caps-message-scroller.types';

/** Owns a conversation viewport, log, spacer and scoped scroll controller. */
@Component({
	selector: 'caps-message-scroller',
	exportAs: 'capsMessageScroller',
	imports: [BrnMessageScrollerContent, CapsMessageScrollerViewportBehavior],
	providers: [CapsMessageScrollerBehavior, provideBrnMessageScroller(CapsMessageScrollerBehavior)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnMessageScrollerRoot],
	host: {
		'data-slot': 'message-scroller',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.aria-live]': 'null',
		'[attr.aria-relevant]': 'null',
		'[attr.aria-busy]': 'null',
		'[attr.tabindex]': 'null',
	},
	template: `
		<div
			capsMessageScrollerViewportBehavior
			data-slot="message-scroller-viewport"
			class="caps-message-scroller-viewport size-full min-h-0 min-w-0 scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain"
			[preserveScrollOnPrepend]="preserveScrollOnPrepend()"
			[attr.aria-labelledby]="ariaLabelledby()"
			[attr.aria-describedby]="ariaDescribedby()"
			[tabindex]="tabIndex()"
			[aria-label]="ariaLabelledby() ? '' : ariaLabel()"
		>
			<div
				brnMessageScrollerContent
				data-slot="message-scroller-content"
				[class]="contentClasses()"
				[aria-relevant]="ariaRelevant()"
				[spacerClassName]="spacerClassName()"
				[attr.aria-label]="ariaLabelledby() ? null : ariaLabel()"
				[attr.aria-labelledby]="ariaLabelledby()"
				[attr.aria-live]="ariaLive()"
				[attr.aria-busy]="ariaBusy() ? 'true' : null"
			>
				<ng-content />
			</div>
		</div>
		<ng-content select="button[caps-message-scroller-button]" />
		<span class="sr-only" role="status" aria-live="polite" aria-atomic="true" data-slot="message-scroller-announcement">
			{{ announcement() }}
		</span>
	`,
})
export class CapsMessageScroller {
	private readonly _controller = inject(CapsMessageScrollerBehavior);
	/** Follow content only while the reader stays at the live edge. */
	public readonly autoScroll = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly defaultScrollPosition = input<CapsMessageScrollerDefaultScrollPosition>('end');
	public readonly scrollEdgeThreshold = input<number, NumberInput>(8, { transform: numberAttribute });
	public readonly scrollPreviousItemPeek = input<number, NumberInput>(64, { transform: numberAttribute });
	public readonly scrollMargin = input<number, NumberInput>(0, { transform: numberAttribute });
	public readonly preserveScrollOnPrepend = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	/** Classes on the owned content: padding/gap remain application-controlled. */
	public readonly contentClass = input('');
	public readonly spacerClassName = input<string | undefined>(undefined);
	public readonly ariaLabel = input('Messages', { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	public readonly tabIndex = input<number, NumberInput>(0, { alias: 'tabindex', transform: numberAttribute });
	public readonly ariaRelevant = input('additions', { alias: 'aria-relevant' });
	/** The transcript stays quiet by default; opt in only with an application history policy. */
	public readonly ariaLive = input<'off' | 'polite' | 'assertive'>('off', { alias: 'aria-live' });
	public readonly ariaBusy = input<boolean, BooleanInput>(false, { alias: 'aria-busy', transform: booleanAttribute });
	/** Localized new-message/completion announcement; do not bind token text or history. */
	public readonly announcement = input('');
	public readonly scrollable = this._controller.scrollable;
	public readonly visibility = this._controller.visibility;
	protected readonly contentClasses = () =>
		hlm('caps-message-scroller-content flex h-max min-h-full flex-col', this.contentClass());
	constructor() {
		classes(
			() =>
				'caps-message-scroller group/message-scroller relative flex size-full min-h-0 min-w-0 flex-col overflow-hidden',
		);
		effect(() =>
			this._controller.configure({
				autoScroll: this.autoScroll(),
				defaultScrollPosition: this.defaultScrollPosition(),
				scrollEdgeThreshold: this.scrollEdgeThreshold(),
				scrollPreviousItemPeek: this.scrollPreviousItemPeek(),
				scrollMargin: this.scrollMargin(),
			}),
		);
		inject(DestroyRef).onDestroy(() => this._controller.destroy());
	}
	public scrollToMessage(messageId: string, options?: CapsMessageScrollerScrollOptions): boolean {
		return this._controller.scrollToMessage(messageId, options);
	}
	public scrollToStart(options?: CapsMessageScrollerScrollOptions): boolean {
		return this._controller.scrollToStart(options);
	}
	public scrollToEnd(options?: CapsMessageScrollerScrollOptions): boolean {
		return this._controller.scrollToEnd(options);
	}
	public observeVisibility(): void {
		this._controller.observeVisibility();
	}
	public unobserveVisibility(): void {
		this._controller.unobserveVisibility();
	}
}
