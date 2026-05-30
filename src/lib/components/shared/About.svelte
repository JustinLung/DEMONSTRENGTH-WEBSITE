<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';

	interface AboutInterface {
		title: string;
		description: string;
		image?: {
			src: string;
			alt?: string;
		};
	}

	const {
		title,
		description,
		image = { src: '/images/placeholder.svg', alt: 'Placeholder' }
	}: AboutInterface = $props();

	onMount(() => {
		gsap.to('.about-image, .about-text', {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: easeOutExpo,
			scrollTrigger: {
				trigger: '#about',
				start: 'top 50%',
				end: 'bottom',
				toggleActions: 'play none none none'
			}
		});
	});
</script>

<section class="container" id="about">
	<img src={image.src} alt={image.alt} class="about-image" draggable="false" />
	<div class="about-text">
		<h2>{title}</h2>
		<p>{description}</p>
	</div>
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;

		@media (--xl) {
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 50px;
		}

		.about-image {
			width: 100%;
			margin-bottom: 20px;
			opacity: 0;
			transform: translateY(30px);
			border-radius: 12px;

			@media (--xl) {
				max-width: 800px;
				width: 100%;
				margin-bottom: 0;
			}
		}

		.about-text {
			width: 100%;
			opacity: 0;
			transform: translateY(30px);
			max-width: 800px;

			@media (--xl) {
				max-width: 500px;
				width: 50%;
			}
		}

		h2 {
			margin: 0;
			font-size: 1.5rem;
			font-weight: 500;
			max-width: 380px;

			@media (--xl) {
				font-size: 2rem;
			}
		}

		p {
			margin-top: 20px;
			color: var(--grey);

			@media (--xl) {
				font-size: 1rem;
			}
		}
	}
</style>
