<script>
  import Header from "./Header.svelte";
  import "../app.css";
  import Carousel from "./Carousel.svelte";
</script>

<div class="app">
  <Header />

  <main class="">
    <slot />
  </main>
  <Carousel speed={20} direction="left" />

  <footer class="bg-[#21409A] text-white p-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Social Media -->
      <div>
        <!-- <h3 class="text-xl font-bold text-vtRed mx-2">Follow Us</h3> -->
       
        <button
          href="/Village Tech ~ Course Prospectus.pdf"
          class="filter-btn mt-2"
          download
          on:click={() => {
            // Handle download action
            const link = document.createElement("a");
            link.href = "/Village Tech ~ Course Prospectus.pdf";
            link.download = "Village Tech Course Prospectus.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download Prospectus
        </button>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-xl font-bold text-vtRed mb-4">Quick Links</h3>
        <ul>
          <li>
            <a
              href="/explore-village-tech/our-accreditations"
              class="hover:text-vtRed">Accreditations</a
            >
          </li>
          <li>
            <a href="/courses/all-courses" class="hover:text-vtRed">Courses</a>
          </li>
          <li>
            <a href="/explore-village-tech/faqs" class="hover:text-vtRed"
              >FAQ’s</a
            >
          </li>
          <li>
            <a href="/payment-methods" class="hover:text-vtRed"
              >Payment Terms & Methods</a
            >
          </li>
        </ul>
      </div>

      <!-- Talk to Us -->
      <div>
        <h3 class="text-xl font-bold text-vtRed mb-4">Talk to Us</h3>
        <p>
          Village Tech Training Solutions 85 Main St, Groundfloor, Johannesburg,
          2107
        </p>
        <!-- <p>WhatsApp: [Number]</p> -->
        <p>Tel: 087 135 1313</p>
        <p>
          Email: <a href="mailto:info@villagetech.co.za" class=""
            >info@villagetech.co.za</a
          >
        </p>
      </div>

      <!-- Enabling Partners -->
      <!-- <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">
                    Our Enabling Partners
                </h3>
                <div class="flex flex-wrap gap-4">
                    <div
                        class="flex flex-col items-center justify-start space-x-4 mt-4"
                    >
                        <a href="https://seta.org" alt="seta"
                            ><img
                                src="/MICT-SETA-logo.webp"
                                alt="SETA"
                                class=" h-5"
                            /></a
                        >
                        <p>seta</p>
                    </div>
                    <div
                        class="flex flex-col items-center justify-start space-x-4 mt-4"
                    >
                        <a href="https://comptia.org" alt="comptia"
                            >
                            <img
                                src="/comptia-logo-large_png.webp"
                                alt="CompTIA"
                                class=" h-5"
                            />
                            </a
                        >
                        <p>CompTIA</p>
                    </div>

                    <div
                        class="flex flex-col items-center justify-start space-x-4 mt-4"
                    >
                        <a href="https://qcto.org.za" alt="qcto"
                            ><img
                                src="/QCTO-logo2.webp"
                                alt="QCTO"
                                class=" h-5"
                            /></a
                        >
                        <p>QCTO</p>
                    </div>
                </div>
            </div> -->
            <div>
                <h3 class="text-xl font-bold text-vtRed mx-2">Follow Us</h3>
                <div class="flex flex-row pb-8">
                  <a
                    href="https://www.instagram.com/villagetech_za/"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/instagram.svg"
                      class="w-6 h-6"
                      alt="Instagram"
                      style="filter: invert(100%)"
                    />
                  </a>
        
                  <a
                    href="https://www.facebook.com/villagetech.za/"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/facebook.svg"
                      class="w-6 h-6"
                      alt="Facebook"
                      style="filter: invert(100%)"
                    />
                  </a>
        
                  <a
                    href="https://www.linkedin.com/company/village-tech-za/"
                    target="_blank"
                    class="text-white hover:text-vtRed m-2"
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/linkedin.svg"
                      class="w-6 h-6"
                      alt="LinkedIn"
                      style="filter: invert(100%)"
                    />
                  </a>
                </div>
                <!-- <button
                  href="/Village Tech ~ Course Prospectus.pdf"
                  class="filter-btn"
                  download
                  on:click={() => {
                    // Handle download action
                    const link = document.createElement("a");
                    link.href = "/Village Tech ~ Course Prospectus.pdf";
                    link.download = "Village Tech Course Prospectus.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Prospectus
                </button> -->
              </div>
        </div>

    <div class="mt-8 text-center">
      <p>
        <a href="/explore-village-tech/privacy-policy" class="hover:text-vtRed"
          >Privacy Policy</a
        >
        |
        <a
          href="/explore-village-tech/terms-and-conditions"
          class="hover:text-vtRed">Terms & Conditions</a
        >
      </p>
    </div>
  </footer>
</div>

<style>
  @font-face {
    font-family: "Barlow Semi Condensed";
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url("$lib/font/barlow-semi-condensed-latin-400-normal.ttf");
  }
  main {
    font-family: "Barlow Semi Condensed", sans-serif;
  }
  Header {
    font-family: "Barlow Semi Condensed", sans-serif;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    font-family: "Barlow Semi Condensed", sans-serif;
  }

  footer a {
    font-weight: bold;
  }
  a:hover svg {
    fill: currentColor;
  }
  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
  .filter-btn {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 2px solid transparent;
    border-radius: 9999px;
    background: red;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter-btn:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }

  .filter-active {
    background: #f3f4f6;
    color: #ffffff;
    box-shadow: 0px 6px 12px rgba(7, 40, 64, 0.5); /* Match bg color */
  }

  .filter-active:hover {
    transform: scale(1.1);
  }
</style>
