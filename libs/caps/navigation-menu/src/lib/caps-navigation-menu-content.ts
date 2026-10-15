import type { NumberInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	inject,
	input,
	inputBinding,
	numberAttribute,
	OnInit,
	TemplateRef,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { BrnNavigationMenuContent, BrnNavigationMenuItem } from '@spartan-ng/brain/navigation-menu';

/** @internal Own the overlay's first element, which Brain labels and focuses. */
@Component({
	selector: 'caps-navigation-menu-panel',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { style: 'display:none' },
	template: `
		<ng-template #panel>
			<div
				role="group"
				[class]="'caps-navigation-menu-content ' + className()"
				[style.--caps-navigation-menu-offset]="navOffset()"
				[attr.lang]="language()"
				[attr.data-lang]="language()"
			>
				<ng-container [ngTemplateOutlet]="content()" />
			</div>
		</ng-template>
	`,
})
export class CapsNavigationMenuPanel {
	public readonly content = input.required<TemplateRef<unknown>>();
	public readonly className = input('');
	public readonly navOffset = input(1.5);
	public readonly language = input<string | null>(null);
	public readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
}

/** Deferred content; Capsule owns the styled, labelled overlay panel. */
@Directive({ selector: 'ng-template[capsNavigationMenuContent]', hostDirectives: [BrnNavigationMenuContent] })
export class CapsNavigationMenuContent implements OnInit {
	public readonly className = input<string>('', { alias: 'class' });
	public readonly navOffset = input<number, NumberInput>(1.5, { transform: numberAttribute });
	private readonly _template = inject(TemplateRef);
	private readonly _vcr = inject(ViewContainerRef);
	private readonly _item = inject(BrnNavigationMenuItem);
	public ngOnInit() {
		const ref = this._vcr.createComponent(CapsNavigationMenuPanel, {
			bindings: [
				inputBinding('content', () => this._template),
				inputBinding('className', this.className),
				inputBinding('navOffset', this.navOffset),
				inputBinding('language', () => {
					const parent = this._template.elementRef.nativeElement.parentElement as HTMLElement | null;
					return (
						parent?.closest('[data-lang]')?.getAttribute('data-lang') ??
						parent?.closest('[lang]')?.getAttribute('lang') ??
						null
					);
				}),
			],
		});
		ref.changeDetectorRef.detectChanges();
		this._item.contentTemplate.set(ref.instance.panel());
	}
}
