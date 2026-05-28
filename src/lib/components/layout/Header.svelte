<script lang="ts">
	import { slide } from 'svelte/transition';
	import { easeInOutExpo } from '$lib/utils/transition';
	import { onDestroy, onMount } from 'svelte';
	import Button from '../shared/Button.svelte';

	type HeaderLink = {
		href: string;
		title: string;
	};

	type HeaderBrand = {
		title: string;
		href: string;
	};

	interface HeaderProps {
		brand?: HeaderBrand;
		cta?: HeaderLink;
	}

	const { brand = { title: 'placeholder.', href: '/' }, cta }: HeaderProps = $props();

	const mainLinks: HeaderLink[] = [
		{ href: '/#highlights', title: 'Highlight' },
		{ href: '/about', title: 'About' },
		{ href: '/#reviews', title: 'Reviews' }
	];
	const mobileLinks = $derived(cta ? [...mainLinks, cta] : mainLinks);
	const showButton = $derived(Boolean(cta));

	let isOpen = $state(false);

	let mediaQuery: MediaQueryList;

	function openMenu() {
		isOpen = !isOpen;
	}

	function handleResize() {
		if (mediaQuery?.matches) {
			isOpen = false;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			mediaQuery = window.matchMedia('(min-width: 48em)');
			mediaQuery.addEventListener('change', handleResize);

			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (mediaQuery) {
			mediaQuery.removeEventListener('change', handleResize);
		}
	});
</script>

<header class="container">
	<a href={brand.href} class="main-title">{brand.title}</a>
	<nav class="desktop-nav">
		<ul>
			{#each mainLinks as link}
				<li>
					<a href={link.href}>{link.title}</a>
				</li>
			{/each}
		</ul>
	</nav>

	{#if showButton}
		<Button classes="cta-button" primary href={cta?.href}>{cta?.title}</Button>
	{/if}

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
				{#each mobileLinks as link}
					<li>
						<a
							href={link.href}
							onclick={() => {
								isOpen = false;
							}}>{link.title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>

<style lang="postcss">
	header {
		position: fixed;
		z-index: 11;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.main-title {
			position: relative;
			font-weight: 500;
			font-size: 1.5rem;
			z-index: 11;
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
					position: relative;
					color: var(--white);
					text-decoration: none;
					transition: color 0.3s var(--easeOutExpo);

					&::after {
						content: '';
						position: absolute;
						left: 0;
						bottom: -2px;
						width: 100%;
						height: 2px;
						background-color: var(--primary);
						transform: scaleX(0);
						transform-origin: bottom right;
						transition: transform 0.3s ease;
					}

					&:hover::after {
						transform: scaleX(1);
						transform-origin: bottom left;
					}

					&:hover {
						color: var(--white);
					}
				}
			}
		}

		:global(.cta-button) {
			display: none;
			text-align: center;

			@media (--md) {
				display: block;
			}
		}

		.mobile-nav {
			background-color: var(--primary);

			position: fixed;
			top: 0;
			left: 0;
			z-index: 9;

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

				a {
					position: relative;
					color: var(--white);
					text-decoration: none;
					transition: color 0.3s var(--easeOutExpo);

					&::after {
						content: '';
						position: absolute;
						left: 0;
						bottom: -2px;
						width: 100%;
						height: 2px;
						background-color: var(--white);
						transform: scaleX(0);
						transform-origin: bottom right;
						transition: transform 0.3s ease;
					}

					&:hover::after {
						transform: scaleX(1);
						transform-origin: bottom left;
					}

					&:hover {
						color: var(--white);
					}
				}
			}
		}

		.hamburger-menu {
			background-color: transparent;

			border: none;
			pointer-events: all;
			position: relative;
			cursor: pointer;
			z-index: 11;
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
