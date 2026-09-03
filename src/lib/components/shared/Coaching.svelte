<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';

	type CoachingImage = {
		src: string;
		alt?: string;
	};

	type CoachingTab = {
		_key?: string;
		label: string;
		title?: string;
		items: string[];
	};

	interface CoachingProps {
		eyebrow?: string;
		title: string;
		description?: string;
		image?: CoachingImage;
		includedTitle: string;
		items: string[];
		tabs?: CoachingTab[];
	}

	const {
		eyebrow,
		title,
		description,
		image = { src: '/images/placeholder.svg', alt: 'Coaching' },
		includedTitle,
		items,
		tabs = []
	}: CoachingProps = $props();

	let activeTabIndex = $state(0);
	const validTabs = $derived(
		tabs.filter((tab) => tab.label?.trim() && tab.items?.length)
	);
	const showTabList = $derived(validTabs.length > 1);
	const activeContent = $derived(
		validTabs[activeTabIndex] ?? {
			title: includedTitle,
			items
		}
	);

	function selectTab(index: number) {
		activeTabIndex = index;
	}

	function handleTabKeydown(event: KeyboardEvent, index: number) {
		if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

		event.preventDefault();
		const lastIndex = validTabs.length - 1;
		const nextIndex =
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? lastIndex
					: event.key === 'ArrowRight'
						? (index + 1) % validTabs.length
						: (index - 1 + validTabs.length) % validTabs.length;

		selectTab(nextIndex);
		document.getElementById(`coaching-tab-${nextIndex}`)?.focus();
	}

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
		style:--coaching-image-url={image.src ? `url("${image.src}")` : undefined}
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
		{#if showTabList}
			<div class="coaching-tabs" role="tablist" aria-label="Coaching information">
				{#each validTabs as tab, index (tab._key ?? tab.label)}
					<button
						id={`coaching-tab-${index}`}
						type="button"
						role="tab"
						aria-selected={activeTabIndex === index}
						aria-controls="coaching-tab-panel"
						tabindex={activeTabIndex === index ? 0 : -1}
						class:active={activeTabIndex === index}
						onclick={() => selectTab(index)}
						onkeydown={(event) => handleTabKeydown(event, index)}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		{/if}

		<div
			id="coaching-tab-panel"
			class="coaching-tab-panel"
			role={showTabList ? 'tabpanel' : undefined}
			aria-labelledby={showTabList ? `coaching-tab-${activeTabIndex}` : undefined}
		>
			{#if activeContent.title}
				<h3>{activeContent.title}</h3>
			{/if}
			<ul>
				{#each activeContent.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
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
		background-color: var(--black);
		background-image:
			linear-gradient(180deg, rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.78)),
			var(--coaching-image-url);
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
		font-size: 0.875rem;
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
			linear-gradient(180deg, rgb(255 255 255 / 0.035), rgb(255 255 255 / 0.01)), var(--black);

		@media (--lg) {
			padding: 40px;
		}
	}

	.coaching-tabs {
		display: flex;
		gap: 8px;
		margin-bottom: 28px;
		padding-bottom: 12px;
		overflow-x: auto;
		border-bottom: 1px solid rgb(255 255 255 / 0.1);
	}

	.coaching-tabs button {
		flex: 0 0 auto;
		border: 1px solid rgb(255 255 255 / 0.14);
		border-radius: 9999px;
		padding: 9px 16px;
		background: transparent;
		color: rgb(255 255 255 / 0.65);
		font: inherit;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease,
			color 160ms ease;
	}

	.coaching-tabs button:hover,
	.coaching-tabs button:focus-visible {
		border-color: rgb(255 255 255 / 0.35);
		color: var(--white);
	}

	.coaching-tabs button:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	.coaching-tabs button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: var(--white);
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
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		border-radius: 10px;
		padding: 16px;
		background: rgb(0 0 0 / 0.2);
		color: var(--white);
		line-height: 1.45;
	}

	li::before {
		content: '';
		position: absolute;
		top: 22px;
		left: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--primary);
	}
</style>
