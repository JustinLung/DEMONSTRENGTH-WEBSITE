import { defineField, defineType } from 'sanity';

export const link = defineType({
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'href',
			title: 'URL',
			type: 'url',
			validation: (Rule) =>
				Rule.required().uri({
					allowRelative: true,
					scheme: ['http', 'https', 'mailto', 'tel']
				})
		})
	]
});
