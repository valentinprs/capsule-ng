import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import '../../../caps-preset.css';
import { CapsScrollArea, CapsScrollAreaImports } from '../index';

@Component({
	imports: [CapsScrollAreaImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<main>
			<span id="scroll-name">Documents</span>
			<caps-scroll-area
				style="height: 120px; width: 200px"
				[orientation]="axis()"
				[visibility]="visibility()"
				[appearance]="appearance()"
				aria-labelledby="scroll-name"
				aria-describedby="scroll-description"
			>
				<div style="width: 600px">
					<input aria-label="Search documents" [(ngModel)]="search" />
					@for (item of items; track item) {
						<p style="height: 24px; margin:0">
							<a [href]="'#document-' + item">Document {{ item }}</a>
						</p>
					}
				</div>
			</caps-scroll-area>
			<p id="scroll-description">Thirty documents</p>
		</main>
	`,
})
class Host {
	public readonly area = viewChild.required(CapsScrollArea);
	public readonly axis = signal<'auto' | 'vertical' | 'horizontal'>('auto');
	public readonly visibility = signal<'native' | 'hover' | 'visible'>('hover');
	public readonly appearance = signal<'native' | 'compact'>('native');
	public readonly items = Array.from({ length: 30 }, (_, i) => i);
	public search = '';
}
async function setup() {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	return {
		f,
		root: f.nativeElement as HTMLElement,
		viewport: f.nativeElement.querySelector('[data-slot=scroll-area-viewport]') as HTMLElement,
	};
}
it('constrains the native viewport in both axes and routes naming and focus to exactly one viewport', async () => {
	const { root, viewport } = await setup();
	expect(viewport.clientHeight).toBeLessThanOrEqual(120);
	expect(viewport.clientWidth).toBeLessThanOrEqual(200);
	expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
	expect(viewport.scrollWidth).toBeGreaterThan(viewport.clientWidth);
	expect(viewport.getAttribute('aria-labelledby')).toBe('scroll-name');
	expect(viewport.getAttribute('aria-describedby')).toBe('scroll-description');
	expect(root.querySelector('caps-scroll-area')!.hasAttribute('tabindex')).toBe(false);
	viewport.focus();
	expect(document.activeElement).toBe(viewport);
	await userEvent.keyboard('{ArrowDown}');
	await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);
	expect((await axe.run(root)).violations).toEqual([]);
});
it('preserves projected forms and scrolls a focused descendant into view', async () => {
	const { f, root, viewport } = await setup();
	const input = root.querySelector('input')!;
	await userEvent.fill(input, 'Notes');
	f.detectChanges();
	expect(f.componentInstance.search).toBe('Notes');
	const links = root.querySelectorAll<HTMLAnchorElement>('a');
	links[29].focus();
	expect(document.activeElement).toBe(links[29]);
	expect(viewport.scrollTop).toBeGreaterThan(0);
});
it('supports axis restrictions and installed visibility/appearance modes dynamically', async () => {
	const { f, viewport } = await setup();
	f.componentInstance.axis.set('vertical');
	f.componentInstance.visibility.set('visible');
	f.componentInstance.appearance.set('compact');
	f.detectChanges();
	await f.whenStable();
	expect(getComputedStyle(viewport).overflowX).toBe('hidden');
	expect(viewport.getAttribute('visibility')).toBe('visible');
	f.componentInstance.axis.set('horizontal');
	f.detectChanges();
	await f.whenStable();
	expect(getComputedStyle(viewport).overflowY).toBe('hidden');
});

it('preserves the public programmatic normalized scroll and scroll-to-element capabilities', async () => {
	const { f, root, viewport } = await setup();
	await f.componentInstance.area().scrollTo({ top: 100, duration: 0 });
	expect(viewport.scrollTop).toBe(100);
	await f.componentInstance.area().scrollToElement(root.querySelectorAll('a')[29], { duration: 0 });
	expect(viewport.scrollTop).toBeGreaterThan(100);
});
