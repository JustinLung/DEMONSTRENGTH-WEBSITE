<script lang="ts">
	import { browser } from '$app/environment';
	import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { portal } from 'svelte-portal';

	import Review from './Review.svelte';
	import gsap from 'gsap';
	import { easeOutExpo } from '$lib/utils/transition';
	import BackArrow from '../icons/BackArrow.svelte';
	import NextArrow from '../icons/NextArrow.svelte';

	type ReviewItem = {
		name: string;
		review: string;
		image?: {
			src: string;
			alt?: string;
		} | null;
	};

	interface ReviewsInterface {
		title: string;
		subtitle?: string;
		reviews: ReviewItem[];
		readMoreLabel?: string;
		closeLabel?: string;
		previousLabel?: string;
		nextLabel?: string;
	}

	const {
		title,
		subtitle,
		reviews,
		readMoreLabel = 'Lees meer',
		closeLabel = 'Close',
		previousLabel = 'Previous testimonials',
		nextLabel = 'Next testimonials'
	}: ReviewsInterface = $props();

	let canPrev = $state(false);
	let canNext = $state(false);
	const canScroll = $derived(canPrev || canNext);
	let emblaNode: HTMLDivElement;
	let embla: EmblaCarouselType | undefined;
	let selectedReview = $state<ReviewItem | null>(null);
	let previouslyFocusedElement: HTMLElement | null = null;
	let closeButton = $state<HTMLButtonElement | null>(null);
	let dialogElement = $state<HTMLElement | null>(null);

	const titleId = 'reviews-title';
	const subtitleId = 'reviews-description';
	const dialogTitleId = 'testimonial-dialog-title';
	const dialogDescriptionId = 'testimonial-dialog-description';

	function updateButtonStates() {
		if (!embla) return;

		canPrev = embla.canScrollPrev();
		canNext = embla.canScrollNext();
	}

	function prev() {
		embla?.scrollPrev();
	}

	function next() {
		embla?.scrollNext();
	}

	async function openReview(review: ReviewItem) {
		if (!browser) return;

		previouslyFocusedElement =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;
		selectedReview = review;
		document.body.style.overflow = 'hidden';
		await tick();
		closeButton?.focus();
	}

	function closeReview() {
		selectedReview = null;
		if (browser) {
			document.body.style.overflow = '';
			previouslyFocusedElement?.focus();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!selectedReview) return;

		if (event.key === 'Escape') {
			closeReview();
			return;
		}

		if (event.key !== 'Tab') return;

		if (!dialogElement) return;

		const dialogFocusableElements = dialogElement.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
		);
		const focusableElements = [closeButton, ...dialogFocusableElements].filter(
			(element): element is HTMLElement => Boolean(element)
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (!firstElement || !lastElement) return;

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	$effect(() => {
		if (!emblaNode) return;

		embla = EmblaCarousel(emblaNode, {
			align: 'start',
			containScroll: 'trimSnaps',
			dragFree: true
		});

		embla.on('select', updateButtonStates);
		embla.on('reInit', updateButtonStates);
		updateButtonStates();

		return () => {
			embla?.destroy();
			embla = undefined;
		};
	});

	onMount(() => {
		gsap.to('.reviews-header', {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: easeOutExpo,
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top 30%',
				end: 'bottom 20%',
				toggleActions: 'play none none none'
			}
		});

		gsap.fromTo(
			'.review-card',
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
					trigger: '.reviews',
					start: 'top 25%',
					end: 'bottom',
					toggleActions: 'play none none none'
				}
			}
		);
	});

	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<section
	class="reviews container"
	id="reviews"
	aria-labelledby={titleId}
	aria-describedby={subtitleId}
>
	<div class="reviews-header">
		<div>
			<h2 id={titleId}>{title}</h2>
			{#if subtitle}
				<p id={subtitleId} class="subtitle">{subtitle}</p>
			{/if}
		</div>

		{#if canScroll}
			<div class="button-container" aria-label="Testimonial carousel controls">
				<button type="button" onclick={prev} disabled={!canPrev} aria-label={previousLabel}>
					<BackArrow classes="arrow" />
				</button>
				<button type="button" onclick={next} disabled={!canNext} aria-label={nextLabel}>
					<NextArrow classes="arrow" />
				</button>
			</div>
		{/if}
	</div>

	<div class="embla" bind:this={emblaNode}>
		<div class="embla__container" aria-live="polite">
			{#each reviews as review}
				<Review
					name={review.name}
					review={review.review}
					image={review.image}
					classes="review-card"
					onOpen={() => openReview(review)}
					{readMoreLabel}
				/>
			{/each}
		</div>
	</div>
</section>

{#if selectedReview}
	<div class="modal-overlay" use:portal={'body'} transition:fade={{ duration: 220 }}>
		<button
			type="button"
			class="modal-backdrop"
			aria-label={closeLabel}
			tabindex="-1"
			onclick={closeReview}
		></button>
		<button
			type="button"
			class="close-button"
			bind:this={closeButton}
			aria-label={closeLabel}
			onclick={closeReview}
		>
			{closeLabel}
		</button>
		<div
			class="testimonial-dialog"
			bind:this={dialogElement}
			role="dialog"
			aria-modal="true"
			aria-labelledby={dialogTitleId}
			aria-describedby={dialogDescriptionId}
			tabindex="-1"
			transition:scale={{ duration: 320, start: 0.92, opacity: 0 }}
		>
			<h2 id={dialogTitleId} class="visually-hidden">Testimonial from {selectedReview.name}</h2>
			{#if selectedReview.image?.src}
				<img
					src={selectedReview.image.src}
					alt={selectedReview.image.alt ?? `Foto van ${selectedReview.name}`}
					class="testimonial-image"
				/>
			{/if}
			<blockquote id={dialogDescriptionId}>
				<p>"{selectedReview.review}"</p>
				<footer>&mdash; {selectedReview.name}</footer>
			</blockquote>
		</div>
	</div>
{/if}

<style lang="postcss">
	.reviews {
		.reviews-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 24px;
			margin-bottom: 42px;
			opacity: 0;
			transform: translateY(30px);
		}

		h2 {
			font-size: 1.5rem;
			font-weight: 400;

			@media (--lg) {
				font-size: 3rem;
			}
		}

		p {
			margin-top: 8px;
			color: var(--grey);
			font-size: 1rem;
		}

		.button-container {
			display: flex;
			gap: 24px;
			padding-top: 8px;

			button {
				display: grid;
				place-items: center;
				border: none;
				color: var(--white);
				background-color: transparent;
				cursor: pointer;

				&:disabled {
					opacity: 0.35;
					cursor: not-allowed;
				}

				&:focus-visible {
					outline: 2px solid var(--primary);
					outline-offset: 4px;
					border-radius: 2px;
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

		:global(.review-card) {
			opacity: 0;
			transform: translateY(30px);
		}
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		padding: 24px;
		background: rgb(0 0 0 / 0.78);
		backdrop-filter: blur(2px);
	}

	.modal-backdrop {
		position: absolute;
		inset: 0;
		border: none;
		background: transparent;
		cursor: default;
	}

	.close-button {
		position: fixed;
		top: 18px;
		right: 18px;
		z-index: 2;
		border: 2px solid var(--primary);
		border-radius: 2rem;
		padding: 8px 16px;
		color: var(--white);
		background: var(--primary);
		cursor: pointer;
		font-weight: 700;

		&:hover {
			background: transparent;
		}

		&:focus-visible {
			outline: 2px solid var(--white);
			outline-offset: 3px;
		}
	}

	.testimonial-dialog {
		position: relative;
		z-index: 1;
		width: min(100%, 520px);
		max-height: calc(100 * var(--svh) - 48px);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-gutter: stable;
		border-radius: 12px;
		background: var(--tertiary);
		box-shadow: 0 24px 80px rgb(0 0 0 / 0.5);
		color: var(--white);
		padding: 44px 36px 34px;

		.testimonial-image {
			width: 100%;
			aspect-ratio: 16 / 10;
			margin-bottom: 28px;
			border-radius: 8px;
			object-fit: cover;
		}

		&:focus {
			outline: none;
		}

		blockquote {
			margin: 0;
		}

		p {
			font-size: 1rem;
			font-style: italic;
			font-weight: 600;
			line-height: 1.5;
		}

		footer {
			margin-top: 24px;
			color: var(--grey);
			text-align: right;
		}
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
