import { defineField, defineType } from 'sanity';

export const reviewsSection = defineType({
	name: 'reviewsSection',
	title: 'Reviews section',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string'
		}),
		defineField({
			name: 'reviews',
			title: 'Reviews',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'review',
							title: 'Review',
							type: 'text',
							rows: 4,
							validation: (Rule) => Rule.required()
						})
					]
				}
			]
		})
	]
});
