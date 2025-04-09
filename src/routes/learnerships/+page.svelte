<script>
    import { fly } from "svelte/transition";

    let cards = [
        {
            title: "Technology",
            content: {
                1: "National Certificate: End User Computing: IT: End User Computing SAQA ID 61591: NQF 3",
                2: "Further Education and Training Certificate: IT: Technical Support SAQA ID 78964: NQF 4",
                3: "National Certificate: IT: Systems Development SAQA ID: 48872 NQF 5",
                4: "National Certificate: IT: Systems Support SAQA ID 48573 NQF 5",
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>` ,
            image:'/VT7.webp'
        },
        {
            title: "New Venture Creation",
            content: {
                1: "National Certificate: New Venture Creation NQF 2 SAQA ID 49648 NQF 2 140 credits",
                2: "Further Education and Training Certificate: New Venture Creation SAQA ID 66249 NQF Level 4 149",
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>`,
            image:'/VT9.webp'
        },
    ];

    const Benefits = [
        {
            title: "B-BBEE Compliance & Optimization",
            text: "Achieve B-BBEE Compliance and improved B-BBEE rating.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>` // Icon: Check Circle (compliance/achievement)
        },
        {
            title: "Tax Benefits Section 12H & ETI",
            text: "Earn Significant Tax Rebates for each learner registration and successful completion.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>` // Icon: Currency Dollar (tax benefits)
        },
        {
            title: "Grants",
            text: "Claim back Mandatory and Discretionary Grants from your Skills Development Levy.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>` // Icon: Cash (grants/money)
        },
        {
            title: "Future Workforce Development",
            text: "You’ll have a greater pool of trained, knowledgeable, well-experienced employees and potential employees with critical skills to draw from for future human capital requirements.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M12 4a4 4 0 100 8 4 4 0 000-8zm0 0v2" />
            </svg>` // Icon: Users (workforce/people)
        },
        {
            title: "Talent Retention & Employee Growth",
            text: "Investment in skills development leads to employee motivation, professional development, retention and tangible succession planning.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>` // Icon: Trending Down flipped to up (growth/retention)
        },
        {
            title: "Social Responsibility",
            text: "Potential higher-impact for Social Responsibility (CSI) through youth empowerment, skills development and employment opportunities.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>` // Icon: Heart (social responsibility/community)
        },
    ];

    const Methodology = [
        {
            title: "Classroom Training",
            text: "Live face-to-face training with an instructor. Sessions include in-person interaction and networking opportunities with other delegates.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4-10h1" />
            </svg>` // Icon: Academic Cap (classroom/education)
        },
        {
            title: "Blended/Virtual Training",
            text: "Live virtual sessions with complete flexibility. A cost-effective learning methodology which delegates can access from anywhere on any platform or device.",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>` // Icon: Light Bulb (virtual/innovation)
        },
    ];
</script>

<svelte:head>
    <title>Learnerships</title>
    <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>
<div class="min-h-screen py-16 bg-[#21409A]">

<div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('Leanerships.webp');"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-black-50 opacity-90"></div>
    <div class="relative z-10 max-w-2xl px-6">
        <h1 class="text-4xl font-bold">Learnerships</h1>
        <p class="text-xl mt-5">
            Village Tech offers fully accredited learnerships that are diverse and can be customized and applied across many different industries. Some of which include IT, Sales & Marketing, Financial Services, and etc.
        </p>
    </div>
</div>

<section class="bg-[#21409a] w-full min-h-[50vh] py-16 flex justify-center">
    <div class="flex flex-col md:flex-row rounded-xl transition-all duration-300 md:max-w-6xl w-full">
        <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[36rem] p-6">
            <div class="space-y-8">
                <div class="flex flex-col">
                    <p class="text-lg text-gray-200">
                        Our learnerships are structured 12-month programmes, which include interactive theoretical sessions and practical work-based learning that prepares learners for the actual workplace. Successful completion leads to an occupational-related qualification registered on the National Qualification Framework (NQF). On completion, learners who have achieved competence will receive a national qualification and statement of results from the respective SETA.
                    </p>
                    <p class="text-lg text-gray-200 mt-4">
                        Village Tech offers various SETA accredited learnerships in the following fields:
                    </p>
                </div>
            </div>
        </div>
        <div class="w-full md:w-[36rem] transition-all duration-300 rounded-2xl bg-cover bg-center" style="background-image: url('/VT4.webp');"></div>
    </div>
</section>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-8 max-w-6xl mx-auto py-12">
    {#each cards as card, i}
        <div
            in:fly={{ y: 50, duration: 800, delay: i * 200 }}
            class="group relative bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-[400px] flex flex-col"
            style="background-image: url('{card.image}'); background-size: cover;"
        >
            <div class="flex flex-col justify-center items-center h-full bg-blue-900/50 text-white p-6">
                {@html card.icon}
                <h2 class="text-xl font-bold mb-3 text-red-400">{card.title}</h2>
            </div>
            <div class="absolute inset-0 flex flex-col justify-center items-start bg-gradient-to-t from-red-900 to-red-500 text-white p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 overflow-y-auto">
                <h2 class="text-xl font-bold mb-3 text-red-400">{card.title}</h2>
                <ul class="text-sm leading-relaxed space-y-2">
                    {#each Object.values(card.content) as item}
                        <li class="transform translate-y-4 transition-all duration-300 group-hover:translate-y-0">{item}</li>
                    {/each}
                </ul>
            </div>
        </div>
    {/each}
</div>

<section class="bg-[#21409a] min-h-[50vh] py-16 flex justify-center w-full">
    <div class="flex flex-col md:flex-row justify-between rounded-xl transition-all duration-300 md:max-w-6xl">
        <div class="w-full md:w-[34rem] flex flex-end items-end transition-all duration-300 rounded-2xl bg-cover bg-center" style="background-image: url('VT6.webp');"></div>
        <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[34rem]">
            <h2 class="text-start px-6 text-4xl md:text-4xl font-bold text-white mb-6">Benefits of Village Tech’s Learnerships:</h2>
            <div class="space-y-8 px-6">
                {#each Benefits as details}
                    <div class="flex text-white flex-row rounded-lg items-center">
                        <div class="p-4">
                            {@html details.icon}
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold ">{details.title}</h3>
                            <span class="">{details.text}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<section class="bg-[#21409a]  min-h-[50vh] py-16 flex justify-center w-full pb-10">
    <div class="flex flex-col md:flex-row justify-between rounded-xl transition-all duration-300 md:max-w-7xl">
        <div class="rounded-tl-xl rounded-bl-xl w-full md:w-[36rem]">
            <h2 class="text-start px-6 text-4xl md:text-4xl font-bold text-white mb-12">Our Training Methodology</h2>
            <div class="space-y-8 px-6">
                {#each Methodology as details}
                <div class="flex text-white flex-row rounded-lg items-center">
                    <div class="p-4">
                        {@html details.icon}
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold ">{details.title}</h3>
                        <span class="">{details.text}</span>
                    </div>
                </div>
                {/each}
            </div>
        </div>
        <div class="w-full md:w-[36rem] flex flex-end items-end transition-all duration-300 rounded-2xl bg-cover bg-center" style="background-image: url('/VT8.webp');"></div>
    </div>
</section>

<section class="text-center text-white bg-[#21409a] flex justify-center p-8">
    <div class="w-full md:max-w-5xl">
        <h2 class="text-center text-4xl md:text-4xl font-bold mb-12">Operational Details</h2>
        <p>
            Please complete the form to enquire about our learnerships or contact us on (087) 135 1313. 
        </p>
    </div>
</section>
</div>