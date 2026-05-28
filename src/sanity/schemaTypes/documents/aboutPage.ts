import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
	name: 'aboutPage',
	title: 'About page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal title',
			type: 'string',
			initialValue: 'About page',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: false
			},
			fields: [
				defineField({
					name: 'title',
					title: 'Headline',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'intro',
					title: 'Intro text',
					type: 'text',
					rows: 3,
					validation: (Rule) => Rule.required()
				})
			]
		}),
		defineField({
			name: 'showcase',
			title: 'Showcase section',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: false
			},
			fields: [
				defineField({
					name: 'images',
					title: 'Image collage',
					description: 'Add three images: small, medium, and large. The large image should have descriptive alt text.',
					type: 'array',
					of: [{ type: 'imageWithAlt' }],
					validation: (Rule) => Rule.required().length(3)
				}),
				defineField({
					name: 'title',
					title: 'Section title',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'paragraphs',
					title: 'Story paragraphs',
					type: 'array',
					of: [
						{
							type: 'text',
							rows: 3
						}
					],
					validation: (Rule) => Rule.required().min(1)
				}),
				defineField({
					name: 'closingText',
					title: 'Closing text before link',
					type: 'text',
					rows: 2
				}),
				defineField({
					name: 'closingLink',
					title: 'Closing link',
					type: 'link',
					description: 'Optional link shown at the end of the about page copy.'
				})
			]
		})
	],
	preview: {
		select: {
			title: 'hero.title'
		},
		prepare({ title }) {
			return {
				title: title || 'About page'
			};
		}
	}
});
