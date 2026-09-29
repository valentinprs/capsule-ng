import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsButtonImports, type CapsButtonSize, type CapsButtonVariant } from '../index';

@Component({
	selector: 'caps-button-host',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton [variant]="variant()" [size]="size()" class="font-bold" (click)="clicks.set(clicks() + 1)">
			Save
		</button>
	`,
})
class ButtonHost {
	public readonly variant = input<CapsButtonVariant | undefined>(undefined);
	public readonly size = input<CapsButtonSize | undefined>(undefined);
	public readonly clicks = signal(0);
}

function render(inputs: { variant?: CapsButtonVariant; size?: CapsButtonSize } = {}) {
	const fixture = TestBed.createComponent(ButtonHost);
	for (const [name, value] of Object.entries(inputs)) fixture.componentRef.setInput(name, value);
	fixture.detectChanges();
	const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
	return { button, host: fixture.componentInstance };
}

describe('capsButton', () => {
	it('applies the default variant and size', () => {
		const { button } = render();

		expect(button.classList).toContain('caps-button');
		expect(button.classList).toContain('caps-button-variant-default');
		expect(button.classList).toContain('caps-button-size-default');
	});

	it('applies the ghost variant and the icon size', () => {
		const { button } = render({ variant: 'ghost', size: 'icon' });

		expect(button.classList).toContain('caps-button-variant-ghost');
		expect(button.classList).toContain('caps-button-size-icon');
		expect(button.classList).not.toContain('caps-button-variant-default');
		expect(button.classList).not.toContain('caps-button-size-default');
	});

	it('merges the consumer class', () => {
		expect(render().button.classList).toContain('font-bold');
	});

	it('keeps the native button semantics', () => {
		const { button } = render({ variant: 'ghost', size: 'icon' });

		expect(button.tagName).toBe('BUTTON');
		expect(button.hasAttribute('role')).toBe(false);
		expect(button.hasAttribute('tabindex')).toBe(false);
	});

	it('keeps native focus and activation', () => {
		const { button, host } = render({ variant: 'ghost', size: 'icon' });

		button.focus();
		expect(document.activeElement).toBe(button);

		button.click();
		expect(host.clicks()).toBe(1);
	});
});
