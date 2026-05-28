<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Lenis from '$lib/components/shared/Lenis.svelte';
	import ViewTransition from '$lib/components/shared/ViewTransition.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../styles/all.css';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();
	const site = $derived(data.site);

	gsap.registerPlugin(ScrollTrigger);
</script>

<Lenis />
<ViewTransition />
<Header {...site.header} />
<main>
	{@render children()}
</main>
<Footer {...site.footer} />
