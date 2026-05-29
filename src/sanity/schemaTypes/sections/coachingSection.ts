import { defineField, defineType } from 'sanity';

export const coachingSection = defineType({
	name: 'coachingSection',
	title: 'Coaching section',
	type: 'object',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string'
		}),
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
			rows: 3
		}),
		defineField({
			name: 'image',
			title: 'Background image',
			type: 'imageWithAlt'
		}),
		defineField({
			name: 'includedTitle',
			title: 'Included title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Included items',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) => Rule.min(1)
		})
	]
});
