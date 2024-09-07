<script>
	import Button from '$lib/components/shared/Button.svelte';
</script>

<section class="container">
	<h1>404</h1>
	<p>
		Het lijkt erop dat deze pagina niet bestaat. Geen paniek! Je kunt terug naar onze homepage om je
		powerlifting doelen weer op te bouwen. Blijf in beweging en ontdek wat je nog meer kunt
		bereiken! 💪
	</p>
	<Button href="/" primary>Home</Button>
</section>

<style lang="postcss">
	section {
		min-height: calc(var(--svh) * 83);

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
