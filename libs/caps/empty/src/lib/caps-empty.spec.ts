import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsEmptyImports, type CapsEmptyMediaVariants } from '../index';

@Component({
	selector: 'caps-empty-test',
	imports: [CapsEmptyImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-empty class="border" dir="rtl">
			<caps-empty-media [variant]="variant()">
				<img
					src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
					alt="Team illustration"
				/>
			</caps-empty-media>
			<caps-empty-title><h2>No documents</h2></caps-empty-title>
			<caps-empty-description>
				Create your first document or
				<a href="/guide">read the guide</a>
				.
			</caps-empty-description>
			<caps-empty-actions>
				<button capsButton type="button" (click)="created.set(true)">Create document</button>
				<a capsButton href="/import" variant="outline">Import documents</a>
			</caps-empty-actions>
		</caps-empty>
		@if (created()) {
			<p role="status">Document created</p>
		}
	`,
})
class EmptyHost {
	public readonly variant = signal<CapsEmptyMediaVariants['variant']>(undefined);
	public readonly created = signal(false);
}

@Component({
	selector: 'caps-empty-rich-test',
	imports: [CapsEmptyImports, CapsInput],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-empty>
			<caps-empty-header>
				<caps-empty-title>Find a document</caps-empty-title>
				<caps-empty-description>Try another search.</caps-empty-description>
			</caps-empty-header>
			<caps-empty-content>
				<label for="empty-search">Search documents</label>
				<input capsInput id="empty-search" value="report" />
			</caps-empty-content>
		</caps-empty>
	`,
})
class RichEmptyHost {}

describe('CapsEmpty public composition', () => {
	it('projects direct anatomy without implicit announcement, heading or media roles', () => {
		const fixture = TestBed.createComponent(EmptyHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const empty = root.querySelector('caps-empty');
		expect(empty?.hasAttribute('role')).toBe(false);
		expect(empty?.hasAttribute('aria-live')).toBe(false);
		expect(empty?.classList.contains('border')).toBe(true);
		expect(empty?.getAttribute('dir')).toBe('rtl');
		expect(
			empty?.querySelectorAll(
				':scope > caps-empty-media,:scope > caps-empty-title,:scope > caps-empty-description,:scope > caps-empty-actions',
			),
		).toHaveLength(4);
		expect(empty?.querySelector('h2')?.textContent).toBe('No documents');
		expect(empty?.querySelectorAll('[role="heading"],h1,h2,h3,h4,h5,h6')).toHaveLength(1);
		expect(empty?.querySelector('img')?.alt).toBe('Team illustration');
		expect(empty?.querySelector('caps-empty-media')?.hasAttribute('aria-hidden')).toBe(false);
	});
	it('updates the retained media variants without recreating meaningful media', () => {
		const fixture = TestBed.createComponent(EmptyHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const image = root.querySelector('img');
		const initialMedia = root.querySelector('caps-empty-media');
		expect(initialMedia?.hasAttribute('data-variant')).toBe(false);
		expect(initialMedia?.classList.contains('caps-empty-media-default')).toBe(true);
		fixture.componentInstance.variant.set('icon');
		fixture.detectChanges();
		const media = root.querySelector('caps-empty-media');
		expect(media?.getAttribute('data-variant')).toBe('icon');
		expect(media?.classList.contains('caps-empty-media-icon')).toBe(true);
		expect(root.querySelector('img')).toBe(image);
		fixture.componentInstance.variant.set('default');
		fixture.detectChanges();
		expect(media?.getAttribute('data-variant')).toBe('default');
		expect(media?.classList.contains('caps-empty-media-icon')).toBe(false);
		fixture.componentInstance.variant.set(undefined);
		fixture.detectChanges();
		expect(media?.hasAttribute('data-variant')).toBe(false);
		expect(media?.classList.contains('caps-empty-media-default')).toBe(true);
		fixture.componentInstance.variant.set(null);
		fixture.detectChanges();
		expect(media?.classList.contains('caps-empty-media-default')).toBe(false);
		expect(root.querySelector('img')).toBe(image);
	});
	it('preserves native action names and focus while the application owns creation and polite feedback', () => {
		const fixture = TestBed.createComponent(EmptyHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const button = root.querySelector('button');
		expect(button?.textContent).toBe('Create document');
		button?.focus();
		expect(document.activeElement).toBe(button);
		button?.click();
		fixture.detectChanges();
		expect(fixture.componentInstance.created()).toBe(true);
		expect(root.querySelector('[role="status"]')?.textContent).toBe('Document created');
		expect(document.activeElement).toBe(button);
		expect(root.querySelector('caps-empty')?.hasAttribute('role')).toBe(false);
		expect(root.querySelector('caps-empty-actions a')?.getAttribute('href')).toBe('/import');
		expect(root.querySelector('button button,button a,a button,a a,label label')).toBeNull();
	});
	it('supports optional grouping and rich native content with its accessible label and value', () => {
		const fixture = TestBed.createComponent(RichEmptyHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const input = root.querySelector('input');
		expect(root.querySelector('caps-empty-header caps-empty-title')?.textContent).toBe('Find a document');
		expect(root.querySelector('label')?.textContent).toBe('Search documents');
		expect(input?.value).toBe('report');
		expect(input?.labels?.item(0)).toBe(root.querySelector('label'));
		root.querySelector('label')?.click();
		expect(document.activeElement).toBe(input);
		expect(root.querySelectorAll('input')).toHaveLength(1);
	});
});
