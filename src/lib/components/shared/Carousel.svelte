<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
	import CarouselItem from './CarouselItem.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';
	import { onMount } from 'svelte';
	import NextArrow from '../icons/NextArrow.svelte';
	import BackArrow from '../icons/BackArrow.svelte';

	interface CarouselInterface {
		title: string;
		items: any;
	}

	const { title, items }: CarouselInterface = $props();

	let canPrev = $state(false);
	let canNext = $state(false);

	let embla: EmblaCarouselType;
	let emblaNode: HTMLDivElement;

	const options = {
		loop: false
	};

	let isDragging = $state(false);

	$effect(() => {
		embla = EmblaCarousel(emblaNode, options);

		const updateButtonStates = () => {
			canPrev = embla.canScrollPrev();
			canNext = embla.canScrollNext();
		};

		embla.on('select', updateButtonStates);

		updateButtonStates();

		return () => {
			if (embla) embla.destroy();
		};
	});

	const prev = () => embla && embla.scrollPrev();
	const next = () => embla && embla.scrollNext();

	onMount(() => {
		gsap.to('.carousel-header', {
			scrollTrigger: {
				trigger: '.carousel',
				start: 'top 30%',
				end: 'bottom 20%',
				toggleActions: 'play none none none'
			},
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: easeOutExpo
		});

		gsap.fromTo(
			'.carousel-item',
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
					trigger: '.carousel',
					start: 'top 25%',
					end: 'bottom',
					toggleActions: 'play none none none'
				}
			}
		);
	});
</script>

<!-- svelte-ignore css_unused_selector -->
<section class="carousel" id="highlights">
	<div class="carousel-header container">
		<h2>{title}</h2>
		<div class="button-container">
			<button onclick={prev} disabled={!canPrev}> <BackArrow classes="arrow" /></button>
			<button onclick={next} disabled={!canNext}>
				<NextArrow classes="arrow" />
			</button>
		</div>
	</div>
	<div class="embla" bind:this={emblaNode}>
		<div class="container embla__container">
			{#each items as item}
				<CarouselItem tag={item.tag} classes="carousel-item" />
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	.carousel {
		position: relative;
		z-index: 9;
		margin-bottom: 40px;

		.carousel-header {
			display: flex;
			justify-content: space-between;
			opacity: 0;
			transform: translateY(30px);
			padding-block: 0;
			margin-bottom: 29px;

			@media (--lg) {
				margin-bottom: 59px;
			}

			.button-container {
				display: flex;
				gap: 24px;

				button {
					background-color: transparent;
					color: var(--white);
					cursor: pointer;
					border: none;

					&:disabled {
						color: var(--grey);
					}

					.arrow {
						width: 24px;
						height: 24px;

						@media (--lg) {
							width: 34px;
							height: 34px;
						}
						path {
							stroke: var(--white);
						}
					}
				}
			}

			h2 {
				font-size: 1.5rem;

				@media (--lg) {
					font-size: 2.25rem;
					font-weight: 500;
				}
			}

			button:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
		gap: 20px;
		padding-block: 0;
	}

	.carousel-item {
		opacity: 0;
		transform: translateY(30px);
	}
</style>
