import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks an `ng-template` placed inside a `<caps-breadcrumb>` as the separator rendered between every
 * pair of items. The separator stays decorative: it is wrapped in a `role="presentation"`,
 * `aria-hidden="true"` element, so do not put meaningful content in it.
 *
 * ```html
 * <caps-breadcrumb>
 *   <ng-template capsBreadcrumbSeparator><ng-icon name="lucideSlash" /></ng-template>
 *   ...
 * </caps-breadcrumb>
 * ```
 */
@Directive({ selector: 'ng-template[capsBreadcrumbSeparator]' })
export class CapsBreadcrumbSeparator {
	public readonly template = inject<TemplateRef<void>>(TemplateRef);
}
