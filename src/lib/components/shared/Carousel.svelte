<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
	import CarouselItem from './CarouselItem.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';
	import { onMount } from 'svelte';
	import NextArrow from '../icons/NextArrow.svelte';
	import BackArrow from '../icons/BackArrow.svelte';

	type CarouselMedia = {
		url: string;
		alt?: string;
		mimeType: string;
		video?: {
			thumbnailUrl?: string;
			mp4Url?: string;
		};
	};

	type CarouselItemData = {
		tag: string;
		media: CarouselMedia;
	};

	interface CarouselInterface {
		title: string;
		items: CarouselItemData[];
		closeLabel?: string;
		previousLabel?: string;
		nextLabel?: string;
	}

	const {
		title,
		items,
		closeLabel = 'Close',
		previousLabel = 'Previous highlights',
		nextLabel = 'Next highlights'
	}: CarouselInterface = $props();

	let canPrev = $state(false);
	let canNext = $state(false);
	const canScroll = $derived(canPrev || canNext);

	let embla: EmblaCarouselType;
	let emblaNode: HTMLDivElement;

	const options = {
		loop: false
	};

	$effect(() => {
		if (!emblaNode) return;

		embla = EmblaCarousel(emblaNode, options);

		const updateButtonStates = () => {
			canPrev = embla.canScrollPrev();
			canNext = embla.canScrollNext();
		};

		embla.on('select', updateButtonStates);
		embla.on('reInit', updateButtonStates);

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

<section class="carousel" id="highlights">
	<div class="carousel-header container">
		<h2>{title}</h2>
		{#if canScroll}
			<div class="button-container">
				<button onclick={prev} disabled={!canPrev} aria-label={previousLabel} type="button">
					<BackArrow classes="arrow" /></button
				>
				<button onclick={next} disabled={!canNext} aria-label={nextLabel} type="button">
					<NextArrow classes="arrow" />
				</button>
			</div>
		{/if}
	</div>
	<div class="embla" bind:this={emblaNode}>
		<div class="container embla__container">
			{#each items as item}
				<CarouselItem
					tag={item.tag}
					videoSrc={item.media.mimeType === 'video/mp4' ? item.media.url : undefined}
					thumbnailSrc={item.media.mimeType.startsWith('image/')
						? item.media.url
						: item?.media?.video?.thumbnailUrl}
					thumbnailAlt={item.media.alt || 'Carousel item thumbnail'}
					mediaType={item.media.mimeType.startsWith('video') ? 'video' : 'image'}
					classes="carousel-item"
					{closeLabel}
				/>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	.carousel {
		position: relative;
		z-index: 9;

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
