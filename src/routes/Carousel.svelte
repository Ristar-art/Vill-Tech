<!-- Carousel.svelte -->
<script>
    export let speed = 20; // Controls animation speed in seconds
    export let direction = 'left'; // 'left' or 'right'
</script>

<section class="mx-auto bg-white -z-10 -mb-1 flex flex-col items-center overflow-hidden">
    <h1 class="text-2xl mb-6 mt-4 text-[#21409a] font-medium">
      Our Enabling Partners
    </h1>
    
    <div class="carousel-container">
      <div class="carousel-track" class:reverse={direction === 'right'} style="--speed: {speed}s">
        <!-- First set of items -->
        <div class="carousel-items">
            <a href = "">
                <img class="h-10" src="/sace_26950_Sace.webp" loading="lazy" alt="Company 1" />

            </a>
            <a href = "https://seta.org">
                <img class="h-12" src="/MICT-SETA-logo.webp" loading="lazy" alt="Company 2" />

            </a>
            <a href = "">
                <img class="h-10" src="/logoNetAcad-TwoColor.webp" loading="lazy" alt="Company 4" />

            </a>
            <a href = "https://comptia.org">
                <img class="h-10" src="/comptia-logo-large_png.webp" loading="lazy" alt="Company 5" />

            </a>
            <a href = "https://qcto.org.za">
                <img class="h-10" src="/QCTO-logo2.webp" loading="lazy" alt="Company 5" />

            </a>
          
        </div>
        <!-- Duplicate set for seamless looping -->
        <div class="carousel-items ml-16">
            <a href = "">
                <img class="h-10" src="/sace_26950_Sace.webp" loading="lazy" alt="Company 1" />

            </a>
            <a href = "https://seta.org">
                <img class="h-12" src="/MICT-SETA-logo.webp" loading="lazy" alt="Company 2" />

            </a>
            <a href = "">
                <img class="h-10" src="/logoNetAcad-TwoColor.webp" loading="lazy" alt="Company 4" />

            </a>
            <a href = "https://comptia.org">
                <img class="h-10" src="/comptia-logo-large_png.webp" loading="lazy" alt="Company 5" />

            </a>
            <a href = "https://qcto.org.za">
                <img class="h-10" src="/QCTO-logo2.webp" loading="lazy" alt="Company 5" />

            </a>
          
        </div>
      </div>
    </div>
</section>

<style>
  .carousel-container {
    width: 100%;
    max-width: 64rem;
    overflow: hidden;
    position: relative;
    padding: 1rem 0;
  }

  .carousel-track {
    display: flex;
    width: fit-content;
    animation: scroll var(--speed) linear infinite;
  }

  .carousel-items {
    display: flex;
    gap: 5rem;
    flex-shrink: 0;
  }

  .carousel-track.reverse {
    animation-direction: reverse;
  }

  img {
    display: block;
    align-self: center;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% / 2));
    }
  }

  @media (max-width: 768px) {
    .carousel-items {
      gap: 2rem;
    }
    img {
      height: 2rem;
    }
  }
</style>