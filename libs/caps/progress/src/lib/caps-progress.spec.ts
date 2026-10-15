import { ChangeDetectionStrategy, Component, createComponent, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { CapsProgress, CapsProgressImports } from '../index';

@Component({
	imports: [CapsProgressImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<p id="upload-label">Upload</p>
		<caps-progress
			id="upload"
			[value]="value"
			[max]="max"
			[getValueLabel]="format"
			aria-labelledby="upload-label"
			aria-describedby="upload-help"
		/>
		<p id="upload-help">Keep open</p>
	`,
})
class Host {
	public value: number | null | undefined = 75;
	public max = 150;
	public format = (value: number, max: number) => `${value} of ${max} MB`;
}

describe('CapsProgress public Spartan contract', () => {
	it('is the single Brain progressbar with its own indicator and native external associations', async () => {
		const { container } = await render(Host);
		const progress = container.querySelector('caps-progress')!;
		expect(container.querySelectorAll('[role="progressbar"]').length).toBe(1);
		expect(progress.getAttribute('role')).toBe('progressbar');
		expect(progress.getAttribute('aria-valuenow')).toBe('75');
		expect(progress.getAttribute('aria-valuemax')).toBe('150');
		expect(progress.getAttribute('aria-valuetext')).toBe('75 of 150 MB');
		expect(progress.getAttribute('aria-labelledby')).toBe('upload-label');
		expect(progress.getAttribute('aria-describedby')).toBe('upload-help');
		expect(progress.querySelector('#upload-label')).toBeNull();
		expect(progress.querySelector<HTMLElement>('.caps-progress-indicator')!.style.width).toBe('50%');
		expect(container.querySelector('[aria-live],[tabindex]')).toBeNull();
	});
	it.each([null, undefined])('preserves Brain indeterminate semantics for %s', async (value) => {
		const { container } = await render(Host, { componentProperties: { value } });
		const progress = container.querySelector('caps-progress')!;
		expect(progress.getAttribute('data-state')).toBe('indeterminate');
		expect(progress.hasAttribute('aria-valuenow')).toBe(false);
		expect(progress.hasAttribute('aria-valuetext')).toBe(false);
	});
	it.each([-1, 151])('preserves the public Brain validation error for out-of-range value %s', async (value) => {
		await expect(render(Host, { componentProperties: { value } })).rejects.toThrow(
			'Value must be 0 or greater and less or equal to max',
		);
	});
	it('updates completion and formatted value text without adding live announcements', async () => {
		const { container, rerender } = await render(Host);
		const progress = container.querySelector('caps-progress')!;
		await rerender({ componentProperties: { value: 150 } });
		expect(progress.getAttribute('data-state')).toBe('complete');
		expect(progress.getAttribute('aria-valuetext')).toBe('150 of 150 MB');
		expect(progress.getAttribute('aria-busy')).toBe('false');
		await rerender({ componentProperties: { value: 30 } });
		expect(progress.getAttribute('data-state')).toBe('loading');
		expect(progress.getAttribute('aria-busy')).toBe('true');
		expect(container.querySelector('[aria-live]')).toBeNull();
	});
	it('keeps native naming on the actual role without generating additional label/helper IDs', async () => {
		const { container } = await render(
			`<caps-progress aria-label="Preparing document" aria-describedby="help" /><p id="help">Keep open</p>`,
			{ imports: [CapsProgressImports] },
		);
		const progress = container.querySelector('caps-progress')!;
		expect(progress.getAttribute('aria-label')).toBe('Preparing document');
		expect(progress.getAttribute('aria-describedby')).toBe('help');
		expect(progress.hasAttribute('aria-labelledby')).toBe(false);
		expect(progress.hasAttribute('id')).toBe(false);
		expect(container.querySelectorAll('[id]').length).toBe(1);
	});
	it('uses native class sizing and the default Spartan maximum', async () => {
		const { container } = await render(
			`<caps-progress id="file" class="h-1 w-80" [value]="25" aria-label="Upload" />`,
			{ imports: [CapsProgressImports] },
		);
		const progress = container.querySelector('caps-progress')!;
		expect(progress.id).toBe('file');
		expect(progress.classList.contains('h-1')).toBe(true);
		expect(progress.classList.contains('w-80')).toBe(true);
		expect(progress.getAttribute('aria-valuemax')).toBe('100');
		expect(progress.getAttribute('aria-valuetext')).toBe('25%');
		expect(progress.querySelector<HTMLElement>('.caps-progress-indicator')!.style.width).toBe('25%');
	});
	it('preserves an existing SSR host ID and native name with the Brain host directive', async () => {
		await render(`<caps-progress aria-label="Another upload" />`, { imports: [CapsProgressImports] });
		const host = document.createElement('caps-progress');
		host.id = 'existing-progress';
		host.setAttribute('aria-label', 'Upload');
		document.body.append(host);
		const component = createComponent(CapsProgress, {
			hostElement: host,
			environmentInjector: TestBed.inject(EnvironmentInjector),
		});
		component.setInput('value', 30);
		component.changeDetectorRef.detectChanges();
		try {
			expect(host.id).toBe('existing-progress');
			expect(host.getAttribute('aria-label')).toBe('Upload');
			expect(host.getAttribute('role')).toBe('progressbar');
			expect(host.getAttribute('aria-valuenow')).toBe('30');
		} finally {
			component.destroy();
			host.remove();
		}
	});
});
