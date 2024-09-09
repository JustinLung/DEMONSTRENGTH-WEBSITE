<script lang="ts">
	import { links } from '$lib/utils/links';

	const trimmedLinks = links.slice(1, -1);
</script>

<footer>
	<div class="container footer-container">
		<a href="/" class="main-title"> demonstrength. </a>
		<nav>
			{#each trimmedLinks as link}
				<a href={link.href} class="main-links">{link.title}</a>
			{/each}
		</nav>
		<a
			href="https://www.instagram.com/demonstrengthcoaching/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
					stroke="#FAFAFA"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16 11.3698C16.1234 12.2021 15.9812 13.052 15.5937 13.7988C15.2062 14.5456 14.5931 15.1512 13.8416 15.5295C13.0901 15.9077 12.2384 16.0394 11.4077 15.9057C10.5771 15.7721 9.80971 15.3799 9.21479 14.785C8.61987 14.1901 8.22768 13.4227 8.09402 12.592C7.96035 11.7614 8.09202 10.9097 8.47028 10.1582C8.84854 9.40667 9.45414 8.79355 10.2009 8.40605C10.9477 8.01856 11.7977 7.8764 12.63 7.99981C13.4789 8.1257 14.2648 8.52128 14.8716 9.12812C15.4785 9.73496 15.8741 10.5209 16 11.3698Z"
					stroke="#FAFAFA"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M17.5 6.5H17.51"
					stroke="#FAFAFA"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>
	</div>
	<hr />
	<div class="container footer-outer-container">
		<span>
			&copy; {new Date().getFullYear()} &#183; All rights Reserved.
		</span>
		<a href="/terms-and-conditions" class="terms-link">Terms & Conditions</a>
	</div>
</footer>

<style lang="postcss">
	footer {
		background-color: var(--tertiary);
		color: var(--grey);

		.main-links,
		.terms-link {
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

			nav {
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
