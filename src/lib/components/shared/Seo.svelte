<script lang="ts">
	import { buildPageTitle, siteSeo } from '$lib/config/seo';

	interface SeoProps {
		title?: string;
		description?: string;
		canonicalUrl: string;
		imagePath?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
	}

	const {
		title,
		description = siteSeo.description,
		canonicalUrl,
		imagePath = siteSeo.socialImagePath,
		type = 'website',
		noindex = false
	}: SeoProps = $props();

	const pageTitle = $derived(buildPageTitle(title));
	const imageUrl = $derived(new URL(imagePath, canonicalUrl).href);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:site_name" content={siteSeo.name} />
	<meta property="og:locale" content={siteSeo.locale} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
