<script lang="ts">
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		// @ts-ignore View transitions are too new
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore View transitions are too new
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>
