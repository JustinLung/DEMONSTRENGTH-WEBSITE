<script lang="ts">
	import { coaches } from '$lib/utils/data/coach';
	import Coach from './Coach.svelte';

	const { title } = $props();
</script>

<section class="container" id="coaches">
	<h2>{title}</h2>
	<div>
		{#each coaches as coach}
			<Coach
				src={coach.src}
				alt={coach.alt}
				title={coach.title}
				description={coach.description}
				instagram={coach.instagram}
				tiktok={coach.tiktok}
			/>
		{/each}
	</div>
</section>

<style lang="postcss">
	section {
		margin-bottom: 110px;

		h2 {
			font-size: 1.5rem;
			margin-bottom: 29px;

			@media (--lg) {
				font-size: 2.25rem;
				font-weight: 500;
				margin-bottom: 59px;
			}
		}

		div {
			display: grid;
			gap: 25px;
		}
	}
</style>
