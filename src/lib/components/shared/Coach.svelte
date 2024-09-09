<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface CoachInterface {
		title: string;
		description: string;
		src: string;
		alt: string;
		instagram: string;
		tiktok: string;
		classes?: string;
	}
	const { title, description, src, alt, instagram, tiktok, classes }: CoachInterface = $props();

	let coachEl: HTMLElement;

	onMount(() => {
		gsap.to(coachEl, {
			opacity: 1,
			y: 0,
			duration: 0.3,
			ease: 'expo.out',
			scrollTrigger: {
				trigger: coachEl,
				start: 'top 50%',
				end: 'bottom',
				toggleActions: 'play none none none'
			}
		});
	});
</script>

<article class="coach {classes}" bind:this={coachEl}>
	<img {src} {alt} draggable="false" />
	<div class="content-container">
		<h3>{title}</h3>
		<p>{description}</p>
		<div class="social-container">
			<span>Socials:</span>
			<a href={instagram} target="_blank" rel="noopener noreferrer">
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
			<a href={tiktok} target="_blank" rel="noopener noreferrer">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"
					/>
				</svg>
			</a>
		</div>
	</div>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		max-height: 1120px;
		background-color: var(--tertiary);
		padding: 1.5rem 1rem;
		border-radius: 12px;
		opacity: 0;
		transform: translateY(30px);

		@media (--md) {
			flex-direction: row;
		}

		img {
			border-radius: 16px;
			width: 100%;
			object-fit: cover;

			@media (--md) {
				width: 450px;
				height: 400px;
			}
		}

		.content-container {
			display: grid;
			place-content: center;
			max-width: 900px;
			padding: 1rem;

			@media (--md) {
				padding: 1.5rem 3rem;
			}

			h3 {
				font-size: 1.25rem;
				font-weight: 500;

				@media (--md) {
					font-size: 1.5rem;
				}

				@media (--lg) {
					font-size: 2rem;
				}
			}

			p {
				margin-top: 12px;
				color: var(--grey);
				font-size: 1rem;

				@media (--lg) {
					font-size: 1.25rem;
				}
			}

			.social-container {
				display: flex;
				align-items: center;
				gap: 8px;
				margin-top: 16px;
			}
		}
	}
</style>
