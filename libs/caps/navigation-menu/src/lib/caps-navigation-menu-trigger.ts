import type { BooleanInput } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	PLATFORM_ID,
	Renderer2,
	type AfterViewChecked,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnNavigationMenuTrigger } from '@spartan-ng/brain/navigation-menu';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'button[caps-navigation-menu-trigger]',
	imports: [NgIcon],
	providers: [provideIcons({ lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnNavigationMenuTrigger, inputs: ['align'] }],
	host: { type: 'button', 'data-slot': 'navigation-menu-trigger' },
	template:
		'<ng-content /><ng-icon name="lucideChevronDown" class="caps-navigation-menu-chevron" aria-hidden="true" />',
})
export class CapsNavigationMenuTrigger implements AfterViewChecked {
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
	private readonly _renderer = inject(Renderer2);
	// BrnButton is already composed by Brain; expose metadata without re-exporting a nested input.
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public ngAfterViewChecked() {
		// Brain overlays are browser-only. Server ARIA describes the panel actually rendered.
		if (!this._isBrowser) {
			this._renderer.removeAttribute(this._element.nativeElement, 'aria-controls');
			this._renderer.setAttribute(this._element.nativeElement, 'aria-expanded', 'false');
		}
	}
	constructor() {
		classes(() => 'caps-navigation-menu-trigger inline-flex items-center justify-center gap-1.5');
	}
}
