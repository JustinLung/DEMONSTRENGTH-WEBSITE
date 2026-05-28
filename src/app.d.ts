import type Lenis from '@studio-freight/lenis';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		Lenis: Lenis;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
