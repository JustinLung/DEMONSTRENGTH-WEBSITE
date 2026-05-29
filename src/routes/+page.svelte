<script lang="ts">
	import Hero from '$lib/components/shared/Hero.svelte';
	import About from '$lib/components/shared/About.svelte';
	import Coaching from '$lib/components/shared/Coaching.svelte';
	import Reviews from '$lib/components/shared/Reviews.svelte';
	import Carousel from '$lib/components/shared/Carousel.svelte';
	import CrossfadeImages from '$lib/components/shared/CrossfadeImages.svelte';
	import CTA from '$lib/components/shared/CTA.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const homepageData = $derived(data.homepage);
</script>

<Hero
	title={homepageData.hero.title}
	description={homepageData.hero.description}
	images={homepageData.hero.images}
	primaryCta={homepageData.hero.primaryCta}
	secondaryCta={homepageData.hero.secondaryCta}
/>
<About
	title={homepageData.about.title}
	description={homepageData.about.description}
	image={homepageData.about.image}
/>
<section class="image-crossfade-section">
	<CrossfadeImages images={homepageData.hero.images} />
</section>
<Coaching {...homepageData.coaching} />
<Carousel title={homepageData.highlightTitle} items={homepageData.highlights} />

<Reviews
	title={homepageData.reviewTitle}
	subtitle={homepageData.reviewSubtitle}
	reviews={homepageData.review}
/>
<CTA {...homepageData.cta} />

<style lang="postcss">
	:global(main > section:not(.hero)) {
		margin-block: 64px;
	}

	.image-crossfade-section {
		position: relative;
		height: calc(100 * var(--svh));
		overflow: hidden;
	}

	@media (--md) {
		:global(main > section:not(.hero)) {
			margin-block: 128px;
		}
	}
</style>
