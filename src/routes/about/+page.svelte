<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const aboutPage = $derived(data.aboutPage);
	const collageImages = $derived(aboutPage.showcase.images);
</script>

<section class="about-hero container">
	<h1>{aboutPage.hero.title}</h1>
	<p class="intro">{aboutPage.hero.intro}</p>
</section>

<section class="about-showcase">
	<div class="container">
		<div class="showcase-shell">
			<div class="image-collage" aria-hidden="true">
				<div class="image-card image-card-small">
					<img src={collageImages[0]?.src} alt={collageImages[0]?.alt || ''} draggable="false" />
				</div>
				<div class="image-card image-card-medium">
					<img src={collageImages[1]?.src} alt={collageImages[1]?.alt || ''} draggable="false" />
				</div>
				<div class="image-card image-card-large">
					<img
						src={collageImages[2]?.src}
						alt={collageImages[2]?.alt || ''}
						draggable="false"
					/>
				</div>
			</div>

			<div class="showcase-copy">
				<h2>{aboutPage.showcase.title}</h2>

				{#each aboutPage.showcase.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}

				{#if aboutPage.showcase.closingText || aboutPage.showcase.closingLink}
					<p>
						{aboutPage.showcase.closingText}
						{#if aboutPage.showcase.closingLink}
							<a href={aboutPage.showcase.closingLink.href}>{aboutPage.showcase.closingLink.title}</a>.
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
