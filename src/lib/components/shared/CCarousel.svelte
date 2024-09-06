<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Carousel } from 'svelte-carousel';
	import { browser } from '$app/environment';

	interface CarouselInterface {
		title: string;
		// children: Snippet;
	}

	const { title }: CarouselInterface = $props();
	let carousel;
</script>

<section class="container">
	<h2>{title}</h2>
	{#if browser}
		<Carousel bind:this={carousel}>
			<div>1</div>
			<div>2</div>
			<div>3</div>
		</Carousel>
	{/if}
</section>

<style lang="postcss">
	section {
		max-width: 1200px;

		h2 {
			font-weight: 500;
			font-size: 2.25rem;
		}

		.carousel {
			img {
				width: 400px;
				height: 490px;
				object-fit: cover;
				border-radius: 1.5rem;
			}
		}
	}
</style>
