<script lang="ts">
	import Button from './Button.svelte';

	interface CTAProps {
		title?: string;
		highlight?: string;
		description?: string;
		buttonText?: string;
		buttonHref?: string;
	}

	const {
		title = 'Klaar om',
		highlight = 'te starten?',
		description = 'Boek een gratis 1-op-1 call. We bespreken je doelen en kijken of we bij je passen. Geen verplichtingen.',
		buttonText = 'Boek je gratis call',
		buttonHref = '#'
	}: CTAProps = $props();
</script>

<section class="cta-section container" aria-labelledby="cta-title" id="contact">
	<div class="cta-card">
		<div class="cta-glow" aria-hidden="true"></div>
		<div class="cta-content">
			<h2 id="cta-title">
				{title} <span>{highlight}</span>
			</h2>
			<p>{description}</p>
			<Button href={buttonHref} primary classes="cta-button">{buttonText}</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	.cta-card {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 450px;
		max-width: 992px;
		margin-inline: auto;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 0.12);
		border-radius: 12px;
		background:
			linear-gradient(180deg, rgb(255 255 255 / 0.025), rgb(255 255 255 / 0.005)),
			#080808;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.06),
			0 24px 80px rgb(0 0 0 / 0.28);
	}

	.cta-card::before,
	.cta-card::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.14), transparent);
	}

	.cta-card::before {
		top: 52px;
	}

	.cta-card::after {
		bottom: 52px;
	}

	.cta-glow {
		position: absolute;
		left: 50%;
		bottom: -45%;
		width: min(560px, 90%);
		height: 220px;
		background: radial-gradient(circle, rgb(75 0 130 / 0.58), rgb(75 0 130 / 0.18) 42%, transparent 72%);
		filter: blur(20px);
		transform: translateX(-50%);
	}

	.cta-content {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		max-width: 480px;
		padding: 32px 20px;
		text-align: center;
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.04em;
	}

	h2 span {
		color: transparent;
		background: linear-gradient(90deg, var(--primary), #7f00ff);
		background-clip: text;
	}

	p {
		max-width: 410px;
		margin-top: 18px;
		color: var(--grey);
		font-size: 0.95rem;
		line-height: 1.35;
	}

	:global(.cta-button) {
		margin-top: 20px;
		min-width: auto;
		min-height: 36px;
		padding: 8px 18px;
		font-size: 1rem;
		box-shadow: 0 0 28px rgb(75 0 130 / 0.45);
	}

	@media (max-width: 47.999em) {
		.cta-card {
			min-height: 300px;
		}
	}
</style>
