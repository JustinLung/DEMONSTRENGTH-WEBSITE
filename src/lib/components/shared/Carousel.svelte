<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
	import CarouselItem from './CarouselItem.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';
	import { onMount } from 'svelte';

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

		const setDraggingCursor = (isDraggingState: boolean) => {
			isDragging = isDraggingState;
		};

		embla.on('select', updateButtonStates);

		embla.on('pointerDown', () => setDraggingCursor(true));
		embla.on('pointerUp', () => setDraggingCursor(false));
		embla.on('settle', () => setDraggingCursor(false));

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
			duration: 0.3,
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
<section class="carousel container {isDragging ? 'is-dragging' : ''}">
	<div class="carousel-header">
		<h2>{title}</h2>
		<div class="button-container">
			<button onclick={prev} disabled={!canPrev}>
				<svg
					width="34"
					height="20"
					viewBox="0 0 34 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11 2.66666L3.66667 9.99999L11 17.3333"
						stroke="#FAFAFA"
						stroke-width="3.66667"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M31.1667 10L3.66675 10"
						stroke="#FAFAFA"
						stroke-width="3.66667"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button onclick={next} disabled={!canNext}>
				<svg
					width="34"
					height="20"
					viewBox="0 0 34 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M23 2.66666L30.3333 9.99999L23 17.3333"
						stroke="#FAFAFA"
						stroke-width="3.66667"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M2.83325 10L30.3333 10"
						stroke="#FAFAFA"
						stroke-width="3.66667"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>
	<div class="embla" bind:this={emblaNode}>
		<div class="embla__container">
			{#each items as item}
				<CarouselItem title={item.title} classes="carousel-item" />
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	.carousel {
		position: relative;
		z-index: 9;

		cursor: grab;

		&.is-dragging {
			cursor: grabbing;
		}

		.carousel-header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 29px;
			opacity: 0;
			transform: translateY(30px);

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

					svg {
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
	}

	.carousel-item {
		opacity: 0;
		transform: translateY(30px);
	}
</style>
