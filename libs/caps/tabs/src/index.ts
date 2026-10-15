import { CapsTabs } from './lib/caps-tabs';
import { CapsTabsContent } from './lib/caps-tabs-content';
import { CapsTabsContentLazy } from './lib/caps-tabs-content-lazy';
import { CapsTabsList } from './lib/caps-tabs-list';
import { CapsTabsPaginatedList } from './lib/caps-tabs-paginated-list';
import { CapsTabsTrigger } from './lib/caps-tabs-trigger';

export * from './lib/caps-tabs';
/** @internal Required by Angular packaging; consumers use CapsTabs. */
export { CapsTabsBehavior as ɵCapsTabsBehavior } from './lib/caps-tabs-behavior';
export * from './lib/caps-tabs-content';
export * from './lib/caps-tabs-content-lazy';
export * from './lib/caps-tabs-list';
export * from './lib/caps-tabs-paginated-list';
export * from './lib/caps-tabs-trigger';
/** @internal Required by Angular packaging; consumers use CapsTabsTrigger. */
export { CapsTabsTriggerBehavior as ɵCapsTabsTriggerBehavior } from './lib/caps-tabs-trigger-behavior';

export const CapsTabsImports = [
	CapsTabs,
	CapsTabsList,
	CapsTabsTrigger,
	CapsTabsContent,
	CapsTabsContentLazy,
	CapsTabsPaginatedList,
] as const;
