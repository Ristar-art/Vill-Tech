<script>
    import Header from "./Header.svelte";
    import "../app.css";
</script>

<div class="app">
    <Header />

    <main class="">
        <slot />
    </main>

    <footer class="bg-vtBlue p-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Social Media -->
            <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">Follow Us</h3>
                <div class="flex flex-col">

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        class="text-black hover:text-vtRed">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/instagram.svg" class="w-6 h-6" />

                        Instagram
                        
                        </a
                    >
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        class="text-black hover:text-vtRed">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/facebook.svg" class="w-6 h-6" />
                        Facebook
                        </a
                    >

                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        class="text-black hover:text-vtRed">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/linkedin.svg" class="w-6 h-6" />
                        LinkedIn
                        </a
                    >

                    <a
                        href="https://twitter.com"
                        target="_blank"
                        class="text-black hover:text-vtRed">
                        
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/twitter.svg" class="w-6 h-6" />
                        Twitter
                        </a
                    >

                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">Quick Links</h3>
                <ul>
                    <li>
                        <a href="/" class="hover:text-vtRed"
                            >Accreditations</a
                        >
                    </li>
                    <li>
                        <a href="/Courses" class="hover:text-vtRed">Courses</a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-vtRed"
                            >FAQ’s</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-vtRed">Payment Methods</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-vtRed">Payment Terms</a
                        >
                    </li>
                    <li>
                        <a href="#" class="hover:text-vtRed"
                            >Prospectus</a
                        >
                    </li>
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
            <div>
                <h3 class="text-xl font-bold text-vtRed mb-4">
                    Our Enabling Partners
                </h3>
                <div class="flex flex-wrap gap-4">
                    <div
                        class="flex flex-col items-center justify-start space-x-4 mt-4"
                    >
                        <a href="https://seta.org" alt="seta"
                            ><img
                                src="https://picsum.photos/80/80?random=10"
                                alt="SETA"
                                class="rounded-full"
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
                                src="https://picsum.photos/80/80?random=11"
                                alt="CompTIA"
                                class="rounded-full"
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
                                src="https://picsum.photos/80/80?random=12"
                                alt="QCTO"
                                class="rounded-full"
                            /></a
                        >
                        <p>QCTO</p>
                    </div>
                    <!-- Add more icons as needed -->
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <p>
                Policies: <a href="#" class="hover:text-vtRed"
                    >Privacy Policy</a
                >
                |
                <a href="#" class="hover:text-vtRed">Terms & Conditions</a>
                |
                <a href="#" class="hover:text-vtRed"
                    >Payment Terms</a
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

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
