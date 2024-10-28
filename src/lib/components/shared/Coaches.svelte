<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import Coach from './Coach.svelte';
	import { easeOutExpo } from '$lib/utils/transition';

	const { title, coaches }: { title: string; coaches: any[] } = $props();

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

		gsap.fromTo(
			'.coach',
			{
				opacity: 0,
				y: 30
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: easeOutExpo,
				stagger: 0.15,
				scrollTrigger: {
					trigger: '.coach',
					start: 'top 40%',
					end: 'bottom',
					toggleActions: 'play none none none'
				}
			}
		);
	});
</script>

<section class="container coach-container" id="coaches">
	<h2 class="coaches-title">{title}</h2>
	<div>
		{#each coaches as coach, i}
			<Coach
				src={coach.image.url}
				alt={coach.image.alt}
				title={coach.title}
				description={coach.description}
				instagram={coach.instagram}
				tiktok={coach.tiktok}
				classes="coach"
				last={i === coaches.length - 1}
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
			grid-template-columns: repeat(1, 1fr);
			gap: 25px;

			@media (--md) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (--xl) {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
