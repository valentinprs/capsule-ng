import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsAvatarImage, CapsAvatarImports } from '../index';

@Component({
	selector: 'caps-avatar-test',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-avatar>
			<img capsAvatarImage [alt]="alt()" src="data:image/png;base64,invalid" />
			<caps-avatar-fallback>AM</caps-avatar-fallback>
		</caps-avatar>
	`,
})
class AvatarHost {
	public readonly alt = signal('Alice Martin');
	public readonly image = viewChild(CapsAvatarImage, { read: ElementRef<HTMLImageElement> });
}

@Component({
	selector: 'caps-avatar-fallback-test',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<caps-avatar role="img" aria-label="Alice Martin"><caps-avatar-fallback>AM</caps-avatar-fallback></caps-avatar>',
})
class FallbackHost {}

describe('CapsAvatar public composition', () => {
	it('preserves the consumer name of a fallback-only avatar', () => {
		const fixture = TestBed.createComponent(FallbackHost);
		fixture.detectChanges();
		const host = fixture.nativeElement.querySelector('caps-avatar');
		expect(host.getAttribute('role')).toBe('img');
		expect(host.getAttribute('aria-label')).toBe('Alice Martin');
	});
	it('keeps image alternatives available while loading, after errors and after a name change', () => {
		const fixture = TestBed.createComponent(AvatarHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const avatar = root.querySelector('caps-avatar > span');
		expect(avatar?.getAttribute('role')).toBe('img');
		expect(avatar?.getAttribute('aria-label')).toBe('Alice Martin');
		fixture.componentInstance.alt.set('Alice Dupont');
		fixture.detectChanges();
		expect(avatar?.getAttribute('aria-label')).toBe('Alice Dupont');
		const image = fixture.componentInstance.image()?.nativeElement;
		image?.dispatchEvent(new Event('load'));
		fixture.detectChanges();
		expect(root.querySelector('img')?.alt).toBe('Alice Dupont');
		expect(root.querySelector('caps-avatar > span')).toBeNull();
		image?.dispatchEvent(new Event('error'));
		fixture.detectChanges();
		expect(root.querySelector('caps-avatar > span')?.getAttribute('aria-label')).toBe('Alice Dupont');
		expect(root.querySelector('caps-avatar-fallback')?.textContent).toBe('AM');
	});
	it('marks an empty-alt avatar fallback decorative and restores its name reactively', () => {
		const fixture = TestBed.createComponent(AvatarHost);
		fixture.componentInstance.alt.set('');
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		expect(root.querySelector('caps-avatar')?.hasAttribute('role')).toBe(false);
		expect(root.querySelector('caps-avatar > span')?.getAttribute('aria-hidden')).toBe('true');
		fixture.componentInstance.alt.set('Alice');
		fixture.detectChanges();
		expect(root.querySelector('caps-avatar > span')?.getAttribute('aria-label')).toBe('Alice');
	});
});
