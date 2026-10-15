import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { userEvent } from '@vitest/browser/context';
import { CapsKbd, CapsKbdGroup } from './index';
@Component({
	imports: [CapsKbd, CapsKbdGroup],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button type="button">
			Save
			<caps-kbd-group aria-label="Control and S">
				<kbd capsKbd>Ctrl</kbd>
				<kbd capsKbd>S</kbd>
			</caps-kbd-group>
		</button>
		<input aria-label="Editor" />
	`,
})
class Host {}
it('keeps native key hints noninteractive and installs no global shortcut listeners', async () => {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	const keys = el.querySelectorAll('kbd');
	expect(keys).toHaveLength(2);
	for (const key of Array.from(keys)) {
		expect(key.classList.contains('caps-kbd')).toBe(true);
		expect(key.tabIndex).toBe(-1);
		expect(key.hasAttribute('role')).toBe(false);
	}
	const button = el.querySelector('button')!;
	button.focus();
	await userEvent.keyboard('{Control>}k{/Control}');
	expect(document.querySelector('[role=dialog]')).toBeNull();
	expect(document.activeElement).toBe(button);
	await userEvent.tab();
	expect(document.activeElement).toBe(el.querySelector('input'));
	expect(el.querySelector('button button, button input')).toBeNull();
});
