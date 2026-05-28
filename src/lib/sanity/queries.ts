export const homePageQuery = `*[_type == "homePage"][0]{
	hero{
		title,
		description,
		"images": images[]{
			"src": asset->url,
			alt
		},
		primaryCta,
		secondaryCta
	},
	about{
		title,
		description,
		"image": {
			"src": image.asset->url,
			"alt": image.alt
		}
	},
	"highlightTitle": highlights.title,
	"highlights": highlights.items[]{
		tag,
		"media": {
			"url": select(
				mediaType == "video" => coalesce(videoFile.asset->url, videoUrl),
				coalesce(image.asset->url, thumbnail.asset->url)
			),
			"alt": coalesce(image.alt, videoThumbnail.alt, thumbnail.alt),
			"mimeType": select(
				mediaType == "video" => coalesce(videoFile.asset->mimeType, "video/mp4"),
				defined(image.asset->mimeType) => image.asset->mimeType,
				defined(thumbnail.asset->mimeType) => thumbnail.asset->mimeType,
				"image/jpeg"
			),
			"video": {
				"thumbnailUrl": coalesce(videoThumbnail.asset->url, thumbnail.asset->url),
				"mp4Url": coalesce(videoFile.asset->url, videoUrl)
			}
		}
	},
	"reviewTitle": reviews.title,
	"reviewSubtitle": reviews.subtitle,
	"review": reviews.reviews[]{
		name,
		review,
		"image": select(
			defined(image.asset) => {
				"src": image.asset->url,
				"alt": image.alt
			}
		)
	},
	cta
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	"header": {
		"brand": {
			"title": brandTitle,
			"href": brandHref
		},
		"cta": headerCta{
			title,
			href
		}
	},
	"footer": {
		"brand": {
			"title": brandTitle,
			"href": brandHref
		},
		"socialLink": {
			"href": socialLink.href,
			"label": socialLink.title
		},
		copyright,
		"legalLink": legalLink{
			title,
			href
		}
	}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
	hero{
		title,
		intro
	},
	showcase{
		"images": images[]{
			"src": asset->url,
			alt
		},
		title,
		paragraphs,
		closingText,
		closingLink{
			title,
			href
		}
	}
}`;
