<script>
    import { fly } from "svelte/transition";

    let cards = [
        {
            title: "Technology",
            content: {
                1: "Skills development facilitation (blended learning)",
                2: "Assessment and moderation services",
                3: "Seta accreditation",
                4: "Learning Materials development",
                5: "WSP completion and submissions",

            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>`,
            image:'/VT5.webp'
        },
        {
            title: "New Venture Creation",
            content: {
                1: "Seta grant applications",
                2: "Learnerships and skills programmes implementation and project management",
                3: "B-BBEE compliance and optimisation – 135% maximum gain on procurement (Level 1)",
                4: "Skills development solutions that are aligned to the newly revised B-BBEE codes",

            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>` ,
            image:'/10.webp'
        },
        {
            title: "Accredited and Certifiable Qualifications t",
            content: {
                1: "Accredited and certifiable qualifications that lead to some form of certification",
                2: "Maximum BEE points gained at low cost due to incentives such as tax rebates(section 12H and ETI)",
                3: "Access to SETA skills development grants and bursaries for your staff",

            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>` ,
            image:'/VT8.webp'
        },
    ];

    const Methodology = [
        {
            title: "ICT skills training",
            text: "Live face-to-face training with an instructor. Sessions include in-person interaction and networking opportunities with other delegates.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>`,
                  
        },
        {
            title: "Learnership Management",
            text: "Live virtual sessions with complete flexibility. A cost-effective learning methodology which delegates can access from anywhere on any platform or device.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>`
        },
        {
            title: "Competency Development",
            text: "Live virtual sessions with complete flexibility. A cost-effective learning methodology which delegates can access from anywhere on any platform or device.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>`
        },
        
    ];
</script>
<svelte:head>
    <title>Services</title>
    <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>
<div class="min-h-screen py-16 bg-[#21409A]">

<div class="relative h-[60vh]  flex flex-col items-center justify-center pt-20 text-center text-white">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/Services.webp');"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-black-50 opacity-90"></div>
    <div class="relative z-10 max-w-2xl px-6">
        <h1 class="text-4xl font-bold">Services</h1>
        <p class="text-xl mt-5">
            Village Tech offers end to end training and skills development services to corporates, clients and the community at large. We specialize in the implementation and project management of small to large scale training interventions with a strong focus on facilitation, assessment moderation and training material development.        </p>
    </div>
</div>
<section class="bg-[#21409a]  w-full min-h-[30vh] py-16 flex justify-center">
    <div class="flex flex-col md:flex-row rounded-xl transition-all duration-300 md:max-w-6xl w-full gap-4">
        <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[36rem]">
            <div class="">
                <div class="flex flex-col">
                    <p class="text-lg text-gray-200">
                        We have partnered with a wide variety of subject matter experts from across many industries to design and develop suitable and quality training interventions that ensure that intended beneficiaries are equipped and empowered to contribute positively to any organisation, the economy and community at large.     
                    </p>
                   
                </div>
            </div>
        </div>
        <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[36rem]">
            <div class="">
                <div class="flex flex-col">
                   
                    <p class="text-lg text-gray-200 ">
                        Our inclusive learning approach and project management principles are professionally implemented and seamlessly structured for conducting on-site, off site or virtual distance learning, adhering to all SAQA, QCTO Occupational Qualifications and ETQA guidelines and qualification stipulations.              
                    </p>
                </div>
            </div>
        </div>
        <!-- <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[36rem]">
            <div class="px-6 pb-2">
                {#each Methodology as details}
                <div class="flex text-white flex-row rounded-lg items-center">
                    <div class="pt-2">
                        {@html details.icon}
                    </div>
                    <div class="pb-2">
                        <h3 class="text-xl font-semibold px-4">{details.title}</h3>
                    </div>
                </div>
                {/each}
            </div>
        </div>   -->
      </div>
</section>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-8 max-w-6xl mx-auto py-12">
    {#each cards as card, i}
        <div
            in:fly={{ y: 50, duration: 800, delay: i * 200 }}
            class="group relative bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-[400px] flex flex-col"
            style="background-image: url({card.image}); background-size: cover;"
        >
            <div class="flex flex-col justify-center items-center h-full bg-blue-900/50 text-white p-6">
                <!-- {@html card.icon} -->
                <h2 class="text-xl font-bold mb-3 text-red-400">{card.title}</h2>
            </div>
            <div class="absolute inset-0 flex flex-col justify-center items-start bg-gradient-to-t from-red-900 to-red-500 text-white p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 overflow-y-auto">
                <h2 class="text-xl font-bold mb-3 text-white">{card.title}</h2>
                <ul class="text-sm leading-relaxed space-y-2">
                    {#each Object.values(card.content) as item}
                        <li class="transform translate-y-4 transition-all duration-300 group-hover:translate-y-0">{item}</li>
                    {/each}
                </ul>
            </div>
        </div>
    {/each}
</div>
</div>
