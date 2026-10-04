import { Dir } from '@angular/cdk/bidi';
import overlayStyles from '@angular/cdk/overlay-prebuilt.css?raw';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { CapsPopoverImports, type CapsPlacement } from '../index';

@Component({
	imports: [CapsPopoverImports, CapsTooltipImports, CapsHoverCardImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div [dir]="parentDir()">
			<caps-popover
				[(open)]="open"
				[placement]="placement()"
				[autoAlign]="autoAlign()"
				[alignmentAxisOffset]="offset()"
				[caret]="caret()"
				[dropShadow]="shadow()"
				[highContrast]="contrast()"
				[dir]="dir()"
				aria-label="Dimensions"
				(onOpen)="opened = opened + 1"
				(onClose)="closed = closed + 1"
			>
				<button capsPopoverTrigger style="margin:50px; width:100px; height:40px">Dimensions</button>
				<ng-template capsPopoverContent [class]="'custom-panel'" let-ctx>
					<label>
						Width
						<input />
					</label>
					<button capsTooltip="Nested detail" [enterDelayMs]="0" id="nested-tooltip">Nested help</button>
					<button capsPopoverClose>Close</button>
				</ng-template>
			</caps-popover>
			<p id="existing-description">Existing description</p>
			<button
				capsTooltip="Extra detail"
				[placement]="tooltipPlacement()"
				aria-describedby="existing-description"
				[tooltipDisabled]="disabled()"
				[enterDelayMs]="enterDelay()"
				[leaveDelayMs]="leaveDelay()"
				id="tooltip-trigger"
			>
				Help
			</button>
			<button capsTooltip="   " [enterDelayMs]="0" id="empty-trigger">Empty</button>
			<ng-template #detail let-data>
				<span>Context: {{ data }}</span>
			</ng-template>
			<button [capsTooltip]="detail" templateContext="sample" [enterDelayMs]="0" id="template-trigger">Template</button>
			<caps-hover-card>
				@if (hoverTrigger()) {
					<a
						href="#person"
						capsHoverCardTrigger
						[placement]="hoverPlacement()"
						[sideOffset]="hoverOffset()"
						[showDelay]="0"
						[hideDelay]="0"
						[animationDelay]="0"
						id="hover-trigger"
					>
						Person
					</a>
				}
				<ng-template capsHoverCardContent><p>Person preview</p></ng-template>
			</caps-hover-card>
		</div>
	`,
})
class FloatingHost {
	public readonly tooltipPlacement = signal<CapsPlacement>('bottom');
	public readonly hoverTrigger = signal(true);
	public readonly hoverPlacement = signal<'top' | 'bottom' | 'left' | 'right'>('bottom');
	public readonly hoverOffset = signal(5);
	public readonly open = signal(false);
	public readonly placement = signal<CapsPlacement>('bottom');
	public readonly autoAlign = signal(false);
	public readonly offset = signal<number | undefined>(undefined);
	public readonly caret = signal(true);
	public readonly shadow = signal(true);
	public readonly contrast = signal(false);
	public readonly parentDir = signal<'ltr' | 'rtl'>('ltr');
	public readonly dir = signal<'ltr' | 'rtl' | undefined>('ltr');
	public readonly disabled = signal(false);
	public readonly enterDelay = signal(0);
	public readonly leaveDelay = signal(0);
	public opened = 0;
	public closed = 0;
}

describe('Capsule floating content', () => {
	let style: HTMLStyleElement;
	beforeEach(() => {
		style = document.createElement('style');
		style.textContent = overlayStyles + '.caps-popover-content{width:280px}';
		document.head.appendChild(style);
	});
	const create = async () => {
		const fixture = TestBed.createComponent(FloatingHost);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const trigger: HTMLElement = fixture.nativeElement.querySelector('[capsPopoverTrigger]');
		Object.assign(trigger.style, {
			position: 'fixed',
			left: `${window.innerWidth / 2 - 50}px`,
			top: `${window.innerHeight / 2 - 20}px`,
			margin: '0',
		});
		return fixture;
	};
	const pointer = (element: Element, type: string, pointerType = 'mouse') =>
		element.dispatchEvent(new PointerEvent(type, { pointerType }));
	const tick = async () => {
		await new Promise((resolve) => setTimeout(resolve, 20));
	};
	afterEach(() => {
		TestBed.resetTestingModule();
		style.remove();
	});

	it('inherits reactive parent direction and supports an explicit root override', async () => {
		const f = await create();
		f.componentInstance.dir.set(undefined);
		f.componentInstance.parentDir.set('rtl');
		f.detectChanges();
		await f.whenStable();
		(f.nativeElement.querySelector('[capsPopoverTrigger]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')?.getAttribute('dir')).toBe('rtl');
		});
		f.componentInstance.dir.set('ltr');
		f.detectChanges();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')?.getAttribute('dir')).toBe('ltr');
		});
		f.componentInstance.dir.set(undefined);
		f.detectChanges();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')?.getAttribute('dir')).toBe('rtl');
		});
	});

	it('inherits parent direction for hover card content', async () => {
		const f = await create();
		f.componentInstance.parentDir.set('rtl');
		f.detectChanges();
		await f.whenStable();
		(f.nativeElement.querySelector('#hover-trigger') as HTMLElement).focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-hover-card-content')?.getAttribute('dir')).toBe('rtl');
		});
	});

	it('creates lazy popover content, synchronizes open and dismisses on Escape with focus restored', async () => {
		const f = await create();
		const trigger: HTMLButtonElement = f.nativeElement.querySelector('[capsPopoverTrigger]');
		expect(document.querySelector('[role="dialog"]')).toBeNull();
		trigger.focus();
		trigger.click();
		f.detectChanges();
		await f.whenStable();
		f.detectChanges();
		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		expect(f.componentInstance.open()).toBe(true);
		expect(f.componentInstance.opened).toBe(1);
		expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('Dimensions');
		expect(document.querySelector('.custom-panel')).not.toBeNull();
		document.querySelector('input')?.focus();
		document.querySelector('input')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="dialog"]')).toBeNull();
		});
		expect(f.componentInstance.open()).toBe(false);
		expect(f.componentInstance.closed).toBe(1);
		expect(document.activeElement).toBe(trigger);
	});

	it('supports programmatic open and its native close action', async () => {
		const f = await create();
		f.componentInstance.open.set(true);
		f.detectChanges();
		await f.whenStable();
		f.detectChanges();
		await vi.waitFor(() => expect(document.querySelector('[capsPopoverClose]')).not.toBeNull());
		(document.querySelector('[capsPopoverClose]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(f.componentInstance.open()).toBe(false);
		});
	});

	it.each([
		'top',
		'top-start',
		'top-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end',
		'right',
		'right-start',
		'right-end',
	] as const)('applies fixed Carbon placement %s without automatic flipping', async (placement) => {
		const f = await create();
		f.componentInstance.placement.set(placement);
		f.detectChanges();
		(f.nativeElement.querySelector('[capsPopoverTrigger]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')?.getAttribute('data-placement')).toBe(placement);
		});
	});

	it('applies appearance flags and ignores an alignment offset on centered placement', async () => {
		const f = await create();
		f.componentInstance.autoAlign.set(true);
		f.componentInstance.offset.set(50);
		f.componentInstance.caret.set(false);
		f.componentInstance.shadow.set(false);
		f.componentInstance.contrast.set(true);
		f.detectChanges();
		(f.nativeElement.querySelector('[capsPopoverTrigger]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')).not.toBeNull();
		});
		const content = document.querySelector<HTMLElement>('.caps-popover-content')!;
		expect(content.dataset['caret']).toBe('false');
		expect(content.dataset['dropShadow']).toBe('false');
		expect(content.dataset['highContrast']).toBe('true');
		expect(content.style.getPropertyValue('--caps-caret-axis')).toBe('0px');
	});

	it.each([
		['bottom-start', 'ltr', 20],
		['bottom-end', 'ltr', -20],
		['bottom-start', 'rtl', -20],
		['bottom-end', 'rtl', 20],
	] as const)('maps alignment axis offset for %s in %s', async (placement, dir, expected) => {
		const f = await create();
		style.textContent += '.custom-panel{width:160px}';
		f.componentInstance.placement.set(placement);
		f.componentInstance.dir.set(dir);
		f.componentInstance.autoAlign.set(true);
		f.componentInstance.offset.set(20);
		f.detectChanges();
		(f.nativeElement.querySelector('[capsPopoverTrigger]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-popover-content')).not.toBeNull();
		});
		const panel = document.querySelector<HTMLElement>('.caps-popover-content')!;
		expect(panel.style.getPropertyValue('--caps-caret-axis')).toBe(`${expected}px`);
		const trigger = f.nativeElement.querySelector('[capsPopoverTrigger]').getBoundingClientRect();
		const box = panel.getBoundingClientRect();
		const startAtLeft = (placement.endsWith('start') && dir === 'ltr') || (placement.endsWith('end') && dir === 'rtl');
		expect(Math.round(startAtLeft ? box.left - trigger.left : box.right - trigger.right)).toBe(expected);
	});

	it('keeps tooltip focus and merges/restores existing description ids', async () => {
		const f = await create();
		const trigger: HTMLButtonElement = f.nativeElement.querySelector('#tooltip-trigger');
		trigger.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		});
		expect(document.activeElement).toBe(trigger);
		const tooltip = document.querySelector('[role="tooltip"]')!;
		expect(trigger.getAttribute('aria-describedby')?.split(' ')).toEqual(['existing-description', tooltip.id]);
		expect(tooltip.querySelectorAll('button,a,input,[tabindex]')).toHaveLength(0);
		trigger.setAttribute('aria-describedby', `${trigger.getAttribute('aria-describedby')} added-by-consumer`);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).toBeNull();
		});
		expect(trigger.getAttribute('aria-describedby')).toBe('existing-description added-by-consumer');
	});

	it('keeps a tooltip open while its focused trigger loses hover and while content is hovered', async () => {
		const f = await create();
		const trigger: HTMLButtonElement = f.nativeElement.querySelector('#tooltip-trigger');
		trigger.focus();
		pointer(trigger, 'pointerenter');
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-tooltip-content')).not.toBeNull();
		});
		pointer(trigger, 'pointerleave');
		await tick();
		f.detectChanges();
		expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		const content = document.querySelector('.caps-tooltip-content')!;
		pointer(content, 'pointerenter');
		trigger.blur();
		await tick();
		f.detectChanges();
		expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		pointer(content, 'pointerleave');
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).toBeNull();
		});
	});

	it('cancels delayed tooltip opening with Escape and never opens for touch or blank content', async () => {
		const f = await create();
		f.componentInstance.enterDelay.set(50);
		f.detectChanges();
		const trigger = f.nativeElement.querySelector('#tooltip-trigger');
		pointer(trigger, 'pointerenter');
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 80));
		f.detectChanges();
		expect(document.querySelector('[role="tooltip"]')).toBeNull();
		pointer(trigger, 'pointerenter', 'touch');
		pointer(f.nativeElement.querySelector('#empty-trigger'), 'pointerenter');
		await tick();
		f.detectChanges();
		expect(document.querySelector('[role="tooltip"]')).toBeNull();
	});

	it('removes a tooltip immediately when disabled and on trigger destruction', async () => {
		const f = await create();
		const trigger: HTMLButtonElement = f.nativeElement.querySelector('#tooltip-trigger');
		trigger.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		});
		f.componentInstance.disabled.set(true);
		f.detectChanges();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).toBeNull();
		});
		expect(trigger.getAttribute('aria-describedby')).toBe('existing-description');
		f.destroy();
		expect(document.querySelector('[role="tooltip"]')).toBeNull();
	});

	it('renders template content with Carbon implicit templateContext', async () => {
		const f = await create();
		(f.nativeElement.querySelector('#template-trigger') as HTMLButtonElement).focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')?.textContent).toContain('Context: sample');
		});
	});

	it('does not reopen focused Tooltip or Hover Card on pointerleave after Escape, but permits fresh focus', async () => {
		const f = await create();
		for (const [id, content] of [
			['tooltip-trigger', '[role="tooltip"]'],
			['hover-trigger', '.caps-hover-card-content'],
		]) {
			const trigger: HTMLElement = f.nativeElement.querySelector('#' + id);
			trigger.focus();
			pointer(trigger, 'pointerenter');
			await vi.waitFor(() => {
				f.detectChanges();
				expect(document.querySelector(content)).not.toBeNull();
			});
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
			pointer(trigger, 'pointerleave');
			await tick();
			f.detectChanges();
			expect(document.querySelector(content)).toBeNull();
			trigger.blur();
			trigger.focus();
			await vi.waitFor(() => {
				f.detectChanges();
				expect(document.querySelector(content)).not.toBeNull();
			});
			trigger.blur();
		}
	});
	it('registers a replaced projected hover trigger and updates placement before opening', async () => {
		const f = await create();
		f.componentInstance.hoverTrigger.set(false);
		f.detectChanges();
		await f.whenStable();
		f.componentInstance.hoverPlacement.set('top');
		f.componentInstance.hoverOffset.set(20);
		f.componentInstance.hoverTrigger.set(true);
		f.detectChanges();
		await f.whenStable();
		f.detectChanges();
		const trigger: HTMLElement = f.nativeElement.querySelector('#hover-trigger');
		Object.assign(trigger.style, { position: 'fixed', left: '150px', top: '400px' });
		trigger.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-hover-card-content')?.getAttribute('data-placement')).toBe('top');
		});
		const box = document.querySelector('.caps-hover-card-content')!.getBoundingClientRect();
		expect(Math.round(trigger.getBoundingClientRect().top - box.bottom)).toBe(20);
	});

	it('repositions an open tooltip and lets Escape dismiss only the top overlay', async () => {
		const f = await create();
		const trigger: HTMLElement = f.nativeElement.querySelector('#tooltip-trigger');
		Object.assign(trigger.style, { position: 'fixed', left: '150px', top: '400px' });
		trigger.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		});
		f.componentInstance.tooltipPlacement.set('top');
		f.detectChanges();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-tooltip-content')?.getAttribute('data-placement')).toBe('top');
		});
		const tooltip = document.querySelector('.caps-tooltip-content')!.getBoundingClientRect();
		expect(Math.round(trigger.getBoundingClientRect().top - tooltip.bottom)).toBe(8);
		trigger.blur();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		(f.nativeElement.querySelector('[capsPopoverTrigger]') as HTMLButtonElement).click();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('#nested-tooltip')).not.toBeNull();
		});
		const nested = document.querySelector<HTMLElement>('#nested-tooltip')!;
		nested.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
		});
		nested.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('[role="tooltip"]')).toBeNull();
		});
		expect(document.querySelector('[role="dialog"]')).not.toBeNull();
		expect(document.activeElement).toBe(nested);
	});

	it('opens optional hover previews on focus, cancels with Escape, and preserves the native href', async () => {
		const f = await create();
		const trigger: HTMLAnchorElement = f.nativeElement.querySelector('#hover-trigger');
		expect(trigger.getAttribute('href')).toBe('#person');
		trigger.focus();
		await vi.waitFor(() => {
			f.detectChanges();
			expect(document.querySelector('.caps-hover-card-content')).not.toBeNull();
		});
		expect(document.activeElement).toBe(trigger);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		f.detectChanges();
		expect(document.querySelector('.caps-hover-card-content')).toBeNull();
	});
});
