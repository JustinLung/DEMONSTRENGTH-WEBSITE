<script lang="ts">
	import Hero from '$lib/components/shared/Hero.svelte';
	import Carousel from '$lib/components/shared/Carousel.svelte';
	import About from '$lib/components/shared/About.svelte';
	import { items } from '$lib/utils/data/placeholderData';
	import Coaches from '$lib/components/shared/Coaches.svelte';
	import Reviews from '$lib/components/shared/Reviews.svelte';
	import { reviews } from '$lib/utils/data/reviews';

	export let data: any;
	const homepageData = data?.data?.homepage;

	console.log(data);
</script>

<Hero title={homepageData?.hero?.title} description={homepageData?.hero?.description} />
<Carousel title={homepageData?.highlightTitle} items={homepageData?.highlights} />
<Coaches title={homepageData?.coachTitle} coaches={homepageData.coach} />
<About title={homepageData?.about?.title} description={homepageData?.about.description} />
<Reviews title={homepageData?.reviewTitle} reviews={homepageData?.review} />
