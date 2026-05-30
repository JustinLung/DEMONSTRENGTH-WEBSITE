<script lang="ts">
	import Seo from '$lib/components/shared/Seo.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const termsPage = $derived(data.termsAndConditionsPage);
</script>

<Seo
	title={termsPage.seo.title ?? termsPage.hero.title}
	canonicalUrl={data.canonicalUrl}
	description={termsPage.seo.description}
	imagePath={termsPage.seo.imagePath}
	noindex
/>

<section class="terms-and-conditions container">
	<h1>{termsPage.hero.title}</h1>

	{#if termsPage.hero.intro}
		<p class="intro">{termsPage.hero.intro}</p>
	{/if}

	{#each termsPage.sections as section}
		<section class="terms-section">
			<h2>{section.title}</h2>

			{#each section.paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</section>
	{/each}

	<div class="contact-info">
		<h2>{termsPage.contact.title}</h2>

		<p>
			{#each termsPage.contact.lines as line}
				<span>{line}</span>
			{/each}
		</p>
	</div>
</section>

<style lang="postcss">
	.terms-and-conditions {
		margin-block: 156px;
		display: grid;
		gap: 16px;
		max-width: 780px;
	}

	.intro,
	.terms-section,
	.contact-info {
		display: grid;
		gap: 12px;
	}

	.contact-info span {
		display: block;
	}
</style>
