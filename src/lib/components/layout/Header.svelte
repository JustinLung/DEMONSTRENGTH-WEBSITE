<script lang="ts">
	import { slide } from 'svelte/transition';
	import { easeInOutExpo } from '$lib/utils/transition';
	import { onDestroy, onMount } from 'svelte';

	let links = [
		{
			href: '/',
			title: 'Home'
		},
		{
			href: '/about',
			title: 'About'
		},
		{
			href: '/',
			title: 'Programs'
		},
		{
			href: '/gallerij',
			title: 'Gallerij'
		}
	];

	let isOpen = $state(false);

	const mediaQuery = window.matchMedia('(min-width: 48em)');

	function openMenu() {
		isOpen = !isOpen;
	}

	function handleResize() {
		if (mediaQuery.matches) {
			isOpen = false;
		}
	}

	onMount(() => {
		mediaQuery.addEventListener('change', handleResize);
	});

	onDestroy(() => {
		mediaQuery.removeEventListener('change', handleResize);
	});
</script>

<header class="container">
	<a href="/" class="main-title">demonstrength.</a>
	<nav class="desktop-nav">
		<ul>
			{#each links as link}
				<li>
					<a href={link.href}>{link.title}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<button onclick={openMenu} class="hamburger-menu">
		<span class:isOpen></span>
		<span class:isOpen></span>
		<span class:isOpen></span>
	</button>

	{#if isOpen}
		<nav
			class="mobile-nav"
			in:slide={{ duration: 600, easing: easeInOutExpo }}
			out:slide={{ duration: 500, easing: easeInOutExpo }}
		>
			<ul>
				{#each links as link}
					<li>
						<a href={link.href}>{link.title}</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>

<style lang="postcss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.main-title {
			position: relative;
			z-index: 1;
			font-weight: 500;
			font-size: 1.5rem;
		}

		.desktop-nav {
			display: none;

			@media (--md) {
				display: block;
			}
			ul {
				display: flex;
				gap: 20px;

				a {
					color: var(--grey);
				}
			}
		}

		.mobile-nav {
			background-color: var(--primary);

			position: fixed;
			top: 0;
			left: 0;

			height: calc(100 * var(--svh));
			width: 100%;

			display: flex;
			flex-direction: column;
			justify-content: center;

			@media (--md) {
				display: none;
			}

			ul {
				font-weight: 500;
				font-size: 2.5rem;
				display: grid;
				gap: 16px;

				padding: 1.5rem 1rem;
			}
		}

		.hamburger-menu {
			background-color: transparent;

			border: none;
			pointer-events: all;
			position: relative;
			cursor: pointer;
			z-index: 1;
			height: 30px;
			width: 30px;

			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			@media (--md) {
				display: none;
			}

			span {
				display: block;
				background-color: var(--white);
				height: 2px;
				width: 100%;
				border-radius: 0.5rem;
				transition:
					transform 0.3s ease-out,
					opacity 0.3s ease-out;

				&:nth-child(1) {
					transform-origin: center;
				}

				&:nth-child(2) {
					margin-block: 6px;
				}

				&:nth-child(3) {
					transform-origin: center;
				}
			}
		}
	}

	.hamburger-menu span.isOpen:nth-child(1) {
		transform: rotate(45deg) translateX(2px);
	}

	.hamburger-menu span.isOpen:nth-child(2) {
		opacity: 0;
		margin-block: 0px;
	}

	.hamburger-menu span.isOpen:nth-child(3) {
		transform: rotate(-45deg) translateX(2px);
	}
</style>
