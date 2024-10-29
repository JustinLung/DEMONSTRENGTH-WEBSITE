<script lang="ts">
	import { portal } from 'svelte-portal';
	import { fly, scale } from 'svelte/transition';
	import VideoIcon from '../icons/VideoIcon.svelte';

	const {
		tag = 'Powerlifting',
		videoSrc,
		thumbnailSrc,
		thumbnailAlt,
		classes,
		mediaType = 'video' // Possible values: 'video' or 'image'
	}: {
		tag: string;
		videoSrc?: string;
		classes?: string;
		thumbnailSrc?: string;
		thumbnailAlt?: string;
		mediaType?: 'video' | 'image';
	} = $props();

	let isOpen = $state(false);

	const openModal = () => {
		isOpen = true;
	};

	const closeModal = () => {
		isOpen = false;
		console.log('close');
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
	class="embla__slide {classes}"
	onclick={openModal}
	tabindex="0"
	onkeydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			openModal();
		}
	}}
>
	<div class="item-header">
		<span><VideoIcon /></span>
		<span class="tag">{tag}</span>
	</div>
	<img src={thumbnailSrc} alt={thumbnailAlt} class="thumbnail" />
</article>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="modal-overlay"
		onclick={closeModal}
		use:portal={'body'}
		transition:scale={{ duration: 400 }}
	>
		<button class="close-button" onclick={closeModal} type="button">Close </button>
		<div class="modal-content" transition:fly={{ y: 200, duration: 400, delay: 0.3 }}>
			{#if mediaType === 'video'}
				<!-- svelte-ignore a11y_media_has_caption -->
				<video controls poster={thumbnailSrc}>
					<source src={videoSrc} type="video/mp4" />
				</video>
			{:else if mediaType === 'image'}
				<img src={thumbnailSrc} alt={thumbnailAlt} class="modal-image" />
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.embla__slide {
		border: none;
		cursor: pointer;
		border-radius: 16px;
		background: var(--tertiary);
		min-width: 301px;
		min-height: 349px;
		position: relative;

		@media (--lg) {
			min-width: 401px;
			min-height: 449px;
		}

		.item-header {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: space-between;
			height: fit-content;
			padding: 16px;
			width: 100%;

			.tag {
				color: var(--white);
				background-color: var(--primary);
				padding: 8px 16px;
				border-radius: 2rem;
				font-weight: 500;
				font-size: 0.75rem;
			}
		}
	}

	.thumbnail {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 0;
		top: 0;
		left: 0;
		border-radius: 16px;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.modal-content {
		padding: 20px;
		border-radius: 10px;
		max-width: 90%;
		width: 800px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	video {
		width: 100%;
		max-height: 700px;
	}

	.modal-image {
		width: 100%;
		height: auto;
	}

	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
		cursor: pointer;

		border: none;

		color: var(--white);
		background-color: var(--primary);
		border: 2px solid var(--primary);
		padding: 8px 16px;
		border-radius: 2rem;
		font-weight: 500;
		font-size: 1rem;

		transition: background-color 0.3s var(--easeOutExpo);

		&:hover {
			background-color: transparent;
		}
	}
</style>
