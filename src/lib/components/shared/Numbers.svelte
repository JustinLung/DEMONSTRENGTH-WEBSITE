<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import {
		getImageDimensions,
		optimizedSanityImageSrcset,
		optimizedSanityImageUrl
	} from '$lib/utils/images';
	import { easeOutExpo } from '$lib/utils/transition';

	type NumberItem = {
		value: number;
		suffix?: string;
		label: string;
	};

	interface NumbersProps {
		title: string;
		image: {
			src: string;
			alt?: string;
		};
		items: NumberItem[];
	}

	const { title, image, items }: NumbersProps = $props();

	let sectionElement: HTMLElement;
	const imageDimensions = $derived(getImageDimensions(image.src));
	const imageWidths = [640, 960, 1280, 1600];
	const numberFormatter = new Intl.NumberFormat('nl-NL', {
		maximumFractionDigits: 0
	});

	function formatNumber(value: number) {
		return numberFormatter.format(Math.round(value));
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const context = gsap.context(() => {
			const valueElements = gsap.utils.toArray<HTMLElement>('[data-number-value]');
			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top 75%',
					toggleActions: 'play none none none'
				}
			});

			timeline
				.from('.numbers-title', {
					opacity: 0,
					y: 20,
					duration: 0.5,
					ease: easeOutExpo
				})
				.from(
					'.number-item',
					{
						opacity: 0,
						y: 24,
						duration: 0.55,
						stagger: 0.1,
						ease: easeOutExpo
					},
					'-=0.25'
				);

			valueElements.forEach((element, index) => {
				const target = Number(element.dataset.numberValue);
				const counter = { value: 0 };

				timeline.fromTo(
					counter,
					{ value: 0 },
					{
						value: target,
						duration: 1.35,
						ease: 'power3.out',
						onStart: () => {
							element.textContent = formatNumber(0);
						},
						onUpdate: () => {
							element.textContent = formatNumber(counter.value);
						},
						onComplete: () => {
							element.textContent = formatNumber(target);
						}
					},
					0.15 + index * 0.1
				);
			});
		}, sectionElement);

		return () => context.revert();
	});
</script>

<section
	class="numbers-section container"
	id="numbers"
	aria-labelledby="numbers-title"
	bind:this={sectionElement}
>
	<div class="numbers-panel">
		<img
			class="numbers-image"
			src={optimizedSanityImageUrl(image.src, { width: 1600, quality: 78 })}
			srcset={optimizedSanityImageSrcset(image.src, imageWidths, { quality: 78 })}
			sizes="(min-width: 100em) 100rem, 100vw"
			alt={image.alt ?? ''}
			loading="lazy"
			width={imageDimensions?.width}
			height={imageDimensions?.height}
		/>
		<div class="numbers-overlay"></div>
		<div class="numbers-content">
			<h2 class="numbers-title" id="numbers-title">{title}</h2>
			<div class="numbers-grid">
				{#each items as item}
					<div
						class="number-item"
						aria-label={`${formatNumber(item.value)}${item.suffix ?? ''} ${item.label}`}
					>
						<p class="number">
							<span data-number-value={item.value}>{formatNumber(item.value)}</span>{item.suffix ??
								''}
						</p>
						<p class="label">{item.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.numbers-panel {
		position: relative;
		display: grid;
		min-height: 380px;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 0.1);
		border-radius: 12px;
		isolation: isolate;

		@media (--md) {
			min-height: 490px;
		}
	}

	.numbers-image,
	.numbers-overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.numbers-image {
		z-index: -2;
		object-fit: cover;
		object-position: center;
	}

	.numbers-overlay {
		z-index: -1;
		background:
			linear-gradient(180deg, rgb(0 0 0 / 0.38), rgb(0 0 0 / 0.68)),
			linear-gradient(90deg, rgb(0 0 0 / 0.22), transparent 50%, rgb(0 0 0 / 0.22));
	}

	.numbers-content {
		display: grid;
		align-content: center;
		gap: 40px;
		width: 100%;
		padding: 40px 24px;

		@media (--md) {
			gap: 46px;
			padding: 48px;
		}
	}

	.numbers-title {
		margin: 0;
		text-align: center;
		font-size: clamp(1.35rem, 3vw, 2rem);
		font-weight: 650;
		letter-spacing: -0.03em;
	}

	.numbers-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 32px 20px;

		@media (--md) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 24px;
		}
	}

	.number-item {
		min-width: 0;
		text-align: center;
	}

	.number,
	.label {
		margin: 0;
	}

	.number {
		font-size: clamp(2.6rem, 6vw, 4.75rem);
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.055em;
		font-variant-numeric: tabular-nums;
	}

	.label {
		margin-top: 12px;
		font-size: clamp(0.72rem, 1.5vw, 1rem);
		font-weight: 750;
		line-height: 1.15;
		letter-spacing: 0.015em;
		text-transform: uppercase;
	}
</style>
