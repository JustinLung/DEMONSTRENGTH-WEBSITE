<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';

	type CoachingImage = {
		src: string;
		alt?: string;
	};

	interface CoachingProps {
		eyebrow?: string;
		title: string;
		description?: string;
		image?: CoachingImage;
		includedTitle: string;
		items: string[];
	}

	const {
		eyebrow,
		title,
		description,
		image = { src: '/images/placeholder.svg', alt: 'Coaching' },
		includedTitle,
		items
	}: CoachingProps = $props();

	const backgroundImage = $derived(
		image.src
			? `linear-gradient(180deg, rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.78)), url("${image.src}")`
			: undefined
	);

	onMount(() => {
		gsap.fromTo(
			'.coaching-reveal',
			{
				opacity: 0,
				y: 30
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.55,
				ease: easeOutExpo,
				stagger: 0.12,
				scrollTrigger: {
					trigger: '.coaching-section',
					start: 'top 35%',
					end: 'bottom',
					toggleActions: 'play none none none'
				}
			}
		);
	});
</script>

<section class="coaching-section container" id="coaching" aria-labelledby="coaching-title">
	<div
		class="coaching-image coaching-reveal"
		style:background-image={backgroundImage}
		role="img"
		aria-label={image.alt || title}
	>
		<div class="coaching-intro">
			{#if eyebrow}
				<p class="eyebrow">{eyebrow}</p>
			{/if}
			<h2 id="coaching-title">{title}</h2>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>

	<div class="coaching-card coaching-reveal">
		<h3>{includedTitle}</h3>
		<ul>
			{#each items as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="postcss">
	.coaching-section {
		display: grid;
		gap: 24px;
		align-items: stretch;

		@media (--lg) {
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
			gap: 32px;
		}
	}

	.coaching-image,
	.coaching-card {
		border: 1px solid rgb(255 255 255 / 0.1);
		border-radius: 12px;
	}

	.coaching-image {
		display: grid;
		align-content: end;
		min-height: 280px;
		overflow: hidden;
		background-color: var(--tertiary);
		background-position: center;
		background-size: cover;

		@media (--lg) {
			min-height: 420px;
		}
	}

	.coaching-intro {
		padding: 28px;

		@media (--lg) {
			padding: 40px;
		}
	}

	.eyebrow {
		margin-bottom: 12px;
		color: var(--primary);
		background-color: var(--white);
		width: fit-content;
		padding: 4px 12px;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		font-size: clamp(2.25rem, 7vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: -0.06em;
	}

	.coaching-intro p:not(.eyebrow) {
		max-width: 520px;
		margin-top: 18px;
		color: var(--white);
		font-size: 1rem;
		line-height: 1.5;

		@media (--md) {
			font-size: 1.2rem;
		}
	}

	.coaching-card {
		padding: 24px;
		background:
			linear-gradient(180deg, rgb(255 255 255 / 0.035), rgb(255 255 255 / 0.01)), var(--tertiary);

		@media (--lg) {
			padding: 40px;
		}
	}

	h3 {
		margin: 0 0 24px;
		font-size: 1.25rem;
		font-weight: 500;

		@media (--lg) {
			font-size: 2rem;
		}
	}

	ul {
		display: grid;
		gap: 14px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		border-radius: 10px;
		padding: 18px 18px 18px 48px;
		background: rgb(0 0 0 / 0.2);
		color: var(--white);
		line-height: 1.45;
	}

	li::before {
		content: '';
		position: absolute;
		top: 22px;
		left: 20px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--primary);
		box-shadow: 0 0 20px rgb(75 0 130 / 0.8);
	}
</style>
