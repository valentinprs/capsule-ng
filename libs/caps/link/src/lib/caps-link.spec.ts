import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsLink } from '../index';

@Component({
	selector: 'caps-plain-link-host',
	imports: [CapsLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a capsLink href="/docs" class="font-bold">Docs</a>
	`,
})
class PlainLinkHost {}

function renderPlainLink(): HTMLAnchorElement {
	const fixture = TestBed.createComponent(PlainLinkHost);
	fixture.detectChanges();
	return fixture.nativeElement.querySelector('a');
}

describe('capsLink', () => {
	it('works on a plain <a href> without the router', () => {
		const link = renderPlainLink();

		expect(link.getAttribute('href')).toBe('/docs');
		expect(link.classList).toContain('caps-link');
		expect(link.classList).toContain('caps-link-variant-default');
	});

	it('merges the consumer class', () => {
		expect(renderPlainLink().classList).toContain('font-bold');
	});

	it('is not marked as the current page outside of a breadcrumb', () => {
		expect(renderPlainLink().hasAttribute('aria-current')).toBe(false);
	});
});
