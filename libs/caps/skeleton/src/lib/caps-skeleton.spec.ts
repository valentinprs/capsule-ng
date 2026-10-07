import { render } from '@testing-library/angular';
import { CapsSkeletonImports } from '../index';
describe('CapsSkeleton public contract', () => {
	it('keeps placeholders decorative and preserves dimensions while the region owns busy state', async () => {
		const { container } = await render(
			`<section aria-label="Profile" aria-busy="true"><caps-skeleton class="h-4 w-48 rounded-full" /></section>`,
			{ imports: [CapsSkeletonImports] },
		);
		const skeleton = container.querySelector('caps-skeleton')!;
		expect(skeleton.getAttribute('aria-hidden')).toBe('true');
		expect(skeleton.classList.contains('rounded-full')).toBe(true);
		expect(skeleton.classList.contains('caps-skeleton')).toBe(true);
		expect(skeleton.hasAttribute('role')).toBe(false);
		expect(skeleton.hasAttribute('aria-busy')).toBe(false);
		expect(skeleton.textContent).toBe('');
		expect(container.querySelector('[aria-live]')).toBeNull();
	});
});
