import { defineField, defineType } from 'sanity';

export const ctaSection = defineType({
	name: 'ctaSection',
	title: 'CTA section',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'highlight',
			title: 'Highlighted text',
			type: 'string'
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'buttonText',
			title: 'Button text',
			type: 'string'
		}),
		defineField({
			name: 'buttonHref',
			title: 'Button URL',
			type: 'url',
			validation: (Rule) =>
				Rule.uri({
					allowRelative: true,
					scheme: ['http', 'https', 'mailto', 'tel']
				})
		})
	]
});
