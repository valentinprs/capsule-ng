import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrnField } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { BrnTextarea } from '@spartan-ng/brain/textarea';
import { CapsLabel, CapsLabelImports } from '../index';

@Component({
	selector: 'caps-label-standalone-host',
	imports: [CapsLabelImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<label capsLabel for="email" class="block font-bold">Email address</label>
		<input id="email" type="email" />
		<label capsLabel for="message" id="message-label">Message</label>
		<textarea id="message"></textarea>
		<label capsLabel for="terms">Accept terms</label>
		<input id="terms" type="checkbox" />
		<!-- Deliberately unassociated: verifies that Brain does not invent a target outside Field. -->
		<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
		<label capsLabel>Unassociated label</label>
		<span capsLabel>A span is not a label</span>
	`,
})
class StandaloneHost {}

@Component({
	selector: 'caps-label-field-host',
	imports: [CapsLabel, BrnField, BrnInput, BrnTextarea],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div brnField>
			<!-- Brain Field infers for from the registered input; the test asserts the resulting association. -->
			<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
			<label capsLabel>Inferred input label</label>
			<input brnInput [id]="inputId()" />
		</div>
		<div brnField>
			<!-- Brain Field infers for from the registered textarea; the test asserts the resulting association. -->
			<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
			<label capsLabel>Inferred textarea label</label>
			<textarea brnTextarea></textarea>
		</div>
		<div brnField>
			<label capsLabel [for]="explicitFor()">Explicit target</label>
			<input brnInput id="inferred-target" />
		</div>
		<input id="explicit-target" />
	`,
})
class FieldHost {
	public readonly inputId = signal('field-email');
	public readonly explicitFor = signal('explicit-target');
}

describe('capsLabel', () => {
	it('styles a native label, preserves its slot and merges consumer classes', () => {
		const fixture = TestBed.createComponent(StandaloneHost);
		fixture.detectChanges();
		const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;

		expect(label.tagName).toBe('LABEL');
		expect(label.getAttribute('data-slot')).toBe('label');
		expect(label.classList).toContain('caps-label');
		expect(label.classList).toContain('font-bold');
		expect(label.classList).toContain('block');
		expect(label.classList).not.toContain('flex');
		expect(label.hasAttribute('role')).toBe(false);
		expect(label.hasAttribute('tabindex')).toBe(false);
		expect(label.classList).not.toContain('group-data-[disabled=true]:pointer-events-none');
		expect(fixture.nativeElement.querySelector('span').hasAttribute('data-slot')).toBe(false);
	});

	it('generates distinct ids and preserves an explicit id', () => {
		const fixture = TestBed.createComponent(StandaloneHost);
		fixture.detectChanges();
		const labels: HTMLLabelElement[] = Array.from(fixture.nativeElement.querySelectorAll('label'));

		expect(labels[0].id).toMatch(/^brn-label-\d+$/);
		expect(labels[2].id).toMatch(/^brn-label-\d+$/);
		expect(labels[0].id).not.toBe(labels[2].id);
		expect(labels[1].id).toBe('message-label');
		expect(labels[3].hasAttribute('for')).toBe(false);
	});

	it('associates native input and textarea controls through for/id', () => {
		const fixture = TestBed.createComponent(StandaloneHost);
		fixture.detectChanges();
		const email: HTMLInputElement = fixture.nativeElement.querySelector('#email');
		const message: HTMLTextAreaElement = fixture.nativeElement.querySelector('#message');

		expect(email.labels?.[0].textContent).toBe('Email address');
		expect(message.labels?.[0].textContent).toBe('Message');
		expect(email.labels?.[0].control).toBe(email);
		expect(message.labels?.[0].control).toBe(message);
	});

	it('keeps native focus and checkbox activation in a real browser', () => {
		const fixture = TestBed.createComponent(StandaloneHost);
		fixture.detectChanges();
		const email: HTMLInputElement = fixture.nativeElement.querySelector('#email');
		const message: HTMLTextAreaElement = fixture.nativeElement.querySelector('#message');
		const terms: HTMLInputElement = fixture.nativeElement.querySelector('#terms');

		email.labels?.[0].click();
		expect(document.activeElement).toBe(email);
		message.labels?.[0].click();
		expect(document.activeElement).toBe(message);
		terms.labels?.[0].click();
		expect(terms.checked).toBe(true);
		terms.labels?.[0].click();
		expect(terms.checked).toBe(false);
		terms.disabled = true;
		terms.labels?.[0].click();
		expect(terms.checked).toBe(false);
	});

	it('infers the input and textarea associations from an optional Brain Field', () => {
		const fixture = TestBed.createComponent(FieldHost);
		fixture.detectChanges();
		const labels: HTMLLabelElement[] = Array.from(fixture.nativeElement.querySelectorAll('label'));
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

		expect(labels[0].htmlFor).toBe('field-email');
		expect(labels[1].htmlFor).toBe(textarea.id);
		expect(labels[1].control).toBe(textarea);

		fixture.componentInstance.inputId.set('updated-email');
		fixture.detectChanges();
		expect(labels[0].htmlFor).toBe('updated-email');
	});

	it('lets an explicit for take precedence and restores Field inference when it is cleared', () => {
		const fixture = TestBed.createComponent(FieldHost);
		fixture.detectChanges();
		const label: HTMLLabelElement = fixture.nativeElement.querySelectorAll('label')[2];

		expect(label.htmlFor).toBe('explicit-target');
		expect(label.control).toBe(fixture.nativeElement.querySelector('#explicit-target'));

		fixture.componentInstance.explicitFor.set('');
		fixture.detectChanges();
		expect(label.htmlFor).toBe('inferred-target');
		expect(label.control).toBe(fixture.nativeElement.querySelector('#inferred-target'));
	});
});
