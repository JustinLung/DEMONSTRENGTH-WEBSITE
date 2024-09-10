<script lang="ts">
	import VideoIcon from '../icons/VideoIcon.svelte';

	const { tag = 'Powerlifting', classes }: { tag: string; classes?: string } = $props();
</script>

<article class="embla__slide {classes}">
	<div class="item-header">
		<span><VideoIcon /></span>
		<span class="tag">
			{tag}
		</span>
	</div>
</article>

<style lang="postcss">
	.embla__slide {
		border-radius: 16px;
		background: var(--tertiary);

		min-width: 301px;
		min-height: 349px;

		@media (--lg) {
			min-width: 401px;
			min-height: 449px;
		}

		.item-header {
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
</style>
