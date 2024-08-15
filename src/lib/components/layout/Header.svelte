<script lang="ts">
  import { easeOutExpo } from "$lib/utils/transitions";
  import { slide } from "svelte/transition";

  let openMenu = false;

  export const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Coaching", href: "/coaching" },
    { title: "Contact", href: "/contact" },
  ];
</script>

<header class="flex items-center justify-between container mx-auto p-4">
  <a href="/" class="text-xl font-bold relative z-10">DEMONSTRENGTH</a>

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
    class="flex flex-col justify-center items-center md:hidden relative z-10"
    on:click={() => {
      openMenu = !openMenu;
    }}
  >
    <span
      class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"
      class:rotate-45={openMenu}
      class:translate-y-1={openMenu}
      class:-translate-y-0.5={!openMenu}
    />
    <span
      class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5"
      class:opacity-0={openMenu}
      class:opacity-100={!openMenu}
    />
    <span
      class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"
      class:-rotate-45={openMenu}
      class:-translate-y-1={openMenu}
      class:translate-y-0.5={!openMenu}
    />
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
