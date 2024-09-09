<script lang="ts">
	interface ReviewsInterface {
		title: string;
	}
	const { title }: ReviewsInterface = $props();
</script>

<section class="container">
	<h2>{title}</h2>
</section>

<style lang="postcss">
	section {
		@media (--lg) {
			margin-block: 150px;
		}
		h2 {
			font-size: 1.5rem;
			font-weight: 400;
			margin-bottom: 25px;

			@media (--lg) {
				margin-bottom: 50px;
				font-size: 3rem;
				text-align: center;
			}
		}
	}
</style>
