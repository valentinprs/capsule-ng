import { pageNavs, sidenavItems } from '../components/navigation-items';

// Build from the same navigation as the catalogue. No crawler, account or network request.
export const searchPages = [
	...new Map(
		[
			...pageNavs.map((page) => ({ ...page, section: 'Catalogue' })),
			...sidenavItems.flatMap((section) =>
				section.links
					.filter((link) => !link.wip)
					.map((link) => ({
						label: link.label,
						section: section.label,
						url: `${section.url}${link.url === '/' ? '' : link.url}`,
					})),
			),
		].map((page) => [page.url, page]),
	).values(),
];
