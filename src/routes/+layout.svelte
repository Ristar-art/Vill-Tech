<script>
    import Header from "./Header.svelte";
    import "../app.css";
    import Carousel from './Carousel.svelte'
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
                <h3 class="text-xl  font-bold text-vtRed mx-2">Follow Us</h3>
                <div class="flex flex-row">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/instagram.svg" class="w-6 h-6" />
                  </a>
                  
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/facebook.svg" class="w-6 h-6" />
                  </a>
              
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/linkedin.svg" class="w-6 h-6" />
                  </a>
              
                  <!-- <a
                    href="https://twitter.com"
                    target="_blank"
                    class="text-black hover:text-vtRed m-2"
                  >
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24h-6.64l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H7.96l4.713 6.231 5.532-6.231zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77z"/>
                    </svg>
                          </a> -->
                </div>
              </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">Quick Links</h3>
                <ul>
                    <li>
                        <a href="/our-accreditations" class="hover:text-vtRed"
                            >Accreditations</a
                        >
                    </li>
                    <li>
                        <a href="/Courses/all-courses" class="hover:text-vtRed">Courses</a>
                    </li>
                    <li>
                        <a href="/fqas" class="hover:text-vtRed"
                            >FAQ’s</a
                        >
                    </li>
                    <li>
                        <a
                            href="/payment-methods"
                            class="hover:text-vtRed">Payment Terms & Methods</a
                        >
                    </li>
                    <!-- <li>
                        <a
                            href="#"
                            class="hover:text-vtRed">Payment Terms</a
                        >
                    </li> -->
                    <!-- <li>
                        <a href="#" class="hover:text-vtRed"
                            >Prospectus</a
                        >
                    </li> -->
                </ul>
            </div>

            <!-- Talk to Us -->
            <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">Talk to Us</h3>
                <p>Village Tech Training Solutions
                    85 Main St, Groundfloor, Johannesburg, 2107</p>
                <!-- <p>WhatsApp: [Number]</p> -->
                <p>Tel: 087 135 1313</p>
                <p>
                    Email: <a
                        href="mailto:info@villagetech.co.za"
                        class="hover:text-vtRed">info@villagetech.co.za</a
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
        </div>

        <div class="mt-8 text-center">
            <p>
                Policies: <a href="#" class="hover:text-vtRed"
                    >Privacy Policy</a
                >
                |
                <a href="#" class="hover:text-vtRed">Terms & Conditions</a>
                
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
</style>
