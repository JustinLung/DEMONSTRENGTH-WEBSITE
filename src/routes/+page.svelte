<script lang="ts">
	import Hero from '$lib/components/shared/Hero.svelte';
	import About from '$lib/components/shared/About.svelte';
	import Coaches from '$lib/components/shared/Coaches.svelte';
	import Reviews from '$lib/components/shared/Reviews.svelte';

	export let data: any;
	const homepageData = data?.data?.homepage;
</script>

<Hero title={homepageData?.hero?.title} description={homepageData?.hero?.description} />
<!-- <Carousel title={homepageData?.highlightTitle} items={homepageData?.highlights} /> -->
<Coaches title={homepageData?.coachTitle} coaches={homepageData?.coach} />
<About title={homepageData?.about?.title} description={homepageData?.about.description} />
<Reviews title={homepageData?.reviewTitle} reviews={homepageData?.review} />
