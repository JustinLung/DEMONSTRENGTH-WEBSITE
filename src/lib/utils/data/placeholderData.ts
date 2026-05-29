const placeholderImage = '/images/placeholder.svg';

export const site = {
	header: {
		brand: {
			title: 'placeholder.',
			href: '/'
		},
		links: [
			{ href: '/', title: 'Placeholder' },
			{ href: '/#highlights', title: 'Placeholder' },
			{ href: '/about', title: 'Placeholder' },
			{ href: '/#reviews', title: 'Placeholder' }
		],
		cta: {
			href: '#',
			title: 'Placeholder CTA'
		}
	},
	footer: {
		brand: {
			title: 'placeholder.',
			href: '/'
		},
		links: [
			{ href: '/#highlights', title: 'Placeholder' },
			{ href: '/about', title: 'Placeholder' },
			{ href: '/#reviews', title: 'Placeholder' }
		],
		socialLink: {
			href: '/',
			label: 'Placeholder social link'
		},
		copyright: 'All rights Reserved.',
		legalLink: {
			href: '/terms-and-conditions',
			title: 'Terms & Conditions'
		}
	}
};

export const homepage = {
	seo: {
		title: undefined as string | undefined,
		description: undefined as string | undefined,
		imagePath: undefined as string | undefined
	},
	hero: {
		title: 'Placeholder headline for the home page',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.',
		image: {
			url: placeholderImage,
			alt: 'Placeholder hero image'
		},
		images: [
			{ src: placeholderImage, alt: 'Placeholder hero image' },
			{ src: '/images/placeholder-2.svg', alt: 'Placeholder hero image' },
			{ src: '/images/placeholder-3.svg', alt: 'Placeholder hero image' }
		],
		primaryCta: {
			href: '#',
			label: 'Placeholder CTA'
		},
		secondaryCta: {
			href: '/#about',
			label: 'Placeholder Link'
		}
	},
	about: {
		title: 'Placeholder about section title',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.',
		image: {
			src: placeholderImage,
			alt: 'Placeholder'
		}
	},
	coaching: {
		eyebrow: 'Online coaching',
		title: 'Coaching',
		description:
			'Alles wat je nodig hebt om sterker te worden met structuur, duidelijke feedback en een aanpak die je vol kunt houden.',
		image: {
			src: placeholderImage,
			alt: 'Krachttraining coaching'
		},
		includedTitle: 'Wat zit er bij coaching?',
		items: [
			'Persoonlijk trainingsschema afgestemd op jouw doelen',
			'Wekelijkse check-ins en gerichte bijsturing',
			'Techniekfeedback op je lifts via videoanalyse',
			'Voedingsadvies dat past bij je training en levensstijl',
			'Direct contact voor vragen, motivatie en accountability'
		]
	},
	cta: {
		title: 'Klaar om',
		highlight: 'te starten?',
		description:
			'Boek een gratis 1-op-1 call. We bespreken je doelen en kijken of we bij je passen. Geen verplichtingen.',
		buttonText: 'Boek je gratis call',
		buttonHref: '#'
	},
	reviewTitle: 'What clients say',
	reviewSubtitle: 'These are temporary testimonials until the CMS content is ready again.',
	review: [
		{
			name: 'Client One',
			review:
				'Placeholder testimonial copy. Results felt more predictable, training finally made sense, and each block had a clear purpose.'
		},
		{
			name: 'Client Two',
			review:
				'Placeholder testimonial copy. Coaching stayed practical, communication was clear, and progress felt sustainable instead of rushed.'
		},
		{
			name: 'Client Three',
			review:
				'Placeholder testimonial copy. I felt supported, more confident under the bar, and much more consistent from week to week.'
		},
		{
			name: 'Client Four',
			review:
				'Placeholder testimonial copy. The plan was easy to follow, feedback was direct, and every session had a focused next step.'
		}
	],
	coachTitle: 'Placeholder team title',
	coach: Array.from({ length: 3 }, (_, index) => ({
		title: `Placeholder Person ${index + 1}`,
		tiktok: '#',
		instagram: '#',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.',
		image: {
			url: placeholderImage,
			title: 'Placeholder image',
			alt: 'Placeholder image'
		}
	})),
	highlightTitle: 'Placeholder highlights title',
	highlights: Array.from({ length: 8 }, (_, index) => ({
		tag: `Placeholder ${index + 1}`,
		media: {
			url: placeholderImage,
			alt: 'Placeholder image',
			mimeType: 'image/svg+xml',
			video: {
				thumbnailUrl: placeholderImage,
				mp4Url: ''
			}
		}
	}))
};
