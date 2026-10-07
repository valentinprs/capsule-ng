import { CdkObserveContent } from '@angular/cdk/observers';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	type ElementRef,
	input,
	viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { buttonVariants } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { type BrnPaginatedTabHeaderItem, BrnTabsPaginatedList, BrnTabsTrigger } from '@spartan-ng/brain/tabs';
import { classes, hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import type { Observable } from 'rxjs';
import type { CapsTabsType } from './caps-tabs-list';

@Component({
	selector: 'caps-tabs-paginated-list',
	imports: [CdkObserveContent, NgIcon],
	providers: [provideIcons({ lucideChevronRight, lucideChevronLeft })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'tabs-paginated-list',
	},
	template: `
		<button
			#previousPaginator
			data-pagination="previous"
			type="button"
			aria-label="Scroll tabs backward"
			tabindex="-1"
			[class]="_paginationButtonClass()"
			[disabled]="disableScrollBefore || null"
			(click)="_handlePaginatorClick('before')"
			(mousedown)="_handlePaginatorPress('before', $event)"
			(touchend)="_stopInterval()"
		>
			<ng-icon name="lucideChevronLeft" />
		</button>

		<div #tabListContainer class="z-[1] flex grow overflow-hidden" (keydown)="_handleKeydown($event)">
			<div
				class="relative grow transition-transform"
				#tabList
				role="tablist"
				aria-orientation="horizontal"
				[attr.aria-label]="ariaLabel()"
				(cdkObserveContent)="_onContentChanges()"
			>
				<div #tabListInner data-orientation="horizontal" [attr.data-type]="type()" [class]="_tabListClass()">
					<ng-content />
				</div>
			</div>
		</div>

		<button
			#nextPaginator
			data-pagination="next"
			type="button"
			aria-label="Scroll tabs forward"
			tabindex="-1"
			[class]="_paginationButtonClass()"
			[disabled]="disableScrollAfter || null"
			(click)="_handlePaginatorClick('after')"
			(mousedown)="_handlePaginatorPress('after', $event)"
			(touchend)="_stopInterval()"
		>
			<ng-icon name="lucideChevronRight" />
		</button>
	`,
})
export class CapsTabsPaginatedList extends BrnTabsPaginatedList {
	constructor() {
		super();
		classes(() => 'relative flex flex-shrink-0 items-center gap-1 overflow-hidden');
	}

	public readonly items = contentChildren(BrnTabsTrigger, { descendants: false });
	/** Explicitly annotating type to avoid non-portable inferred type */
	public readonly itemsChanges: Observable<ReadonlyArray<BrnPaginatedTabHeaderItem>> = toObservable(this.items);

	public readonly tabListContainer = viewChild.required<ElementRef<HTMLElement>>('tabListContainer');
	public readonly tabList = viewChild.required<ElementRef<HTMLElement>>('tabList');
	public readonly tabListInner = viewChild.required<ElementRef<HTMLElement>>('tabListInner');
	public readonly nextPaginator = viewChild.required<ElementRef<HTMLElement>>('nextPaginator');
	public readonly previousPaginator = viewChild.required<ElementRef<HTMLElement>>('previousPaginator');

	public readonly type = input<CapsTabsType>('contained');
	public readonly ariaLabel = input<string>('Tabs');
	public readonly tabListClass = input<ClassValue>('', { alias: 'tabListClass' });
	protected readonly _tabListClass = computed(() =>
		hlm('caps-tabs-list group/tabs-list inline-flex w-fit items-center justify-center', this.tabListClass()),
	);

	public readonly paginationButtonClass = input<ClassValue>('');
	protected readonly _paginationButtonClass = computed(() =>
		hlm(
			'relative z-[2] select-none disabled:cursor-default',
			buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
			this.paginationButtonClass(),
			this.showPaginationControls() ? 'inline-flex' : 'hidden',
		),
	);

	protected _itemSelected(event: KeyboardEvent) {
		event.preventDefault();
		const item = this.items()[this.focusIndex];
		if (item instanceof BrnTabsTrigger) item.activate();
	}
}
