<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Lenis from '$lib/components/shared/Lenis.svelte';
	import ViewTransition from '$lib/components/shared/ViewTransition.svelte';
	import { siteSeo } from '$lib/config/seo';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../styles/all.css';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();
	const site = $derived(data.site);
	const siteUrl = $derived(new URL('/', data.canonicalUrl).href);
	const organizationSchemaJson = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'SportsActivityLocation',
			name: siteSeo.name,
			url: siteUrl,
			logo: new URL(siteSeo.logoPath, siteUrl).href,
			sameAs: site.footer.socialLink.href.startsWith('http')
				? [site.footer.socialLink.href]
				: undefined
		})
	);
	const organizationSchemaScript = $derived(
		`<script type="application/ld+json">${organizationSchemaJson.replaceAll('<', '\\u003c')}<\/script>`
	);

	gsap.registerPlugin(ScrollTrigger);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	/>
	{@html organizationSchemaScript}
</svelte:head>

<Lenis />
<ViewTransition />
<Header {...site.header} />
<main>
	{@render children()}
</main>
<Footer {...site.footer} />
