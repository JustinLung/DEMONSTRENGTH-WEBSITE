import { defineField, defineType } from 'sanity';

export const numbersSection = defineType({
	name: 'numbersSection',
	title: 'Numbers section',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: false
	},
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Strength in numbers',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'image',
			title: 'Background image',
			type: 'imageWithAlt',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Numbers',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'numberItem',
					title: 'Number',
					preview: {
						select: {
							value: 'value',
							suffix: 'suffix',
							label: 'label'
						},
						prepare({ value, suffix, label }) {
							return {
								title: `${value ?? 0}${suffix ?? ''}`,
								subtitle: label
							};
						}
					},
					fields: [
						defineField({
							name: 'value',
							title: 'Value',
							type: 'number',
							description: 'Enter digits only. Thousands separators are added automatically.',
							validation: (Rule) => Rule.required().integer().min(0)
						}),
						defineField({
							name: 'suffix',
							title: 'Suffix',
							type: 'string',
							description: 'Optional, for example + or %.',
							validation: (Rule) => Rule.max(4)
						}),
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
							validation: (Rule) => Rule.required()
						})
					]
				}
			],
			validation: (Rule) => Rule.required().min(1).max(4)
		})
	]
});
