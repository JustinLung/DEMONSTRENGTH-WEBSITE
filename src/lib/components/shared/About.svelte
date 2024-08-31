<script lang="ts">
	interface AboutInterface {
		title: string;
		description: string;
	}

	const { title, description }: AboutInterface = $props();
</script>

<section class="container" id="about">
	<img src="/images/placeholder.png" alt="placeholder" class="about-image" />
	<div class="about-text">
		<h2>{title}</h2>
		<p>{description}</p>
	</div>
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;

		@media (--lg) {
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 80px;
		}

		.about-image {
			width: 100%;
			max-width: 600px;
			margin-bottom: 20px;

			@media (--lg) {
				width: 50%;
				margin-bottom: 0;
			}
		}

		.about-text {
			max-width: 500px;
			width: 100%;

			@media (--lg) {
				width: 50%;
			}
		}

		h2 {
			margin: 0;
			font-size: 1.5rem;

			@media (--lg) {
				font-size: 2rem;
			}
		}

		p {
			margin-top: 20px;
			color: var(--grey);

			@media (--lg) {
				font-size: 1.2rem;
			}
		}
	}
</style>
