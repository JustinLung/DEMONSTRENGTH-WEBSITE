<script lang="ts">
	import { onMount } from 'svelte';
	import Review from './Review.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';
	interface ReviewsInterface {
		title: string;
		reviews: any;
	}
	const { title, reviews }: ReviewsInterface = $props();

	onMount(() => {
		gsap.to('.client-title', {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: easeOutExpo,
			scrollTrigger: {
				trigger: '#clients',
				start: 'top 30%',
				end: 'bottom',
				toggleActions: 'play none none none'
			}
		});

		gsap.fromTo(
			'.review',
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
					trigger: '#clients',
					start: 'top 25%',
					end: 'bottom',
					toggleActions: 'play none none none'
				}
			}
		);
	});
</script>

<section class="container" id="clients">
	<h2 class="client-title">{title}</h2>
	<div>
		{#each reviews as review}
			<Review name={review.name as string} review={review.review as string} classes="review" />
		{/each}
	</div>
</section>

<style lang="postcss">
	section {
		@media (--lg) {
			margin-block: 150px;
		}
		h2 {
			font-size: 1.5rem;
			font-weight: 400;
			margin-bottom: 25px;
			opacity: 0;
			transform: translateY(30px);

			@media (--lg) {
				margin-bottom: 50px;
				font-size: 3rem;
				text-align: center;
			}
		}

		div {
			display: grid;
			gap: 20px;

			@media (--md) {
				grid-template-columns: repeat(2, 1fr);
				place-content: center;
			}

			@media (--lg) {
				grid-template-columns: repeat(3, 1fr);
				place-content: center;
			}

			.review {
				opacity: 0;
				transform: translateY(30px);
			}
		}
	}
</style>
