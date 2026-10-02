import { CATALOGUE_URL } from '../../../site.config';
const siteUrl = import.meta.env['VITE_SITE_URL'] || CATALOGUE_URL;
export const metaWith = (title: string, description: string) => [
	{
		name: 'description',
		content: description,
	},
	{
		name: 'author',
		content: 'Capsule',
	},
	{
		property: 'og:title',
		content: title,
	},
	{
		property: 'og:site_name',
		content: 'Capsule',
	},
	{
		property: 'og:type',
		content: 'website',
	},
	{
		property: 'og:url',
		content: siteUrl,
	},
	{
		property: 'og:description',
		content: description,
	},
	{
		property: 'og:image',
		content: `${siteUrl}/assets/capsule-social.png`,
	},

	{
		property: 'twitter:card',
		content: 'summary_large_image',
	},
	{
		property: 'twitter:title',
		content: title,
	},
	{
		property: 'twitter:description',
		content: description,
	},
	{
		property: 'twitter:image',
		content: `${siteUrl}/assets/capsule-social.png`,
	},
];
