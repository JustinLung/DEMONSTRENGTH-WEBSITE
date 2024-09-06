<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Lenis from '$lib/components/shared/Lenis.svelte';
	import '../styles/all.css';
</script>

<Lenis />
<Header />
<main>
	<slot />
</main>
<Footer />
