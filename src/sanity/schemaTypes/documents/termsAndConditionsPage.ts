import { defineField, defineType } from 'sanity';

export const termsAndConditionsPage = defineType({
	name: 'termsAndConditionsPage',
	title: 'Terms and conditions page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal title',
			type: 'string',
			initialValue: 'Terms and conditions page',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'seo'
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
					initialValue: 'Terms and Conditions',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'intro',
					title: 'Intro text',
					type: 'text',
					rows: 3
				})
			]
		}),
		defineField({
			name: 'sections',
			title: 'Terms sections',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'termsSection',
					title: 'Terms section',
					fields: [
						defineField({
							name: 'title',
							title: 'Section title',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'paragraphs',
							title: 'Paragraphs',
							type: 'array',
							of: [
								{
									type: 'text',
									rows: 4
								}
							],
							validation: (Rule) => Rule.required().min(1)
						})
					],
					preview: {
						select: {
							title: 'title'
						}
					}
				}
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'contact',
			title: 'Contact details',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: false
			},
			fields: [
				defineField({
					name: 'title',
					title: 'Contact heading',
					type: 'string',
					initialValue: 'Contact'
				}),
				defineField({
					name: 'lines',
					title: 'Contact lines',
					type: 'array',
					of: [{ type: 'string' }],
					description: 'Shown as separate lines below the contact heading.'
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
				title: title || 'Terms and conditions page'
			};
		}
	}
});
