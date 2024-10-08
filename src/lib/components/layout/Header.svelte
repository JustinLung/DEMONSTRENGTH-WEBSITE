<script lang="ts">
	import { slide } from 'svelte/transition';
	import { easeInOutExpo } from '$lib/utils/transition';
	import { onDestroy, onMount } from 'svelte';
	import Button from '../shared/Button.svelte';
	import { links } from '$lib/utils/links';

	const showButton = links.length > 0 && links[links.length - 1].title === 'Login';

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

	{#if showButton}
		<Button classes="coaching-button" primary href={links[links.length - 1].href}
			>{links[links.length - 1].title}</Button
		>
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
				{#each links as link}
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

				li:last-child {
					display: none;
				}

				li:first-child {
					display: block;

					@media (--md) {
						display: none;
					}
				}

				a {
					position: relative;
					color: var(--grey);
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

		:global(.coaching-button) {
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
