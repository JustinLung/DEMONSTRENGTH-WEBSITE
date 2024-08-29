<script lang="ts">
	interface HeroProps {
		title: string;
		description: string;
	}

	let { title, description }: HeroProps = $props();
</script>

<section>
	<h1>{title}</h1>
	<p>{description}</p>
</section>
