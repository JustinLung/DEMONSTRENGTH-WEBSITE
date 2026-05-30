<script lang="ts">
	import Instagram from '$lib/components/icons/Instagram.svelte';
	import { mainLinks, type Brand, type Link, type SocialLink } from '$lib/utils/links';



	interface FooterProps {
		brand?: Brand;
		socialLink?: SocialLink;
		copyright?: string;
		legalLink?: Link;
	}

	const {
		brand = { title: 'placeholder.', href: '/' },
		socialLink = { href: '/', label: 'Placeholder social link' },
		copyright = 'All rights Reserved.',
		legalLink = { href: '/terms-and-conditions', title: 'Terms & Conditions' }
	}: FooterProps = $props();


</script>

<footer>
	<div class="container footer-container">
		<a href={brand.href} class="main-title"> {brand.title} </a>
		<nav>
			<ul>
				{#each mainLinks as link}
					<li>
						<a href={link.href} class="main-links">{link.title}</a>
					</li>
				{/each}
			</ul>
		</nav>
		<a
			href={socialLink.href}
			aria-label={socialLink.label}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Instagram />
		</a>
	</div>
	<hr />
	<div class="container footer-outer-container">
		<span>
			&copy; {new Date().getFullYear()} &#183; {copyright}
		</span>
		<a href={legalLink.href} class="terms-link">{legalLink.title}</a>
	</div>
</footer>

<style lang="postcss">
	footer {
		background-color: var(--black);
		color: var(--white);

		.main-links,
		.terms-link {
			position: relative;
			color: var(--white);
			text-decoration: none;
			transition: color 0.3s var(--easeOutExpo);
			width: fit-content;

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

		.footer-container {
			display: flex;
			flex-direction: column;
			@media (--md) {
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
			}

			.main-title {
				color: var(--white);
				font-weight: 500;
				font-size: 1.5rem;
			}

			nav ul {
				display: flex;
				flex-direction: column;
				margin-block: 16px;
				gap: 16px;

				@media (--md) {
					align-items: center;
					justify-content: space-between;
					flex-direction: row;
					gap: 50px;
				}
			}
		}

		hr {
			width: 100%;
			height: 2px;
		}

		.footer-outer-container {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
