import { defineField, defineType } from 'sanity';

export const homePage = defineType({
	name: 'homePage',
	title: 'Home page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal title',
			type: 'string',
			initialValue: 'Home page',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroSection'
		}),
		defineField({
			name: 'about',
			title: 'About',
			type: 'aboutSection'
		}),
		defineField({
			name: 'highlights',
			title: 'Highlights',
			type: 'highlightsSection'
		}),
		defineField({
			name: 'reviews',
			title: 'Reviews',
			type: 'reviewsSection'
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'ctaSection'
		})
	]
});
