import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsSliderImports } from '../index';

@Component({
	imports: [CapsSliderImports, CapsFieldImports, ReactiveFormsModule, FormsModule, FormField, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section role="main" [dir]="direction()">
			<caps-field>
				<caps-field-label>Volume</caps-field-label>
				<caps-slider
					id="volume"
					[formControl]="volume"
					[min]="10"
					[max]="90"
					[step]="5"
					[disabled]="disabled()"
					[valueText]="percent"
					aria-describedby="extra"
				/>
				<caps-field-description>Speaker volume</caps-field-description>
				<caps-field-error>Volume must be at least 50.</caps-field-error>
			</caps-field>
			<span id="extra">External help</span>
			<caps-slider
				id="range"
				[(value)]="range"
				[step]="5"
				[minStepsBetweenThumbs]="2"
				[maxStepsBetweenThumbs]="8"
				[preventStepOverThumb]="true"
				[thumbLabels]="['Minimum budget', 'Maximum budget']"
			/>
			<caps-slider
				id="many"
				[(value)]="many"
				aria-label="Threshold"
				[showTicks]="true"
				[maxTicks]="6"
				[tickLabelInterval]="2"
			/>
			<caps-slider
				id="vertical"
				[(value)]="vertical"
				aria-label="Balance"
				orientation="vertical"
				[inverted]="inverted()"
			/>
			<caps-slider
				id="drag"
				[(value)]="drag"
				aria-label="Interval"
				[draggableRange]="true"
				[draggableRangeOnly]="true"
			/>
			<caps-slider id="model" [(ngModel)]="model" aria-label="Temperature" />
			<caps-slider
				id="array-form"
				[formControl]="arrayForm"
				aria-label="Array form"
				(valueChange)="changes.push($event)"
			/>
			<caps-slider id="signal" [formField]="signalForm.volume" aria-label="Signal volume" />
		</section>
		<button type="button">Outside</button>
	`,
})
class Host {
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly disabled = signal(false);
	public readonly inverted = signal(false);
	public readonly volume = new FormControl([40], { nonNullable: true, validators: [Validators.min(50)] });
	public readonly range = signal([20, 50]);
	public readonly many = signal([10, 40, 70]);
	public readonly vertical = signal([50]);
	public readonly drag = signal([25, 50]);
	public readonly model = signal([30]);
	public readonly arrayForm = new FormControl<number[] | null>([20, 60]);
	public readonly changes: number[][] = [];
	public readonly signalModel = signal({ volume: [35] });
	public readonly signalForm = form(this.signalModel);
	public readonly percent = (value: number) => `${value} percent`;
}
function setup() {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	return fixture;
}
function thumb(el: HTMLElement, id: string) {
	return el.querySelector<HTMLButtonElement>(`button#${id}`)!;
}
async function key(el: HTMLElement, id: string, keys: string) {
	thumb(el, id).focus();
	await userEvent.keyboard(keys);
}

it('owns native focus targets with unique IDs, Field names, descriptions, units and accessible values', async () => {
	const f = setup();
	await f.whenStable();
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	const volume = thumb(el, 'volume');
	expect(volume.type).toBe('button');
	expect(volume.getAttribute('role')).toBe('slider');
	expect(volume.getAttribute('aria-valuenow')).toBe('40');
	expect(volume.getAttribute('aria-valuemin')).toBe('10');
	expect(volume.getAttribute('aria-valuemax')).toBe('90');
	expect(volume.getAttribute('aria-valuetext')).toBe('40 percent');
	const label = el.querySelector<HTMLLabelElement>('caps-field-label label')!;
	expect(label.htmlFor).toBe(volume.id);
	expect(volume.getAttribute('aria-labelledby')).toBe(label.id);
	const description = el.querySelector('caps-field-description')!;
	expect(volume.getAttribute('aria-describedby')?.split(' ')).toEqual(['extra', description.id]);
	const ids = Array.from(el.querySelectorAll('[id]')).map((e) => e.id);
	expect(new Set(ids).size).toBe(ids.length);
	document.body.appendChild(el);
	await userEvent.click(label);
	expect(document.activeElement).toBe(volume);
	expect((await axe.run(el)).violations).toEqual([]);
	el.remove();
});

it('updates single-thumb array forms with steps, Page/Shift/Home/End and touches only after leaving the control', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	await key(el, 'volume', '{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([45]);
	await userEvent.keyboard('{PageUp}');
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([90]);
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([10]);
	await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([60]);
	expect(f.componentInstance.volume.touched).toBe(false);
	await userEvent.click(el.querySelector('section + button')!);
	f.detectChanges();
	expect(f.componentInstance.volume.touched).toBe(true);
	expect(thumb(el, 'volume').getAttribute('aria-invalid')).toBeNull();
	f.componentInstance.volume.setValue([20]);
	f.detectChanges();
	expect(thumb(el, 'volume').getAttribute('aria-invalid')).toBe('true');
	expect(thumb(el, 'volume').getAttribute('aria-describedby')).toContain(el.querySelector('caps-field-error')!.id);
	el.remove();
});

it('combines explicit and form disabled state and restores editing only when both enable', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	f.componentInstance.volume.disable();
	f.detectChanges();
	expect(thumb(el, 'volume').disabled).toBe(true);
	expect(thumb(el, 'volume').tabIndex).toBe(-1);
	f.componentInstance.disabled.set(true);
	f.componentInstance.volume.enable();
	f.detectChanges();
	expect(thumb(el, 'volume').disabled).toBe(true);
	expect(thumb(el, 'volume').getAttribute('aria-disabled')).toBe('true');
	thumb(el, 'volume').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([40]);
	f.componentInstance.disabled.set(false);
	f.detectChanges();
	await key(el, 'volume', '{ArrowRight}');
	expect(f.componentInstance.volume.value).toEqual([45]);
	el.remove();
});

it('retains array shape, constraints, sorted values, names and multiple thumbs', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	await key(el, 'range', '{End}');
	f.detectChanges();
	expect(f.componentInstance.range()).toEqual([40, 50]);
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(f.componentInstance.range()).toEqual([40, 50]);
	expect(thumb(el, 'range').getAttribute('aria-labelledby')).toBe('range-label-0');
	expect(thumb(el, 'range-1').getAttribute('aria-labelledby')).toBe('range-label-1');
	expect(el.querySelectorAll('#many-root [role=slider]')).toHaveLength(3);
	expect(el.querySelectorAll('#many-root [data-slot=slider-tick]').length).toBeLessThanOrEqual(6);
	f.componentInstance.range.set([80, 10]);
	f.detectChanges();
	expect(thumb(el, 'range').getAttribute('aria-valuenow')).toBe('10');
	el.remove();
});

it('respects RTL, vertical and inverted keyboard directions and moves a whole selected range', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	f.componentInstance.direction.set('rtl');
	f.detectChanges();
	await key(el, 'volume', '{ArrowLeft}');
	expect(f.componentInstance.volume.value).toEqual([45]);
	await key(el, 'vertical', '{ArrowUp}');
	expect(f.componentInstance.vertical()).toEqual([51]);
	f.componentInstance.inverted.set(true);
	f.detectChanges();
	await userEvent.keyboard('{ArrowUp}');
	expect(f.componentInstance.vertical()).toEqual([50]);
	await key(el, 'drag', '{End}');
	f.detectChanges();
	expect(f.componentInstance.drag()).toEqual([75, 100]);
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(f.componentInstance.drag()).toEqual([0, 25]);
	el.remove();
});

it('keeps template and signal forms values synchronized, including programmatic resets', async () => {
	const f = setup();
	await f.whenStable();
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	expect(thumb(el, 'model').getAttribute('aria-valuenow')).toBe('30');
	await key(el, 'model', '{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.model()).toEqual([31]);
	await key(el, 'signal', '{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.signalModel().volume).toEqual([36]);
	f.componentInstance.volume.reset();
	f.detectChanges();
	expect(thumb(el, 'volume').getAttribute('aria-valuenow')).toBe('40');
	thumb(el, 'array-form').focus();
	thumb(el, 'array-form-1').focus();
	expect(f.componentInstance.arrayForm.touched).toBe(false);
	(el.querySelector('section + button') as HTMLButtonElement).focus();
	f.detectChanges();
	expect(f.componentInstance.arrayForm.touched).toBe(true);
	f.componentInstance.arrayForm.setValue([60, 20]);
	f.detectChanges();
	expect(f.componentInstance.changes).toEqual([]);
	f.componentInstance.arrayForm.reset();
	f.detectChanges();
	expect(f.componentInstance.changes).toEqual([]);
	expect(thumb(el, 'array-form').getAttribute('aria-valuenow')).toBe('20');
	expect(thumb(el, 'array-form-1').getAttribute('aria-valuenow')).toBe('60');
	expect(f.componentInstance.arrayForm.value).toBeNull();
	await key(el, 'array-form', '{ArrowRight}');
	f.detectChanges();
	expect(f.componentInstance.arrayForm.value).toEqual([21, 60]);
	expect(f.componentInstance.changes).toEqual([[21, 60]]);
	f.componentInstance.signalModel.set({ volume: [65] });
	f.detectChanges();
	expect(thumb(el, 'signal').getAttribute('aria-valuenow')).toBe('65');
	el.remove();
});

it('handles genuine track pointer input and ignores empty-track clicks in range-only mode', async () => {
	const f = setup();
	await f.whenStable();
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	document.body.appendChild(el);
	el.style.width = '500px';
	await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
	const track = el.querySelector<HTMLElement>('#volume-root [data-slot=slider-track]')!;
	track.style.width = '400px';
	track.style.height = '6px';
	await userEvent.click(track, { position: { x: track.clientWidth * 0.75, y: track.clientHeight / 2 } });
	f.detectChanges();
	expect(f.componentInstance.volume.value).toEqual([70]);
	const dragTrack = el.querySelector<HTMLElement>('#drag-root [data-slot=slider-track]')!;
	dragTrack.style.width = '400px';
	dragTrack.style.height = '6px';
	await userEvent.click(dragTrack, { position: { x: dragTrack.clientWidth * 0.9, y: dragTrack.clientHeight / 2 } });
	f.detectChanges();
	expect(f.componentInstance.drag()).toEqual([25, 50]);
	el.remove();
});
