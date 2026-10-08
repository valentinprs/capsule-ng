import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsAlertImports, type CapsAlertVariants } from '../index';

@Component({
	selector: 'caps-alert-test',
	imports: [CapsAlertImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert [variant]="variant()" class="max-w-md">
			<caps-alert-media><span aria-hidden="true">!</span></caps-alert-media>
			<caps-alert-title>
				<h3><span>Upload failed</span></h3>
			</caps-alert-title>
			<caps-alert-description>
				<p>Your document was not uploaded.</p>
				<a href="/help">Read the upload guide</a>
			</caps-alert-description>
			<caps-alert-actions>
				<button capsButton type="button" (click)="attempts = attempts + 1">Retry upload</button>
				<a capsButton href="/documents" variant="outline">Open documents</a>
			</caps-alert-actions>
		</caps-alert>
	`,
})
class AlertHost {
	public readonly variant = signal<CapsAlertVariants['variant']>('default');
	public attempts = 0;
}

@Component({
	selector: 'caps-alert-dynamic-test',
	imports: [CapsAlertImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (failed()) {
			<caps-alert role="alert" variant="destructive">
				<caps-alert-title>Payment failed</caps-alert-title>
				<caps-alert-description>Try another card.</caps-alert-description>
			</caps-alert>
		}
	`,
})
class DynamicAlertHost {
	public readonly failed = signal(false);
}

@Component({
	selector: 'caps-alert-native-overrides-test',
	imports: [CapsAlertImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert role="status" aria-live="polite"><caps-alert-title>Upload complete</caps-alert-title></caps-alert>
		<caps-alert [attr.role]="role()" [attr.aria-live]="live()">
			<caps-alert-title>Upload progress</caps-alert-title>
		</caps-alert>
	`,
})
class NativeOverridesHost {
	public readonly role = signal<string | null>('status');
	public readonly live = signal<string | null>('polite');
}

describe('CapsAlert public composition', () => {
	it('preserves the documented alert role in default and destructive variants', () => {
		const fixture = TestBed.createComponent(AlertHost);
		fixture.detectChanges();
		const alert: HTMLElement = fixture.nativeElement.querySelector('caps-alert');
		expect(alert.getAttribute('data-variant')).toBe('default');
		expect(alert.classList.contains('caps-alert-variant-default')).toBe(true);
		expect(alert.getAttribute('role')).toBe('alert');
		expect(alert.hasAttribute('aria-live')).toBe(false);
		fixture.componentInstance.variant.set('destructive');
		fixture.detectChanges();
		expect(alert.getAttribute('role')).toBe('alert');
	});
	it('preserves consumer native role and live overrides without a Capsule ARIA prop', () => {
		const fixture = TestBed.createComponent(NativeOverridesHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const alerts = root.querySelectorAll('caps-alert');
		expect(alerts).toHaveLength(2);
		const staticAlert = alerts.item(0);
		const reactiveAlert = alerts.item(1);
		expect(staticAlert.getAttribute('role')).toBe('status');
		expect(staticAlert.getAttribute('aria-live')).toBe('polite');
		expect(reactiveAlert.getAttribute('role')).toBe('status');
		expect(reactiveAlert.getAttribute('aria-live')).toBe('polite');
		fixture.componentInstance.role.set(null);
		fixture.componentInstance.live.set(null);
		fixture.detectChanges();
		expect(reactiveAlert.hasAttribute('role')).toBe(false);
		expect(reactiveAlert.hasAttribute('aria-live')).toBe(false);
		fixture.componentInstance.role.set('alert');
		fixture.componentInstance.live.set('assertive');
		fixture.detectChanges();
		expect(reactiveAlert.getAttribute('role')).toBe('alert');
		expect(reactiveAlert.getAttribute('aria-live')).toBe('assertive');
		expect(reactiveAlert.textContent).toContain('Upload progress');
	});
	it('preserves projected content, native headings and controls through both Spartan variants', () => {
		const fixture = TestBed.createComponent(AlertHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const title = root.querySelector('h3');
		const button = root.querySelector('button');
		expect(title?.textContent).toBe('Upload failed');
		expect(root.querySelectorAll('[role="heading"],h1,h2,h3,h4,h5,h6')).toHaveLength(1);
		expect(root.querySelector('caps-alert-media [aria-hidden="true"]')?.textContent).toBe('!');
		for (const variant of ['default', 'destructive'] as const) {
			fixture.componentInstance.variant.set(variant);
			fixture.detectChanges();
			const alert = root.querySelector('caps-alert');
			expect(alert?.getAttribute('data-variant')).toBe(variant);
			expect(alert?.classList.contains(`caps-alert-variant-${variant}`)).toBe(true);
			expect(alert?.classList.contains('max-w-md')).toBe(true);
			expect(root.querySelector('h3')).toBe(title);
			expect(root.querySelector('button')).toBe(button);
		}
	});
	it('retains Spartan optional and null variant semantics without losing projected content', () => {
		const fixture = TestBed.createComponent(AlertHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const alert = root.querySelector('caps-alert');
		const button = root.querySelector('button');
		fixture.componentInstance.variant.set(undefined);
		fixture.detectChanges();
		expect(alert?.hasAttribute('data-variant')).toBe(false);
		expect(alert?.classList.contains('caps-alert-variant-default')).toBe(true);
		fixture.componentInstance.variant.set(null);
		fixture.detectChanges();
		expect(alert?.hasAttribute('data-variant')).toBe(false);
		expect(alert?.classList.contains('caps-alert-variant-default')).toBe(false);
		expect(alert?.classList.contains('caps-alert-variant-destructive')).toBe(false);
		expect(alert?.classList.contains('max-w-md')).toBe(true);
		expect(root.querySelector('button')).toBe(button);
		expect(alert?.getAttribute('role')).toBe('alert');
	});
	it('keeps native action names, links, focus and click behavior without nested controls', () => {
		const fixture = TestBed.createComponent(AlertHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const button = root.querySelector('button');
		expect(button?.textContent).toBe('Retry upload');
		expect(button?.getAttribute('type')).toBe('button');
		button?.focus();
		expect(document.activeElement).toBe(button);
		button?.click();
		expect(fixture.componentInstance.attempts).toBe(1);
		expect(root.querySelector('caps-alert-actions a')?.getAttribute('href')).toBe('/documents');
		expect(root.querySelector('caps-alert-description a')?.textContent).toBe('Read the upload guide');
		expect(root.querySelector('button button,button a,a a,a button')).toBeNull();
	});
	it('supports a newly inserted urgent message and removal without a library focus jump', () => {
		const fixture = TestBed.createComponent(DynamicAlertHost);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('caps-alert')).toBeNull();
		const before = document.activeElement;
		fixture.componentInstance.failed.set(true);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain('Payment failed');
		expect(document.activeElement).toBe(before);
		fixture.componentInstance.failed.set(false);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
	});
});
