<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import '../styles/all.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />
