<script lang="ts">
    export let title: string;
    export let description: string;
    export let src: string;
    export let alt: string;
</script>

<section class="relative">
    <div class="conatiner mx-auto">
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
    <div class="w-full h-[40rem] md:h-[50rem]">
        <img src={src} alt={alt} class="object-cover w-full h-full object-center">    
    </div>
</section>