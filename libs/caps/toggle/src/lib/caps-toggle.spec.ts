import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { userEvent } from '@vitest/browser/context';
import { CapsToggle } from './caps-toggle';

@Component({
	selector: 'caps-toggle-test',
	imports: [CapsToggle],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button
			capsToggle
			[(state)]="state"
			[disabled]="disabled()"
			variant="outline"
			size="sm"
			aria-label="Bold"
			(stateChange)="changes.push($event)"
		>
			B
		</button>
	`,
})
class Host {
	public readonly state = signal<'on' | 'off'>('off');
	public readonly disabled = signal(false);
	public readonly changes: string[] = [];
}

it('keeps one native pressed button, state binding and disabled activation', async () => {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
	expect(button.type).toBe('button');
	expect(button.getAttribute('aria-label')).toBe('Bold');
	expect(button.getAttribute('role')).toBeNull();
	expect(button.getAttribute('aria-pressed')).toBe('false');
	button.focus();
	await userEvent.keyboard('{Enter}');
	fixture.detectChanges();
	expect(fixture.componentInstance.state()).toBe('on');
	expect(button.getAttribute('aria-pressed')).toBe('true');
	await userEvent.keyboard(' ');
	fixture.detectChanges();
	expect(fixture.componentInstance.state()).toBe('off');
	fixture.componentInstance.state.set('on');
	fixture.componentInstance.disabled.set(true);
	fixture.detectChanges();
	button.click();
	await userEvent.keyboard('{Enter}');
	fixture.detectChanges();
	expect(button.disabled).toBe(true);
	expect(fixture.componentInstance.state()).toBe('on');
	expect(fixture.componentInstance.changes).toEqual(['on', 'off']);
	expect(button.classList.contains('caps-toggle-variant-outline')).toBe(true);
	expect(button.classList.contains('caps-toggle-size-sm')).toBe(true);
});
