import { homepage as fallbackHomepage, site as fallbackSite } from '$lib/utils/data/placeholderData';
import { sanityFetch } from './client';
import { aboutPageQuery, homePageQuery, siteSettingsQuery } from './queries';

type HomePageData = typeof fallbackHomepage;
type SiteData = typeof fallbackSite;

const fallbackAboutPage = {
	hero: {
		title: 'Placeholder About Headline',
		intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.'
	},
	showcase: {
		images: [
			{ src: '/images/placeholder.svg', alt: '' },
			{ src: '/images/placeholder.svg', alt: '' },
			{
				src: '/images/placeholder.svg',
				alt: 'Atleet tilt een zware bal tijdens een krachttraining'
			}
		],
		title: 'Placeholder Section Title',
		paragraphs: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.',
			'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.',
			'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet.'
		],
		closingText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Read more',
		closingLink: {
			href: '/#reviews',
			title: 'placeholder content'
		}
	}
};

type AboutPageData = typeof fallbackAboutPage;

type SanityHomePage = Partial<HomePageData> & {
	hero?: Partial<HomePageData['hero']>;
	about?: Partial<HomePageData['about']>;
	cta?: Partial<HomePageData['cta']>;
};

type SanitySite = Partial<SiteData> & {
	header?: Partial<SiteData['header']>;
	footer?: Partial<SiteData['footer']>;
};

type SanityAboutPage = Partial<AboutPageData> & {
	hero?: Partial<AboutPageData['hero']>;
	showcase?: Partial<AboutPageData['showcase']>;
};

function hasItems<T>(items: T[] | undefined): items is T[] {
	return Array.isArray(items) && items.length > 0;
}

export async function loadHomePage(): Promise<HomePageData> {
	try {
		const data = await sanityFetch<SanityHomePage>(homePageQuery);

		if (!data) return fallbackHomepage;

		return {
			...fallbackHomepage,
			...data,
			hero: {
				...fallbackHomepage.hero,
				...data.hero,
				images: hasItems(data.hero?.images) ? data.hero.images : fallbackHomepage.hero.images,
				primaryCta: {
					...fallbackHomepage.hero.primaryCta,
					...data.hero?.primaryCta
				},
				secondaryCta: {
					...fallbackHomepage.hero.secondaryCta,
					...data.hero?.secondaryCta
				}
			},
			about: {
				...fallbackHomepage.about,
				...data.about,
				image: {
					...fallbackHomepage.about.image,
					...data.about?.image
				}
			},
			highlights: hasItems(data.highlights) ? data.highlights : fallbackHomepage.highlights,
			review: hasItems(data.review) ? data.review : fallbackHomepage.review,
			cta: {
				...fallbackHomepage.cta,
				...data.cta
			}
		};
	} catch (error) {
		console.error('Failed to load Sanity home page content', error);
		return fallbackHomepage;
	}
}

export async function loadAboutPage(): Promise<AboutPageData> {
	try {
		const data = await sanityFetch<SanityAboutPage>(aboutPageQuery);

		if (!data) return fallbackAboutPage;

		return {
			...fallbackAboutPage,
			...data,
			hero: {
				...fallbackAboutPage.hero,
				...data.hero
			},
			showcase: {
				...fallbackAboutPage.showcase,
				...data.showcase,
				images: hasItems(data.showcase?.images)
					? data.showcase.images
					: fallbackAboutPage.showcase.images,
				paragraphs: hasItems(data.showcase?.paragraphs)
					? data.showcase.paragraphs
					: fallbackAboutPage.showcase.paragraphs,
				closingLink: {
					...fallbackAboutPage.showcase.closingLink,
					...data.showcase?.closingLink
				}
			}
		};
	} catch (error) {
		console.error('Failed to load Sanity about page content', error);
		return fallbackAboutPage;
	}
}

export async function loadSiteSettings(): Promise<SiteData> {
	try {
		const data = await sanityFetch<SanitySite>(siteSettingsQuery);

		if (!data) return fallbackSite;

		return {
			...fallbackSite,
			...data,
			header: {
				...fallbackSite.header,
				...data.header,
				brand: {
					...fallbackSite.header.brand,
					...data.header?.brand
				},
				links: hasItems(data.header?.links) ? data.header.links : fallbackSite.header.links,
				cta: data.header?.cta ?? fallbackSite.header.cta
			},
			footer: {
				...fallbackSite.footer,
				...data.footer,
				brand: {
					...fallbackSite.footer.brand,
					...data.footer?.brand
				},
				links: hasItems(data.footer?.links) ? data.footer.links : fallbackSite.footer.links,
				socialLink: {
					...fallbackSite.footer.socialLink,
					...data.footer?.socialLink
				},
				legalLink: {
					...fallbackSite.footer.legalLink,
					...data.footer?.legalLink
				}
			}
		};
	} catch (error) {
		console.error('Failed to load Sanity site settings', error);
		return fallbackSite;
	}
}
