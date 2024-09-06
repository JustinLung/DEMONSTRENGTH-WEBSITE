<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';

	interface CarouselInterface {
		title: string;
	}

	const { title }: CarouselInterface = $props();

	let canPrev = $state(false);
	let canNext = $state(false);

	let embla: EmblaCarouselType;
	let emblaNode: HTMLDivElement;

	const options = {
		loop: false
	};

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
</script>

<section class="carousel container">
	<div class="carousel-header">
		<h2>{title}</h2>
		<div class="button-container">
			<button onclick={prev} disabled={!canPrev}>Previous</button>
			<button onclick={next} disabled={!canNext}>Next</button>
		</div>
	</div>
	<div class="embla" bind:this={emblaNode}>
		<div class="embla__container">
			<div class="embla__slide">Slide 1</div>
			<div class="embla__slide">Slide 2</div>
			<div class="embla__slide">Slide 3</div>
			<div class="embla__slide">Slide 3</div>
			<div class="embla__slide">Slide 3</div>
			<div class="embla__slide">Slide 3</div>
			<div class="embla__slide">Slide 3</div>
			<div class="embla__slide">Slide 3</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.carousel {
		position: relative;
		margin-bottom: 110px;

		.carousel-header {
			display: flex;
			justify-content: space-between;
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

	.embla__slide {
		border-radius: 16px;
		background: var(--primary);

		min-width: 301px;
		min-height: 349px;

		display: flex;
		justify-content: center;
		align-items: center;

		@media (--lg) {
			min-width: 401px;
			min-height: 449px;
		}
	}
</style>
