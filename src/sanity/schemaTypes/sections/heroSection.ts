import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
	name: 'heroSection',
	title: 'Hero section',
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
			rows: 3
		}),
		defineField({
			name: 'images',
			title: 'Background images',
			type: 'array',
			of: [{ type: 'imageWithAlt' }],
			validation: (Rule) => Rule.min(1)
		}),
		defineField({
			name: 'primaryCta',
			title: 'Primary CTA',
			type: 'cta'
		}),
		defineField({
			name: 'secondaryCta',
			title: 'Secondary CTA',
			type: 'cta'
		})
	]
});
