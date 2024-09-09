<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Lenis from '$lib/components/shared/Lenis.svelte';
	import ViewTransition from '$lib/components/shared/ViewTransition.svelte';
	import '../styles/all.css';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);
</script>

<Lenis />
<ViewTransition />
<Header />
<main>
	<slot />
</main>
<Footer />
