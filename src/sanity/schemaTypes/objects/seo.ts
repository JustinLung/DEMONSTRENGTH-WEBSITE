import { defineField, defineType } from 'sanity';

export const seo = defineType({
	name: 'seo',
	title: 'SEO',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true
	},
	fields: [
		defineField({
			name: 'title',
			title: 'SEO title',
			type: 'string',
			description: 'Shown in browser tabs and search results. Keep it short and specific.',
			validation: (Rule) =>
				Rule.max(60).warning('Search results usually truncate titles after 50-60 characters.')
		}),
		defineField({
			name: 'description',
			title: 'Meta description',
			type: 'text',
			rows: 3,
			description: 'A short summary for search results and social previews.',
			validation: (Rule) =>
				Rule.max(160).warning(
					'Search results usually truncate descriptions after 150-160 characters.'
				)
		}),
		defineField({
			name: 'image',
			title: 'Social share image',
			type: 'imageWithAlt',
			description: 'Used for Open Graph and Twitter previews.'
		})
	]
});
