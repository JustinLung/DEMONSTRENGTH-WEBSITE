<script lang="ts">
	interface ReviewInterface {
		review: string;
		name: string;
		classes?: string;
	}

	const { review, name, classes }: ReviewInterface = $props();
</script>

<article class={classes}>
	<p>{review}</p>
	<span>{name}</span>
</article>

<style lang="postcss">
	article {
		width: 100%;
		padding: 20px;
		background-color: var(--tertiary);
		border-radius: 12px;

		p {
			font-size: 1rem;
			font-weight: 400;
			margin-bottom: 10px;
		}

		span {
			color: var(--grey);
			font-size: 0.875rem;
			font-weight: 400;
		}
	}
</style>
