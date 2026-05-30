<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type CrossfadeImage = {
		src: string;
		alt?: string;
	};

	interface CrossfadeImagesProps {
		images: CrossfadeImage[];
		intervalMs?: number;
		transitionMs?: number;
		classes?: string;
	}

	const {
		images,
		intervalMs = 6500,
		transitionMs = 1400,
		classes
	}: CrossfadeImagesProps = $props();

	let activeIndex = $state(0);
	let intervalId: ReturnType<typeof setInterval> | undefined;
	let mediaQuery: MediaQueryList | undefined;

	function startSlideshow() {
		if (intervalId || images.length <= 1 || mediaQuery?.matches) return;

		intervalId = setInterval(() => {
			activeIndex = (activeIndex + 1) % images.length;
		}, intervalMs);
	}

	function stopSlideshow() {
		if (!intervalId) return;

		clearInterval(intervalId);
		intervalId = undefined;
	}

	function handleReducedMotionChange() {
		if (mediaQuery?.matches) {
			stopSlideshow();
			activeIndex = 0;
			return;
		}

		startSlideshow();
	}

	onMount(() => {
		mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		mediaQuery.addEventListener('change', handleReducedMotionChange);
		startSlideshow();
	});

	onDestroy(() => {
		stopSlideshow();
		mediaQuery?.removeEventListener('change', handleReducedMotionChange);
	});
</script>

<section class="image-crossfade-section {classes}" aria-hidden="true">
	<div class="crossfade-images" style:--transition-ms={`${transitionMs}ms`}>
		{#each images as image, index}
			<img
				src={image.src}
				alt=""
				class:active={index === activeIndex}
				draggable="false"
				loading={index === 0 ? 'eager' : 'lazy'}
			/>
		{/each}
	</div>
</section>

<style lang="postcss">
	.image-crossfade-section {
		position: relative;
		height: calc(100 * var(--svh));
		overflow: hidden;
	}

	.crossfade-images {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			opacity: 0;
			transition: opacity var(--transition-ms) ease-in-out;
			user-select: none;
		}

		img.active {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crossfade-images img {
			transition: none;
		}
	}
</style>
