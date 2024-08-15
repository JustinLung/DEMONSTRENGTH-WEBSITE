<script lang="ts">
  export let review: string;
  export let client: string;
</script>

<!-- TODO: Add Cites -->
<blockquote cite="" class="rounded-md snap-start shrink-0 w-80 md:w-[40vw] bg-purple-800 p-4">
  <p>{review}</p>
  <h3 class="mt-4 font-bold">{client}</h3>
</blockquote>
