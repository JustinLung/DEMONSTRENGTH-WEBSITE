<script lang="ts">
	const links = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'About',
			href: '/about'
		}
	];
</script>

<header class="flex items-center justify-between container mx-auto p-4">
	<h1 class="text-xl font-bold">DEMONSTRENGTH</h1>
	<nav>
		<ul class="flex gap-4">
			{#each links as link}
				<li>
					<a href={link.href}>{link.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
