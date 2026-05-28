import { defineField, defineType } from 'sanity';

export const aboutSection = defineType({
	name: 'aboutSection',
	title: 'About section',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'imageWithAlt'
		})
	]
});
