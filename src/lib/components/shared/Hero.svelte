<script lang="ts">
    export let title: string;
    export let description: string;
    export let src: string;
    export let alt: string;
  </script>
  
  <section class="relative w-full h-[60svh] md:h-[80svh] -z-10">
    <img src={src} alt={alt} class="object-cover w-full h-full object-center" />
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 px-4">
      <h1 class="text-4xl md:text-6xl font-bold">{title}</h1>
      <p class="mt-4 text-lg md:text-2xl">{description}</p>
    </div>
  </section>
  