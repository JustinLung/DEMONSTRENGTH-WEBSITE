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
			name: 'tabs',
			title: 'Additional content tabs',
			description:
				'Add two or more entries to show a tab selector. One entry is shown without the selector. With no entries, the regular included content is used.',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'coachingTab',
					title: 'Coaching tab',
					fields: [
						defineField({
							name: 'label',
							title: 'Tab label',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'title',
							title: 'Content title',
							type: 'string'
						}),
						defineField({
							name: 'items',
							title: 'Content items',
							type: 'array',
							of: [{ type: 'string' }],
							validation: (Rule) => Rule.required().min(1)
						})
					],
					preview: {
						select: {
							title: 'label',
							subtitle: 'title'
						}
					}
				}
			]
		})
	]
});
