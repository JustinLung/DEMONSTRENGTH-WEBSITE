<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from './Button.svelte';
	import CrossfadeImages from './CrossfadeImages.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';

	type HeroImage = {
		src: string;
		alt?: string;
	};

	type HeroLink = {
		href: string;
		label: string;
	};

	interface HeroProps {
		title: string;
		description: string;
		images?: HeroImage[];
		primaryCta?: HeroLink;
		secondaryCta?: HeroLink;
	}

	let {
		title,
		description,
		images = [{ src: '/images/placeholder.svg' }],
		primaryCta = { href: '#', label: 'Placeholder CTA' },
		secondaryCta = { href: '/#about', label: 'Placeholder Link' }
	}: HeroProps = $props();
	let headerHeight = $state(0);
	let hero: HTMLElement;

	function updateHeaderHeight() {
		const headerElement = document.querySelector('header');
		if (headerElement && hero) {
			headerHeight = headerElement.offsetHeight;
			hero.style.setProperty('--header-height', `${headerHeight}px`);
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

<section class="hero" bind:this={hero}>
	<CrossfadeImages images={images} classes="hero-images" />
	<div class="hero-vignette" aria-hidden="true"></div>

	<div class="container hero-content">
		<h1 class="stagger">{title}</h1>
		<p class="stagger">{description}</p>
		<div class="button-container stagger">
			<Button href={primaryCta.href} primary classes="stagger">{primaryCta.label}</Button>
			<Button href={secondaryCta.href} classes="stagger">{secondaryCta.label}</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	.hero {
		--header-height: 0px;
		position: relative;
		isolation: isolate;
		min-height: calc(100 * var(--svh));
		display: flex;
		align-items: center;
		overflow: hidden;
		padding-top: var(--header-height);

		@media (--md) {
			min-height: calc(92 * var(--svh));
		}

		:global(.hero-images) {
			position: absolute;
			inset: 0;
			z-index: -2;
		}

		.hero-vignette {
			position: absolute;
			inset: 0;
			z-index: -1;
			background:
				radial-gradient(circle at 72% 48%, transparent 0 24%, rgb(0 0 0 / 0.34) 52%, var(--black) 100%),
				linear-gradient(90deg, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.68) 34%, rgb(0 0 0 / 0.24) 70%),
				linear-gradient(180deg, rgb(0 0 0 / 0.64) 0%, transparent 32%, var(--black) 100%);
		}

		.hero-content {
			width: 100%;
			padding-top: 0;
			padding-bottom: 0;
		}

		h1 {
			max-width: 760px;
			margin-bottom: 8px;
			font-size: clamp(3rem, 10vw, 5.6rem);
			line-height: 0.98;
			letter-spacing: -0.06em;

			@media (--md) {
				max-width: 900px;
			}
		}

		p {
			max-width: 660px;
			font-size: 1rem;
			color: var(--grey);

			@media (--md) {
				font-size: 1.5rem;
			}
		}

		.button-container {
			display: flex;
			flex-wrap: wrap;
			margin-top: 24px;
			gap: 12px;

			@media (--md) {
				margin-top: 26px;
				gap: 16px;
			}
		}

		@media (max-width: 47.999em) {
			align-items: center;

			:global(.hero-images img) {
				object-position: 62% center;
			}

			.hero-vignette {
				background:
					radial-gradient(circle at 70% 54%, transparent 0 18%, rgb(0 0 0 / 0.34) 54%, var(--black) 100%),
					linear-gradient(180deg, rgb(0 0 0 / 0.64) 0%, rgb(0 0 0 / 0.2) 24%, rgb(0 0 0 / 0.7) 72%, var(--black) 100%),
					linear-gradient(90deg, rgb(0 0 0 / 0.76) 0%, rgb(0 0 0 / 0.2) 100%);
			}
		}
	}

	.stagger {
		opacity: 0;
		transform: translateY(20px);
	}
</style>
