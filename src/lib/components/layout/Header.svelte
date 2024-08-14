<script lang="ts">
  import { easeOutExpo } from "$lib/utils/transitions";
  import { slide } from "svelte/transition";

  let openMenu = false;

  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Coaching", href: "/coaching" },
    { title: "Contact", href: "/contact" },
  ];
</script>

<header class="flex items-center justify-between container mx-auto p-4">
  <h1 class="text-xl font-bold relative z-10">DEMONSTRENGTH</h1>

  <nav class="hidden md:block">
    <ul class="flex gap-4">
      {#each links as link}
        <li>
          <a href={link.href} class="hover:underline">{link.title}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <button
    class="block md:hidden relative z-10"
    on:click={() => {
      openMenu = !openMenu;
    }}
  >
    {#if openMenu}
      CLOSE
    {:else}
      MENU
    {/if}
  </button>
</header>

{#if openMenu}
  <nav
    class="md:hidden p-4 fixed h-screen bg-purple-800 w-full top-0"
    transition:slide={{ duration: 800, easing: easeOutExpo }}
  >
    <ul class="flex flex-col justify-center items-center w-full h-screen gap-4">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-[2.5rem] uppercase"
            on:click={() => {
              openMenu = false;
            }}
          >
            {link.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
