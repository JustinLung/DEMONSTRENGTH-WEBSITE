<script lang="ts">
	const { title }: { title: string } = $props();
</script>

<div class="embla__slide">
	{title}
</div>

<style lang="postcss">
	.embla__slide {
		border-radius: 16px;
		background: var(--primary);

		min-width: 301px;
		min-height: 349px;

		display: flex;
		justify-content: center;
		align-items: center;

		@media (--lg) {
			min-width: 401px;
			min-height: 449px;
		}
	}
</style>
