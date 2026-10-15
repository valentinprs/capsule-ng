import { Dir } from '@angular/cdk/bidi';
import {
	ChangeDetectionStrategy,
	Component,
	EnvironmentInjector,
	createComponent,
	signal,
	viewChildren,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import '../../../caps-preset.css';
import { CapsResizableGroup, CapsResizableImports, CapsResizablePanel } from '../index';

@Component({
	imports: [CapsResizableImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<main>
			<div [dir]="dir()">
				<caps-resizable-group
					id="workspace"
					style="width:400px;height:200px"
					[direction]="axis()"
					[(layout)]="layout"
					aria-label="Workspace"
				>
					<caps-resizable-panel id="navigation" defaultSize="30" minSize="20" maxSize="50" [collapsible]="false">
						<input aria-label="Navigation filter" />
					</caps-resizable-panel>
					<caps-resizable-handle aria-label="Navigation size" [disabled]="disabled()" withHandle />
					<caps-resizable-panel defaultSize="70" minSize="50" maxSize="80" [collapsible]="false">
						<caps-resizable-group direction="vertical" aria-label="Content sections">
							<caps-resizable-panel defaultSize="40"><p>Header</p></caps-resizable-panel>
							<caps-resizable-handle aria-label="Header height" />
							<caps-resizable-panel defaultSize="60"><p>Content</p></caps-resizable-panel>
						</caps-resizable-group>
					</caps-resizable-panel>
					@if (extra()) {
						<caps-resizable-handle aria-label="Extra panel width" />
						<caps-resizable-panel defaultSize="25">Extra</caps-resizable-panel>
					}
				</caps-resizable-group>
			</div>
		</main>
	`,
})
class Host {
	public readonly panels = viewChildren(CapsResizablePanel);
	public readonly layout = signal<number[]>([]);
	public readonly axis = signal<'horizontal' | 'vertical'>('horizontal');
	public readonly dir = signal<'ltr' | 'rtl'>('ltr');
	public readonly disabled = signal(false);
	public readonly extra = signal(false);
}
@Component({
	imports: [CapsResizableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-resizable-group style="width:400px;height:200px" [(layout)]="layout" aria-label="Three panels">
			<caps-resizable-panel defaultSize="30">
				<caps-resizable-group direction="vertical" aria-label="First sections">
					<caps-resizable-panel defaultSize="40">Header</caps-resizable-panel>
					<caps-resizable-handle aria-label="Nested header height" />
					<caps-resizable-panel defaultSize="60">Content</caps-resizable-panel>
				</caps-resizable-group>
			</caps-resizable-panel>
			<caps-resizable-handle aria-label="First width" />
			<caps-resizable-panel defaultSize="30">Middle</caps-resizable-panel>
			<caps-resizable-handle aria-label="Middle width" />
			<caps-resizable-panel defaultSize="40">Last</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
class NestedOrderingHost {
	public readonly layout = signal<number[]>([]);
}

async function setup() {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	return {
		f,
		root: f.nativeElement as HTMLElement,
		handle: f.nativeElement.querySelector('caps-resizable-handle') as HTMLElement,
	};
}
it('exports an accessible named/value separator associated with the correct direct panel', async () => {
	const { root, handle } = await setup();
	expect(handle.getAttribute('role')).toBe('separator');
	expect(handle.getAttribute('aria-controls')).toBe('navigation');
	expect(handle.getAttribute('aria-valuenow')).toBe('30');
	expect(handle.getAttribute('aria-valuemin')).toBe('20');
	expect(handle.getAttribute('aria-valuemax')).toBe('50');
	expect(handle.getAttribute('aria-orientation')).toBe('vertical');
	expect(handle.tabIndex).toBe(0);
	expect(root.querySelectorAll('caps-resizable-handle span').length).toBe(1);
	const ids = Array.from(root.querySelectorAll('[id]'), (el) => el.id);
	expect(new Set(ids).size).toBe(ids.length);
	expect((await axe.run(root)).violations).toEqual([]);
});
it('supports bounded Arrow/Shift/Home/End keys while keeping the adjacent pair total and focus', async () => {
	const { f, handle } = await setup();
	handle.focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([31, 69]);
	await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([41, 59]);
	await userEvent.keyboard('{End}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([50, 50]);
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([50, 50]);
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([20, 80]);
	expect(document.activeElement).toBe(handle);
});
it('mirrors horizontal keyboard resizing in RTL and uses vertical arrows after direction changes', async () => {
	const { f, handle } = await setup();
	f.componentInstance.dir.set('rtl');
	f.detectChanges();
	handle.focus();
	await userEvent.keyboard('{ArrowLeft}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([31, 69]);
	f.componentInstance.axis.set('vertical');
	f.detectChanges();
	await userEvent.keyboard('{ArrowDown}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([32, 68]);
	expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
});
it('disables keyboard and pointer resizing and removes the disabled handle from sequential focus', async () => {
	const { f, handle } = await setup();
	f.componentInstance.disabled.set(true);
	f.detectChanges();
	handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
	handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, bubbles: true }));
	document.dispatchEvent(new MouseEvent('mousemove', { clientX: 160, bubbles: true }));
	document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([30, 70]);
	expect(handle.hasAttribute('tabindex')).toBe(false);
	expect(handle.getAttribute('aria-disabled')).toBe('true');
});
it('resizes through pointer events and keeps min/max and total percentages', async () => {
	const { f, handle } = await setup();
	const box = handle.getBoundingClientRect();
	handle.dispatchEvent(new MouseEvent('mousedown', { clientX: box.x, clientY: box.y, bubbles: true }));
	document.dispatchEvent(new MouseEvent('mousemove', { clientX: box.x + 40, clientY: box.y, bubbles: true }));
	await new Promise((resolve) => requestAnimationFrame(resolve));
	document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
	f.detectChanges();
	expect(f.componentInstance.layout()[0]).toBeGreaterThan(30);
	expect(f.componentInstance.layout()[0]).toBeLessThanOrEqual(50);
	expect(f.componentInstance.layout().reduce((a, b) => a + b, 0)).toBeCloseTo(100);
});
it('isolates nested groups and handles after a nested panel, with adjacent collapse/restore', async () => {
	const f = TestBed.createComponent(NestedOrderingHost);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	const root = f.nativeElement as HTMLElement;
	const afterNested = root.querySelector<HTMLElement>('caps-resizable-handle[aria-label="Middle width"]')!;
	afterNested.focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([30, 31, 39]);
	const inner = root.querySelector<HTMLElement>('caps-resizable-handle[aria-label="Nested header height"]')!;
	inner.focus();
	await userEvent.keyboard('{ArrowDown}');
	f.detectChanges();
	expect(inner.getAttribute('aria-valuenow')).toBe('41');
	expect(f.componentInstance.layout()).toEqual([30, 31, 39]);
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	expect(inner.getAttribute('aria-valuenow')).toBe('0');
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	expect(inner.getAttribute('aria-valuenow')).toBe('41');
});
it('reconciles dynamic direct panels and explicit controlled layouts without losing projected controls', async () => {
	const { f, root } = await setup();
	const input = root.querySelector('input');
	f.componentInstance.extra.set(true);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	expect(f.componentInstance.layout()).toHaveLength(3);
	expect(f.componentInstance.layout().reduce((a, b) => a + b, 0)).toBeCloseTo(100);
	f.componentInstance.extra.set(false);
	f.detectChanges();
	await f.whenStable();
	f.componentInstance.layout.set([40, 60]);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	expect(root.querySelector('input')).toBe(input);
	expect(root.querySelector('caps-resizable-handle')!.getAttribute('aria-valuenow')).toBe('40');
});

it('initiates native touch resizing and restores the document cursor after the gesture', async () => {
	const { f, handle } = await setup();
	const box = handle.getBoundingClientRect();
	const touch = (x: number) => new Touch({ identifier: 1, target: handle, clientX: x, clientY: box.y });
	handle.dispatchEvent(new TouchEvent('touchstart', { touches: [touch(box.x)], bubbles: true, cancelable: true }));
	document.dispatchEvent(
		new TouchEvent('touchmove', { touches: [touch(box.x + 40)], bubbles: true, cancelable: true }),
	);
	await new Promise((resolve) => requestAnimationFrame(resolve));
	document.dispatchEvent(new TouchEvent('touchend', { touches: [], bubbles: true }));
	f.detectChanges();
	expect(f.componentInstance.layout()[0]).toBeGreaterThan(30);
	expect(document.body.style.cursor).toBe('default');
});
it('preserves server rendered group identity while reserving distinct client IDs', () => {
	const host = document.createElement('caps-resizable-group');
	host.id = 'caps-resizable-group-0';
	document.body.append(host);
	const component = createComponent(CapsResizableGroup, {
		hostElement: host,
		environmentInjector: TestBed.inject(EnvironmentInjector),
	});
	component.changeDetectorRef.detectChanges();
	expect(component.instance.id()).toBe('caps-resizable-group-0');
	const secondHost = document.createElement('caps-resizable-group');
	document.body.append(secondHost);
	const second = createComponent(CapsResizableGroup, {
		hostElement: secondHost,
		environmentInjector: TestBed.inject(EnvironmentInjector),
	});
	second.changeDetectorRef.detectChanges();
	expect(second.instance.id()).not.toBe(component.instance.id());
	component.destroy();
	second.destroy();
	host.remove();
	secondHost.remove();
});

it('preserves imperative panel sizing and keeps accessible handle values synchronized', async () => {
	const { f, handle } = await setup();
	const panels = f.componentInstance.panels();
	panels[0].setSize(35);
	panels[1].setSize(65);
	f.detectChanges();
	expect(handle.getAttribute('aria-valuenow')).toBe('35');
	handle.focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.layout()).toEqual([36, 64]);
});
