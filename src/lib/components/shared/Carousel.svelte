<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';

	interface CarouselInterface {
		title: string;
	}

	const { title }: CarouselInterface = $props();

	let embla: any;
	let emblaNode: HTMLDivElement;

	const options = {
		loop: false
	};

	onMount(() => {
		embla = EmblaCarousel(emblaNode, options);
		return () => {
			if (embla) embla.destroy();
		};
	});

	// Handlers for next and previous buttons
	const prev = () => embla && embla.scrollPrev();
	const next = () => embla && embla.scrollNext();
</script>

<section class="carousel container">
	<div class="carousel-header">
		<h2>{title}</h2>
		<div>
			<button onclick={prev}>Previous</button>
			<button onclick={next}>Next</button>
		</div>
	</div>
	<div class="embla" bind:this={emblaNode}>
		<div class="embla__container">
			<div class="embla__slide">Slide 1</div>
			<div class="embla__slide">Slide 2</div>
			<div class="embla__slide">Slide 3</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.carousel {
		position: relative;

		.carousel-header {
			display: flex;
			justify-content: space-between;

			h2 {
				font-size: 2.25rem;
				font-weight: 500;
			}
		}
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		min-width: 100%;
		padding: 50px;
		text-align: center;
	}
</style>
