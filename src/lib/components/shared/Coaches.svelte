<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import Coach from './Coach.svelte';
	import { coaches } from '$lib/utils/data/coach';
	import { easeOutExpo } from '$lib/utils/transition';

	const { title }: { title: string } = $props();

	onMount(() => {
		gsap.to('.coaches-title', {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: easeOutExpo,
			scrollTrigger: {
				trigger: '.coaches-title',
				start: 'top 50%',
				end: 'bottom',
				toggleActions: 'play none none none'
			}
		});
	});
</script>

<section class="container coach-container" id="coaches">
	<h2 class="coaches-title">{title}</h2>
	<div>
		{#each coaches as coach}
			<Coach
				src={coach.src}
				alt={coach.alt}
				title={coach.title}
				description={coach.description}
				instagram={coach.instagram}
				tiktok={coach.tiktok}
				classes="coach"
			/>
		{/each}
	</div>
</section>

<style lang="postcss">
	section {
		margin-bottom: 110px;

		.coaches-title {
			font-size: 1.5rem;
			margin-bottom: 29px;
			opacity: 0;
			transform: translateY(30px);

			@media (--lg) {
				font-size: 2.25rem;
				font-weight: 500;
				margin-bottom: 59px;
			}
		}

		div {
			display: grid;
			gap: 25px;
		}
	}
</style>
