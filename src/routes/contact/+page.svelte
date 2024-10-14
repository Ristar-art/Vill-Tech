<script>
    import { onMount } from "svelte";
  
    let formSubmitted = false;
  
    onMount(() => {
        const form = document.getElementById("contactForm");
        if (form) {
            form.addEventListener("submit", handleSubmit);
        } else {
            console.error("Contact form not found");
        }
    });
  
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submission started");
        const form = e.target;
        const formData = new FormData(form);
  
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });
  
            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);
  
            const text = await response.text();
            console.log("Response body:", text);
  
            const data = JSON.parse(text);
            console.log("Parsed data:", data);
  
            alert("Form submitted successfully!");
            form.reset();
            formSubmitted = true;
        } catch (error) {
            console.error("Fetch error:", error);
            alert(`There was a problem submitting your form: ${error.message}`);
        }
    }
  </script> 
  
  <svelte:head>
        
    />
    <meta name="author" content="" />
    <meta property="og:title" content="Contact" />
    <meta
        property="og:description"
        content="Reach out to our team for any inquiries or assistance you need. We are always ready to help you plan your perfect trip."
    />
    <meta property="og:image" content="favicon.png" />
    <meta
     
    />
    <!-- <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact Us - We're Here to Help" />
  <meta name="twitter:description" content="Have questions or need help? Contact our team, and we'll get back to you as soon as possible." />
  <meta name="twitter:image" content="/path/to/your-image.jpg" /> -->
  </svelte:head>
  
  <body class="bg-white overflow-x-hidden">
    <div
        class="container mx-auto py-16 px-4 bg-white shadow-lg rounded-lg p-8 mb-4"
    >
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6905166364404!2d28.037884175415257!3d-26.206743977075003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ea242cbb1e3%3A0xea12498442f6848e!2sVillage%20Tech%20Training%20Solutions!5e0!3m2!1sen!2sza!4v1728895771996!5m2!1sen!2sza" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            width="100%"
            height="400"
            style="border:0; border-radius: 10px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
    </div>
    <div class="container mx-auto py-16 px-4 bg-white">
        <div class="flex flex-col lg:flex-row justify-between">
            <!-- Contact Information Section -->
            <div
                class="w-full lg:w-1/2 mb-8 lg:mb-0 bg-white shadow-lg rounded-lg p-8 m-2"
            >
                <h2 class="text-3xl font-bold mb-4">
                    <span style="color: #2e3883;">Get in touch</span>
                </h2>
                <div class="mb-6">
                    <p class="text-lg font-semibold mb-1 flex items-center">
                        <img
                            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/telephone-fill.svg"
                            alt="Phone"
                            class="w-5 h-5 mr-2"
                        />
                        <span style="color: green;">Phone</span>
                    </p>
                    <p class="text-gray-600">
  
                        087 135 1313
                    </p>
                   
                </div>
                <div class="mb-6">
                    <p class="text-lg font-semibold mb-1 flex items-center">
                        <img
                            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/envelope-fill.svg"
                            alt="Email"
                            class="w-5 h-5 mr-2"
                        />
                        <span style="color: #277a4c;">Email</span>
                    </p>
                    <p class="text-black">
                      info@villagetech.co.za                  </p>
  
                   
                </div>
                <div class="mb-6">
                    <p class="text-lg font-semibold mb-1 flex items-center">
                        <img
                            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/geo-alt-fill.svg"
                            alt="London Office"
                            class="w-5 h-5 mr-2"
                        />
                        <span style="color: #277a4c;">Location</span>
                    </p>
                    <p class="text-gray-600">
                      85 Main Street Groundfloor<br/> Marshalltown<br/> Johannesburg<br/> 2107
                    </p>
                </div>
            </div>
  
            <!-- Contact Form Section -->
            <div class="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
                <form
                    id="contactForm"
                    action="https://formspree.io/f/xeojqbyn"
                    method="POST"
                >
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-white"
                    >
                        <div class="flex flex-col">
                            <label for="first-name" class="text-gray-700 mb-2"
                                ><span style="color: black;">First name</span
                                ></label
                            >
                            <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                placeholder="Type Name"
                                required
                            />
                        </div>
                        <div class="flex flex-col">
                            <label for="last-name" class="text-gray-700 mb-2"
                                ><span style="color: black;">Last name</span
                                ></label
                            >
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                placeholder="Type Last Name"
                                required
                            />
                        </div>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label for="email" class="text-gray-700 mb-2"
                            ><span style="color: black;">Email</span></label
                        >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="Type Email"
                            required
                        />
                    </div>
                    <div class="flex flex-col mb-4">
                        <label for="phone" class="text-gray-700 mb-2"
                            ><span style="color: black;">Course Interest</span
                            ></label
                        >
                        <input
                                type="text"
                                id="Course Intrest"
                                name="Course Intrest"
                                class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                placeholder="Course Intrest"
                                required
                            />
                    </div>
                    <div class="flex flex-col mb-4">
                      <label for="phone" class="text-gray-700 mb-2"
                          ><span style="color: black;">Registration for</span
                          ></label
                      >
                      <input
                              type="text"
                              id="Registration for"
                              name="Registration for"
                              class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                              placeholder="Registration for"
                              required
                          />
                  </div>
                    <div class="flex flex-col mb-4">
                        <label for="message" class="text-gray-700 mb-2"
                            ><span style="color: black;">Message</span></label
                        >
                        <textarea
                            id="message"
                            name="message"
                            class="border border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="Type Message"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-[#2e3883] text-white rounded-lg py-2"
                        ><span style="color: white;">Send</span></button
                    >
                </form>
            </div>
        </div>
    </div>
  
    <!-- Map Section -->
  </body>
  