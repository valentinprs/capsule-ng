import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from '../../shared/layout/page';
import { metaWith } from '../../shared/meta/meta.util';

export const routeMeta: RouteMeta = {
	data: {
		breadcrumb: 'Forms',
	},
	meta: metaWith('Capsule — Forms', 'Build forms with Angular and spartan/ui.'),
	title: 'Capsule — Forms',
};

@Component({
	selector: 'spartan-forms',
	imports: [Page],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: '[--stable-height:78.75px]',
	},
	template: `
		<spartan-page />
	`,
})
export default class FormsPage {}
