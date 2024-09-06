<script lang="ts">
	interface CarouselItemInterface {
		tag: string;
	}

	const { tag }: CarouselItemInterface = $props();
</script>

<article>
	<span>
		{tag}
	</span>
</article>
