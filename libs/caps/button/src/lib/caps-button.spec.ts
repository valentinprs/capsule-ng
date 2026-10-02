import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsButtonImports, type CapsButtonSize, type CapsButtonVariant } from '../index';

@Component({
	selector: 'caps-button-host',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button
			capsButton
			[variant]="variant()"
			[size]="size()"
			[disabled]="disabled()"
			class="font-bold"
			(click)="clicks.set(clicks() + 1)"
		>
			Save
		</button>
	`,
})
class ButtonHost {
	public readonly variant = input<CapsButtonVariant | undefined>(undefined);
	public readonly size = input<CapsButtonSize | undefined>(undefined);
	public readonly disabled = input(false);
	public readonly clicks = signal(0);
}

@Component({
	selector: 'caps-button-anchor-host',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a
			capsButton
			href="#caps-button-navigation"
			target="_self"
			[disabled]="disabled()"
			(click)="clicks.set(clicks() + 1)"
		>
			Settings
		</a>
	`,
})
class AnchorHost {
	public readonly disabled = signal(false);
	public readonly clicks = signal(0);
}

function render(inputs: { variant?: CapsButtonVariant; size?: CapsButtonSize; disabled?: boolean } = {}) {
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

	it.each(['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const)(
		'supports the %s variant',
		(variant) => {
			expect(render({ variant }).button.classList).toContain(`caps-button-variant-${variant}`);
		},
	);

	it.each(['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const)(
		'supports the %s size',
		(size) => {
			expect(render({ size }).button.classList).toContain(`caps-button-size-${size}`);
		},
	);

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

	it('disables the native button through the brain disabled input', () => {
		const { button, host } = render({ disabled: true });

		expect(button.disabled).toBe(true);
		expect(button.getAttribute('data-disabled')).toBe('true');

		button.click();
		expect(host.clicks()).toBe(0);
	});

	it('does not mark an enabled button as disabled', () => {
		const { button } = render();

		expect(button.disabled).toBe(false);
		expect(button.hasAttribute('data-disabled')).toBe(false);
	});

	it('preserves native anchor semantics and forwards link attributes', () => {
		const fixture = TestBed.createComponent(AnchorHost);
		fixture.detectChanges();
		const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');

		expect(anchor.classList).toContain('caps-button');
		expect(anchor.getAttribute('href')).toBe('#caps-button-navigation');
		expect(anchor.getAttribute('target')).toBe('_self');
		expect(anchor.hasAttribute('role')).toBe(false);
		expect(anchor.hasAttribute('tabindex')).toBe(false);
		expect(anchor.hasAttribute('disabled')).toBe(false);
		expect(anchor.hasAttribute('aria-disabled')).toBe(false);

		anchor.focus();
		expect(document.activeElement).toBe(anchor);
		const click = new MouseEvent('click', { bubbles: true, cancelable: true });
		anchor.addEventListener('click', (event) => event.preventDefault(), { once: true });
		anchor.dispatchEvent(click);
		expect(fixture.componentInstance.clicks()).toBe(1);
	});

	it('prevents navigation and activation on a disabled anchor, then restores activation', () => {
		const fixture = TestBed.createComponent(AnchorHost);
		fixture.componentInstance.disabled.set(true);
		fixture.detectChanges();
		const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');

		expect(anchor.getAttribute('aria-disabled')).toBe('true');
		expect(anchor.getAttribute('data-disabled')).toBe('true');
		expect(anchor.getAttribute('tabindex')).toBe('-1');
		expect(anchor.hasAttribute('disabled')).toBe(false);
		const disabledClick = new MouseEvent('click', { bubbles: true, cancelable: true });
		expect(anchor.dispatchEvent(disabledClick)).toBe(false);
		expect(disabledClick.defaultPrevented).toBe(true);
		expect(fixture.componentInstance.clicks()).toBe(0);

		fixture.componentInstance.disabled.set(false);
		fixture.detectChanges();
		expect(anchor.hasAttribute('aria-disabled')).toBe(false);
		expect(anchor.hasAttribute('tabindex')).toBe(false);
		anchor.addEventListener('click', (event) => event.preventDefault(), { once: true });
		anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		expect(fixture.componentInstance.clicks()).toBe(1);
	});
});
