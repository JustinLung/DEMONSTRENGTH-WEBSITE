<script>
	import Button from '$lib/components/shared/Button.svelte';
</script>

<section class="container">
	<h1>404</h1>
	<p>
		Het lijkt erop dat deze pagina niet bestaat, maar geen zorgen, jouw fitnessdoelen zijn nog
		steeds binnen handbereik! Probeer een andere oefening (pagina), of spring terug naar onze
		homepage voor nieuwe inspiratie.
	</p>
	<Button href="/" primary>Home</Button>
</section>

<style lang="postcss">
	section {
		min-height: calc(var(--svh) * 75);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;

		text-align: center;

		h1 {
			font-size: 8rem;
			font-weight: 500;
			line-height: 100px;
		}

		p {
			font-weight: 300;
			font-size: 1.25rem;
			max-width: 600px;
			text-align: center;
			color: var(--grey);
		}
	}
</style>
