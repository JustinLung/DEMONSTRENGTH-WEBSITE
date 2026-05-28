<script lang="ts">
	interface ReviewInterface {
		review: string;
		name: string;
		classes?: string;
		onOpen: () => void;
		readMoreLabel?: string;
	}

	const { review, name, classes, onOpen, readMoreLabel = 'Lees meer' }: ReviewInterface = $props();
</script>

<article class={classes}>
	<p>{review}</p>
	<div class="card-footer">
		<span>&mdash; {name}</span>
		<button
			type="button"
			aria-haspopup="dialog"
			aria-label={`Read full testimonial from ${name}`}
			onclick={onOpen}
		>
			{readMoreLabel}
		</button>
	</div>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex: 0 0 min(100%, 305px);
		flex-direction: column;
		justify-content: space-between;
		min-height: 135px;
		padding: 20px;
		background-color: var(--tertiary);
		border-radius: 8px;

		p {
			display: -webkit-box;
			margin-bottom: 20px;
			overflow: hidden;
			font-size: 1rem;
			font-weight: 600;
			line-height: 1.18;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}

		.card-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16px;
		}

		span,
		button {
			font-size: 0.75rem;
			font-weight: 600;
		}

		span {
			color: var(--grey);
		}

		button {
			border: none;
			color: var(--white);
			background: transparent;
			cursor: pointer;
			white-space: nowrap;

			&:hover {
				text-decoration: underline;
				text-underline-offset: 0.18em;
			}

			&:focus-visible {
				outline: 2px solid var(--primary);
				outline-offset: 4px;
				border-radius: 2px;
			}
		}
	}
</style>
