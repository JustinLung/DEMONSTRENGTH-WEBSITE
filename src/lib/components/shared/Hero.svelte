<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from './Button.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';

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
		const tl = gsap.timeline({
			defaults: {
				ease: easeOutExpo
			}
		});

		tl.to('.stagger', {
			opacity: 1,
			y: 0,
			stagger: 0.15,
			delay: 0.3
		});

		if (typeof window !== 'undefined') {
			updateHeaderHeight();
			window.addEventListener('resize', updateHeaderHeight);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateHeaderHeight);
		}
	});
</script>

<section class="container" bind:this={hero as any}>
	<h1 class="stagger">{title}</h1>
	<p class="stagger">{description}</p>
	<div class="button-container stagger">
		<Button href="/coaching" primary classes="stagger">Start coaching</Button>
		<Button href="/#about" classes="stagger">Over ons</Button>
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
			font-size: 1rem;
			margin-inline: auto;
			color: var(--grey);

			@media (--md) {
				font-size: 1.5rem;
			}
		}

		.button-container {
			display: flex;
			justify-content: center;

			margin-top: 24px;
			gap: 8px;

			@media (--md) {
				margin-top: 26px;
				gap: 16px;
			}
		}
	}

	.stagger {
		opacity: 0;
		transform: translateY(20px);
	}
</style>
