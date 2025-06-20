<script >
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
  
    let isOpen = false;
    let messages = [
      {
        id: 1,
        text: "Hello! I'm your Village Tech AI Assistant. How can I help you explore our ICT training programs today?",
        sender: "bot",
        timestamp: new Date()
      }
    ];
    let inputText = "";
    let messagesContainer;
    let isLoading = false;
  
    // Village Tech Knowledge Base (for reference, not used directly in responses)
    // This object is not actively used by the getAIResponse function below,
    // as the responses are hardcoded. It's kept here for context.
    const villageTechInfo = {
      company: {
        name: "Village Tech Training Solutions",
        address: "85 Main St, Groundfloor, Johannesburg, 2107",
        phone: "087 135 1313",
        email: "info@villagetech.co.za",
        website: "villagetech.co.za",
        socialMedia: {
          instagram: "https://www.instagram.com/villagetech_za/",
          facebook: "https://www.facebook.com/villagetech.za/",
          linkedin: "https://www.linkedin.com/company/village-tech-za/"
        }
      },
      services: {
        main: [
          "ICT Skills Training",
          "Learnership Management", 
          "Competency Development",
          "Skills Development"
        ],
        delivery: [
          "On-Site Training",
          "Virtual Distance Learning",
          "Off-Site Training"
        ],
        specialization: "Individual & Corporate Training"
      },
      accreditations: [
        "SAQA (South African Qualifications Authority)",
        "QCTO (Quality Council for Trades and Occupations)", 
        "ETQA (Education and Training Quality Assurer)",
        "MICT-SETA accredited"
      ],
      benefits: [
        "Learn at your own pace",
        "Access to expert instructors", 
        "Diverse range of courses",
        "Interactive learning experience",
        "Certificates upon completion",
        "Lifetime access to course materials"
    ],
      stats: {
        students: "1000+",
        courses: "22",
        graduates: "1000+", 
        successRate: "99%"
      }
    };
  
    function toggleChat() {
      isOpen = !isOpen;
    }
  
    async function sendMessage() {
      if (!inputText.trim()) return;
  
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputText,
        sender: "user",
        timestamp: new Date()
      };
      messages = [...messages, userMessage];
  
      // Clear input and show loader
      const messageToSend = inputText;
      inputText = "";
      isLoading = true;
      scrollToBottom();
  
      try {
        // Get AI response from the client-side rule-based system
        const botResponse = await getAIResponse(messageToSend);
        
        // Add bot response
        messages = [...messages, {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date()
        }];
      } catch (error) {
        console.error('Chatbot Error:', error.message);
        // Fallback error message if something unexpected goes wrong in client-side logic
        messages = [...messages, {
          id: Date.now() + 1,
          text: "Oops, something went wrong with my internal logic. Please try again or contact us directly at info@villagetech.co.za.",
          sender: "bot",
          timestamp: new Date()
        }];
      } finally {
        isLoading = false;
        scrollToBottom();
      }
    }
  
    // Client-side rule-based response system - NO API CALLS
    async function getAIResponse(userMessage) {
      // Simulate API delay for a more natural feel
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const message = userMessage.toLowerCase();
      
      // Keyword-based responses
      const responses = {
        greeting: [
          "Hello! Welcome to Village Tech Training Solutions! I'm here to help you learn about our ICT training programs. What would you like to know?",
          "Hi there! Great to meet you! I can tell you all about Village Tech's courses, accreditations, and how we can help advance your ICT skills.",
          "Welcome! I'm excited to help you explore our training opportunities. What specific area interests you most?"
        ],
        
        courses: [
          "Village Tech offers 22+ comprehensive ICT courses! We specialize in skills training, learnership management, and competency development. Our programs are SAQA, QCTO, and MICT-SETA accredited. Would you like to know about specific courses or our delivery methods?",
          "We have an amazing range of ICT training programs designed for both individuals and corporations! With on-site, virtual, and off-site delivery options, we make learning flexible. For detailed course information, I'd recommend visiting villagetech.co.za/courses or calling 087 135 1313.",
          "Our 22+ courses cover everything from basic ICT skills to advanced competency development. We're proud to be accredited by SAQA, QCTO, and MICT-SETA, ensuring top-quality education that employers recognize!"
        ],
        
        pricing: [
          "For the most accurate and up-to-date pricing information, I'd recommend contacting our team directly at 087 135 1313 or info@villagetech.co.za. They can provide detailed quotes based on your specific needs and preferred delivery method!",
          "Pricing varies depending on the course and delivery method you choose. Our team can create a customized quote for you! Give us a call at 087 135 1313 or email info@villagetech.co.za for specific pricing details.",
          "I'd love to help with pricing details! Since costs depend on your chosen courses and delivery preferences, our team at 087 135 1313 can provide you with a personalized quote that fits your budget and goals."
        ],
        
        contact: [
          "You can reach Village Tech Training Solutions at:\n📞 **087 135 1313**\n📧 **info@villagetech.co.za**\n📍 85 Main St, Groundfloor, Johannesburg, 2107\n🌐 **villagetech.co.za**\n\nWe're also on social media **@villagetech_za**!",
          "Here's how to get in touch:\n• Phone: **087 135 1313**\n• Email: **info@villagetech.co.za**\n• Address: 85 Main St, Groundfloor, Johannesburg, 2107\n• Website: **villagetech.co.za**\n\nFollow us on Instagram, Facebook, and LinkedIn **@villagetech_za** for updates!",
          "Contact Village Tech:\n**087 135 1313** | **info@villagetech.co.za**\n85 Main St, Groundfloor, Johannesburg, 2107\n**villagetech.co.za**\n\nConnect with us on social media **@villagetech_za** for the latest updates and success stories!"
        ],
        
        accreditation: [
          "Village Tech is fully accredited by **SAQA** (South African Qualifications Authority), **QCTO** (Quality Council for Trades and Occupations), **ETQA** (Education and Training Quality Assurer), and **MICT-SETA**! This means our qualifications are recognized nationwide and meet industry standards.",
          "We're proud to hold accreditations from all the major bodies: **SAQA, QCTO, ETQA, and MICT-SETA**. This ensures that your qualification will be recognized by employers and meets the highest educational standards in South Africa.",
          "Our accreditations include **SAQA, QCTO, ETQA, and MICT-SETA** - that's comprehensive recognition ensuring your training meets national standards and is valued by employers across South Africa!"
        ],
        
        benefits: [
          "With Village Tech, you get to learn at your own pace with expert instructors, enjoy interactive learning experiences, and receive certificates upon completion. Plus, you get lifetime access to course materials! We've trained 1000+ students with a 99% success rate.",
          "Benefits include flexible learning pace, access to expert instructors, diverse course range, interactive experiences, certificates, and lifetime material access. Join our 1000+ graduates who've achieved success in their ICT careers!",
          "We offer flexible scheduling, expert instruction, interactive learning, completion certificates, and lifetime access to materials. With 1000+ successful graduates and a 99% success rate, we're committed to your success!"
        ],
        
        default: [
          "That's a great question! While I can provide general information about Village Tech, for detailed answers I'd recommend contacting our team at **087 135 1313** or **info@villagetech.co.za**. They're the experts and can give you personalized guidance!",
          "I'd love to help you with that! For the most accurate and detailed information, our team at Village Tech would be best to assist you. You can reach them at **087 135 1313** or visit **villagetech.co.za**.",
          "Thanks for asking! While I can share general information about our programs, our knowledgeable team can provide specific details tailored to your needs. Contact us at **info@villagetech.co.za** or **087 135 1313**!"
        ]
      };
      
      // Determine response category
      let category = 'default';
      
      if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
        category = 'greeting';
      } else if (message.includes('course') || message.includes('training') || message.includes('program') || message.includes('learn') || message.includes('study')) {
        category = 'courses';
      } else if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('money') || message.includes('much') || message.includes('affordable')) {
        category = 'pricing';
      } else if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address') || message.includes('reach') || message.includes('call')) {
        category = 'contact';
      } else if (message.includes('accredit') || message.includes('certified') || message.includes('saqa') || message.includes('qcto') || message.includes('seta')) {
        category = 'accreditation';
      } else if (message.includes('benefit') || message.includes('advantage') || message.includes('why') || message.includes('special') || message.includes('what do you offer')) {
        category = 'benefits';
      }
      
      // Return random response from category
      const categoryResponses = responses[category];
      return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }
  
    function scrollToBottom() {
      setTimeout(() => {
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  
    function handleKeyPress(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
  
    onMount(() => {
      scrollToBottom();
    });
</script>
  
<div class="chatbot-container">
  {#if isOpen}
    <div class="chat-window" transition:fly={{ y: 20, duration: 300 }}>
      <div class="chat-header">
        <div class="flex items-center space-x-3">
          <div class="chat-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="chat-title">Village Tech AI Assistant</h3>
            <p class="chat-status">Online • Ready to Help</p>
          </div>
        </div>
        <button on:click={toggleChat} class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
  
      <div class="messages-container" bind:this={messagesContainer}>
        {#each messages as message (message.id)}
          <div class="message {message.sender === 'user' ? 'user-message' : 'bot-message'}" transition:fade={{ duration: 200 }}>
            <div class="message-content">
              <p class="message-text">{message.text}</p>
              <span class="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        {/each}
        {#if isLoading}
          <div class="message bot-message" transition:fade={{ duration: 200 }}>
            <div class="message-content loader-container">
              <div class="loader">
                <svg class="animate-spin" viewBox="0 0 24 24">
                  <circle class="loader-circle" cx="12" cy="12" r="10" />
                </svg>
                <span class="loader-text">Thinking...</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
  
      <div class="quick-actions">
        <button class="quick-action" on:click={() => inputText = "Tell me about your courses"}>📚 Courses</button>
        <button class="quick-action" on:click={() => inputText = "How much are the courses?"}>💰 Pricing</button>
        <button class="quick-action" on:click={() => inputText = "How can I contact you?"}>📞 Contact</button>
      </div>
  
      <div class="chat-input-container">
        <div class="input-wrapper">
          <input
            type="text"
            bind:value={inputText}
            on:keypress={handleKeyPress}
            placeholder="Ask about courses, pricing, or anything else..."
            class="chat-input"
            disabled={isLoading}
          />
          <button on:click={sendMessage} class="send-button" disabled={!inputText.trim() || isLoading}>
            {#if isLoading}
              <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <button on:click={toggleChat} class="chat-toggle-button {isOpen ? 'open' : ''}" aria-label="Toggle chat">
    {#if isOpen}
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    {/if}
  </button>
</div>

<style>
/* Your existing CSS remains unchanged */
.chatbot-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    font-family: "Inter", sans-serif;
}

.chat-window {
    width: 380px;
    height: 540px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: 2px solid #21409A;
}

.chat-header {
    background: #21409A;
    color: white;
    padding: 16px;
    border-radius: 14px 14px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-avatar {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.chat-status {
    font-size: 12px;
    margin: 0;
    opacity: 0.8;
}

.close-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.1);
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    scroll-behavior: smooth;
}

.message {
    margin-bottom: 12px;
    display: flex;
}

.user-message {
    justify-content: flex-end;
}

.bot-message {
    justify-content: flex-start;
}

.message-content {
    max-width: 75%;
    padding: 10px 14px;
    border-radius: 12px;
    position: relative;
}

.user-message .message-content {
    background: #ef4444;
    color: white;
    border-bottom-right-radius: 4px;
}

.bot-message .message-content {
    background: #f3f4f6;
    color: #333;
    border-bottom-left-radius: 4px;
}

.message-text {
    margin: 0 0 4px;
    line-height: 1.5;
    white-space: pre-line;
}

.message-time {
    font-size: 10px;
    opacity: 0.6;
}

.loader-container {
    background: #f3f4f6 !important;
    padding: 10px 14px !important;
    display: flex;
    align-items: center;
    gap: 8px;
}

.loader {
    display: flex;
    align-items: center;
    gap: 6px;
}

.loader-circle {
    fill: none;
    stroke: #21409A;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    r: 10;
    cx: 12;
    cy: 12;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

.loader-text {
    font-size: 12px;
    color: #666;
}

.quick-actions {
    padding: 8px 12px;
    display: flex;
    gap: 6px;
    border-top: 1px solid #e5e7eb;
    overflow-x: auto;
}

.quick-action {
    background: #f3f4f6;
    border: none;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s;
    font-family: "Inter", sans-serif;
}

.quick-action:hover {
    background: #e2e8f0;
}

.chat-input-container {
    padding: 12px;
    border-top: 1px solid #e5e7eb;
}

.input-wrapper {
    display: flex;
    gap: 6px;
    align-items: center;
}

.chat-input {
    flex: 1;
    padding: 10px 14px;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    outline: none;
    transition: border-color 0.2s;
}

.chat-input:focus {
    border-color: #21409A;
}

.chat-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.send-button {
    width: 36px;
    height: 36px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.send-button:hover:not(:disabled) {
    background: #dc2626;
    transform: scale(1.05);
}

.send-button:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
}

.chat-toggle-button {
    width: 50px;
    height: 50px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(33, 64, 154, 0.3);
    transition: all 0.3s ease;
}

.chat-toggle-button:hover {
    background: #1e3a8a;
    transform: scale(1.08);
}

.chat-toggle-button.open {
    background: #ef4444;
}

.chat-toggle-button.open:hover {
    background: #dc2626;
}

.chat-toggle-button::before {
    content: '';
    position: absolute;
    top: 6px;
    right: 6px;
    width: 6px;
    height: 6px;
    background: #ef4444;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.chat-toggle-button.open::before {
    display: none;
    
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
        box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 480px) {
    .chatbot-container {
        bottom: 10px;
        left: 10px;
        right: 10px;
    }

    .chat-window {
        width: 90vw;
        height: 80vh;
    }

    .chat-toggle-button {
        width: 46px;
        height: 46px;
    }
}

.messages-container::-webkit-scrollbar {
    width: 4px;
}

.messages-container::-webkit-scrollbar-track {
    background: #f1f3f4;
}

.messages-container::-webkit-scrollbar-thumb {
    background: #21409A;
    border-radius: 2px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
    background: #1e3a8a;
}
</style>