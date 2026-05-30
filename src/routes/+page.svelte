<script lang="ts">
	import Hero from '$lib/components/shared/Hero.svelte';
	import About from '$lib/components/shared/About.svelte';
	import Coaching from '$lib/components/shared/Coaching.svelte';
	import Reviews from '$lib/components/shared/Reviews.svelte';
	import Carousel from '$lib/components/shared/Carousel.svelte';
	import CrossfadeImages from '$lib/components/shared/CrossfadeImages.svelte';
	import CTA from '$lib/components/shared/CTA.svelte';
	import Seo from '$lib/components/shared/Seo.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const homepageData = $derived(data.homepage);
</script>

<Seo
	title={homepageData.seo.title}
	canonicalUrl={data.canonicalUrl}
	description={homepageData.seo.description ?? homepageData.hero.description}
	imagePath={homepageData.seo.imagePath ?? homepageData.hero.images[0]?.src}
/>

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
<CrossfadeImages images={homepageData.hero.images} />
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

	@media (--md) {
		:global(main > section:not(.hero)) {
			margin-block: 128px;
		}
	}
</style>
