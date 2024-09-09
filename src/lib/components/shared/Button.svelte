<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		classes?: string;
		href?: string;
		children: Snippet;
		primary?: boolean;
	}
	const { classes, href, primary = false, children, ...rest }: ButtonProps = $props();

	const component = href ? 'a' : 'button';
</script>

<svelte:element
	this={component}
	class="button {classes} {primary ? 'primary' : 'secondary'}"
	rel={href?.includes('http') ? 'noopener noreferrer' : undefined}
	target={href?.includes('http') ? '_blank' : undefined}
	{href}
	{...rest}
>
	{@render children()}
</svelte:element>

<style lang="postcss">
	.button {
		font-size: 0.875rem;
		font-weight: 500;

		border: none;
		cursor: pointer;

		padding: 10px 16px;
		border-radius: 2rem;
		min-width: 130px;
		min-height: 40px;

		@media (--md) {
			font-size: 1rem;
		}
	}

	.primary {
		color: var(--white);
		background-color: var(--primary);
		border: 2px solid var(--primary);
		transition: 0.3s background-color var(--easeOutExpo);

		&:hover {
			border: 2px solid var(--primary);
			background-color: var(--transparent);
		}
	}

	.secondary {
		background-color: transparent;
		color: var(--white);
		border: 2px solid var(--white);
		transition: 0.3s background-color var(--easeOutExpo);

		&:hover {
			color: var(--black);
			background-color: var(--white);
		}
	}
</style>
