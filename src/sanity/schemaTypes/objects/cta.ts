import { defineField, defineType } from 'sanity';

export const cta = defineType({
	name: 'cta',
	title: 'Call to action',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
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
