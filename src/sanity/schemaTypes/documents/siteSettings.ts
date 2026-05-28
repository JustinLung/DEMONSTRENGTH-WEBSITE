import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal title',
			type: 'string',
			initialValue: 'Site settings',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'brandTitle',
			title: 'Brand title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'brandHref',
			title: 'Brand URL',
			type: 'url',
			initialValue: '/',
			validation: (Rule) => Rule.required().uri({ allowRelative: true })
		}),
		defineField({
			name: 'headerCta',
			title: 'Header CTA',
			type: 'link'
		}),
		defineField({
			name: 'socialLink',
			title: 'Footer social link',
			type: 'link'
		}),
		defineField({
			name: 'copyright',
			title: 'Footer copyright text',
			type: 'string',
			initialValue: 'All rights Reserved.'
		}),
		defineField({
			name: 'legalLink',
			title: 'Legal link',
			type: 'link'
		})
	]
});
