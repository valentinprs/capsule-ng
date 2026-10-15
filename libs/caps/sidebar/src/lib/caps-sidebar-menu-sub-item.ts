import {
	ChangeDetectionStrategy,
	Component,
	computed,
	HostAttributeToken,
	inject,
	input,
	TemplateRef,
	viewChild,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-menu-sub-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { hidden: '' },
	template: `
		<ng-template #item>
			<li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" [class]="_class()"><ng-content /></li>
		</ng-template>
	`,
})
export class CapsSidebarMenuSubItem {
	public readonly className = input(inject(new HostAttributeToken('class'), { optional: true }) ?? '', {
		alias: 'class',
	});
	public readonly template = viewChild.required<TemplateRef<unknown>>('item');
	protected readonly _class = computed(() => hlm('group/menu-sub-item relative', this.className()));
}
