import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '../index';

@Component({
	selector: 'caps-button-group-test',
	imports: [CapsButtonGroupImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-button-group [fluid]="fluid()" [stacked]="stacked()" aria-label="Actions">
			<button capsButton (click)="count = count + 1">Save</button>
			<caps-separator orientation="vertical" />
			<a capsButton href="#cancel">Cancel</a>
			<caps-button-group-text>Text</caps-button-group-text>
		</caps-button-group>
	`,
})
class Host {
	public readonly fluid = signal(false);
	public readonly stacked = signal(false);
	public count = 0;
}

it('projects native controls and noninteractive text without selection or extra controls', () => {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	const group: HTMLElement = fixture.nativeElement.querySelector('caps-button-group');
	expect(group.getAttribute('role')).toBe('group');
	expect(group.getAttribute('aria-label')).toBe('Actions');
	expect(group.querySelectorAll('button,a').length).toBe(2);
	expect(group.querySelector('a')?.getAttribute('href')).toBe('#cancel');
	expect(group.querySelector('caps-button-group-text')?.textContent).toBe('Text');
	expect(group.getAttribute('tabindex')).toBeNull();
	expect(group.querySelector('[aria-pressed]')).toBeNull();
	group.querySelector('button')?.click();
	expect(fixture.componentInstance.count).toBe(1);
});

it('defaults to a non-fluid row and lets Carbon fluid override stacked', () => {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	const group: HTMLElement = fixture.nativeElement.querySelector('caps-button-group');
	expect(group.dataset['fluid']).toBe('false');
	expect(group.dataset['stacked']).toBe('false');
	fixture.componentInstance.stacked.set(true);
	fixture.detectChanges();
	expect(group.dataset['stacked']).toBe('true');
	fixture.componentInstance.fluid.set(true);
	fixture.detectChanges();
	expect(group.dataset['fluid']).toBe('true');
	expect(group.dataset['stacked']).toBe('false');
	fixture.componentInstance.fluid.set(false);
	fixture.detectChanges();
	expect(group.dataset['stacked']).toBe('true');
});
