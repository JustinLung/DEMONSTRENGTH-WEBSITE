<script lang="ts">
	import Seo from '$lib/components/shared/Seo.svelte';
	import {
		getImageDimensions,
		optimizedSanityImageSrcset,
		optimizedSanityImageUrl
	} from '$lib/utils/images';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const aboutPage = $derived(data.aboutPage);
	const collageImages = $derived(aboutPage.showcase.images);
	const closingLink = $derived(aboutPage.showcase.closingLink);
	const collageWidths = [320, 480, 640, 800, 960, 1200];
</script>

<Seo
	title={aboutPage.seo.title ?? 'About'}
	canonicalUrl={data.canonicalUrl}
	description={aboutPage.seo.description ?? aboutPage.hero.intro}
	imagePath={aboutPage.seo.imagePath ?? collageImages[2]?.src}
/>

<section class="about-hero container">
	<h1>{aboutPage.hero.title}</h1>
	<p class="intro">{aboutPage.hero.intro}</p>
</section>

<section class="about-showcase">
	<div class="container">
		<div class="showcase-shell">
			<div class="image-collage" aria-hidden="true">
				<div class="image-card image-card-small">
					<img
						src={optimizedSanityImageUrl(collageImages[0]?.src, { width: 640, quality: 72 })}
						srcset={optimizedSanityImageSrcset(collageImages[0]?.src, collageWidths, {
							quality: 72
						})}
						sizes="(min-width: 64em) 25vw, 30vw"
						alt={collageImages[0]?.alt || ''}
						draggable="false"
						loading="lazy"
						width={getImageDimensions(collageImages[0]?.src)?.width}
						height={getImageDimensions(collageImages[0]?.src)?.height}
					/>
				</div>
				<div class="image-card image-card-medium">
					<img
						src={optimizedSanityImageUrl(collageImages[1]?.src, { width: 800, quality: 72 })}
						srcset={optimizedSanityImageSrcset(collageImages[1]?.src, collageWidths, {
							quality: 72
						})}
						sizes="(min-width: 64em) 28vw, 33vw"
						alt={collageImages[1]?.alt || ''}
						draggable="false"
						loading="lazy"
						width={getImageDimensions(collageImages[1]?.src)?.width}
						height={getImageDimensions(collageImages[1]?.src)?.height}
					/>
				</div>
				<div class="image-card image-card-large">
					<img
						src={optimizedSanityImageUrl(collageImages[2]?.src, { width: 960, quality: 72 })}
						srcset={optimizedSanityImageSrcset(collageImages[2]?.src, collageWidths, {
							quality: 72
						})}
						sizes="(min-width: 64em) 32vw, 37vw"
						alt={collageImages[2]?.alt || ''}
						draggable="false"
						loading="lazy"
						width={getImageDimensions(collageImages[2]?.src)?.width}
						height={getImageDimensions(collageImages[2]?.src)?.height}
					/>
				</div>
			</div>

			<div class="showcase-copy">
				<h2>{aboutPage.showcase.title}</h2>

				{#each aboutPage.showcase.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}

				{#if aboutPage.showcase.closingText || closingLink}
					<p>
						{aboutPage.showcase.closingText}
						{#if closingLink}
							<a href={closingLink.href}>{closingLink.title}</a>.
						{/if}
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.about-hero {
		padding-top: 8rem;
		padding-bottom: 2rem;
		display: grid;
		gap: 0.5rem;

		h1 {
			margin: 0;
			font-size: 2.5rem;

			@media (--md) {
				font-size: 4.8rem;
				max-width: 948px;
			}

			@media (--lg) {
				font-size: 5.5rem;
			}
		}

		.intro {
			max-width: 690px;
			margin-top: 0.5rem;
			color: var(--grey);
			font-size: 1rem;
			line-height: 1.5;

			@media (--md) {
				font-size: 1.5rem;
			}
		}
	}

	.about-showcase {
		background: #f4f0ea;
		color: var(--black);
		border-block: 1px solid color-mix(in srgb, var(--black) 10%, transparent);
		padding-bottom: 4rem;
	}

	.showcase-shell {
		display: grid;
		gap: 2rem;
		padding-block: 1.5rem;

		@media (--lg) {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
			align-items: center;
			padding-block: 2.5rem;
			gap: 2.5rem;
		}
	}

	.image-collage {
		min-height: 24rem;
		display: grid;
		grid-template-columns: 0.9fr 1fr 1.05fr;
		align-items: end;
		gap: 0.85rem;
	}

	.image-card {
		overflow: hidden;
		background: var(--white);
		border: 1px solid rgb(0 0 0 / 0.08);
		box-shadow: 0 18px 40px rgb(0 0 0 / 0.12);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(1);
		}
	}

	.image-card-small {
		height: 16rem;
	}

	.image-card-medium {
		height: 20rem;
	}

	.image-card-large {
		height: 26rem;
	}

	.showcase-copy {
		display: grid;
		gap: 1.25rem;
		align-content: center;

		h2 {
			margin: 0;
			font-size: 1.5rem;
			font-weight: 500;

			@media (--lg) {
				font-size: 2rem;
			}
		}

		p {
			max-width: 36rem;
			font-size: 1rem;
			line-height: 1.6;
			color: color-mix(in srgb, var(--black) 72%, transparent);
		}

		a {
			color: var(--primary);
			text-decoration: underline;
			text-underline-offset: 0.18em;
		}
	}

	@media (max-width: 48em) {
		.image-collage {
			min-height: 20rem;
			gap: 0.35rem;
		}

		.image-card {
			box-shadow: none;
		}

		.image-card-small {
			height: 11rem;
		}

		.image-card-medium {
			height: 14.5rem;
		}

		.image-card-large {
			height: 20rem;
		}
	}
</style>
