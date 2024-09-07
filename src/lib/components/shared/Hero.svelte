<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from './Button.svelte';

	interface HeroProps {
		title: string;
		description: string;
	}

	let { title, description }: HeroProps = $props();
	let headerHeight = $state(0);
	let hero: HTMLTableSectionElement;

	function updateHeaderHeight() {
		const headerElement = document.querySelector('header');
		if (headerElement && hero) {
			headerHeight = headerElement.offsetHeight;
			hero.style.marginTop = `${headerHeight}px`;
		}
	}

	onMount(() => {
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);
	});

	onDestroy(() => {
		window.removeEventListener('resize', updateHeaderHeight);
	});
</script>

<section class="container" bind:this={hero as any}>
	<h1>{title}</h1>
	<p>{description}</p>
	<div class="button-container">
		<Button href="/coaching" primary>Start coaching</Button>
		<Button href="/about">Over ons</Button>
	</div>
</section>

<style lang="postcss">
	section {
		height: calc(50 * var(--svh));

		display: grid;
		place-content: center;
		text-align: center;

		@media (--md) {
			height: calc(65 * var(--svh));
		}

		h1 {
			margin-bottom: 8px;
			font-size: 2.5rem;

			@media (--md) {
				font-size: 5.5rem;
				max-width: 948px;
			}
		}

		p {
			max-width: 690px;
			font-size: 1.125rem;
			margin-inline: auto;
			color: var(--grey);

			@media (--md) {
				font-size: 1.5rem;
			}
		}

		.button-container {
			display: flex;
			justify-content: center;

			margin-top: 16px;
			gap: 8px;

			@media (--md) {
				margin-top: 26px;
				gap: 16px;
			}
		}
	}
</style>
