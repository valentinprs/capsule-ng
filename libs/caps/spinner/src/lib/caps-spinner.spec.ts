import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';
import { render } from '@testing-library/angular';
import { CapsSpinnerImports } from '../index';

@Component({
	imports: [CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-spinner [aria-hidden]="hidden" aria-label="Saving" />
	`,
})
class DecorativeHost {
	public hidden = true;
}

describe('CapsSpinner public Spartan contract', () => {
	it('provides the default named status and a decorative internal icon', async () => {
		const { container } = await render(`<caps-spinner />`, { imports: [CapsSpinnerImports] });
		const spinner = container.querySelector('caps-spinner')!;
		expect(spinner.getAttribute('role')).toBe('status');
		expect(spinner.getAttribute('aria-label')).toBe('Loading');
		expect(spinner.querySelector('ng-icon')!.getAttribute('aria-hidden')).toBe('true');
		expect(container.querySelectorAll('[role="status"]').length).toBe(1);
		expect(spinner.hasAttribute('tabindex')).toBe(false);
	});
	it('removes status/name when decorative and restores them when native aria-hidden changes', async () => {
		const { container, rerender } = await render(DecorativeHost);
		const spinner = container.querySelector('caps-spinner')!;
		expect(spinner.getAttribute('aria-hidden')).toBe('true');
		expect(spinner.hasAttribute('role')).toBe(false);
		expect(spinner.hasAttribute('aria-label')).toBe(false);
		await rerender({ componentProperties: { hidden: false } });
		expect(spinner.hasAttribute('aria-hidden')).toBe(false);
		expect(spinner.getAttribute('role')).toBe('status');
		expect(spinner.getAttribute('aria-label')).toBe('Saving');
	});
	it('preserves Spartan custom icon/native naming and class-based sizing', async () => {
		const { container } = await render(`<caps-spinner icon="lucideLoader" class="text-lg" aria-label="Saving" />`, {
			imports: [CapsSpinnerImports],
			providers: [provideIcons({ lucideLoader })],
		});
		const spinner = container.querySelector('caps-spinner')!;
		expect(spinner.getAttribute('aria-label')).toBe('Saving');
		expect(spinner.classList.contains('text-lg')).toBe(true);
		expect(spinner.querySelector('svg')).not.toBeNull();
	});
});
