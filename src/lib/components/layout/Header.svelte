<script lang="ts">
  import { easeOutExpo } from "$lib/utils/transitions";
  import { slide } from "svelte/transition";

  let openMenu = false;

  export const links = [
    { title: "Programs", href: "/" },
    { title: "Over ons", href: "/about" },
    { title: "Gallerij", href: "/coaching" },
  ];
</script>

<header class="flex items-center justify-between container mx-auto p-[16px]">
  <a href="/" class="text-[1.5rem] font-bold relative z-10">demonstrength.</a>

  <nav class="hidden md:block text-[1rem]">
    <ul class="flex gap-4 justify-center text-[#9C9C9C]">
      {#each links as link}
        <li>
          <a href={link.href} class="hover:underline block">{link.title}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <a
    href="/"
    class="hidden md:block bg-[#642869] px-[16px] py-[10px] rounded-full"
    >Start Coaching</a
  >

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
    class="md:hidden p-4 fixed h-screen bg-[#642869] w-full top-0"
    transition:slide={{ duration: 800, easing: easeOutExpo }}
  >
    <ul class="flex flex-col justify-center w-full h-screen gap-4">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-[2.5rem]"
            on:click={() => {
              openMenu = false;
            }}
          >
            {link.title}
          </a>
        </li>
      {/each}
      <li>
        <a href="/" class="md:hidden block text-[2.5rem]">Start Coaching</a>
      </li>
    </ul>
  </nav>
{/if}
