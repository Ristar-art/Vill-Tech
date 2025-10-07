<script>
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
//   console.log('🤖 Sending message:', messageToSend);
      try {
        // Call the actual API endpoint
        // console.log('🤖 Sending message to chat API...');
        const botResponse = await callChatAPI(messageToSend);
        
        // Add bot response
        messages = [...messages, {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date()
        }];
        
        // console.log('✅ Chat response received successfully');
      } catch (error) {
        console.error('❌ Chat API Error:', error.message);
        
        // Handle different error types with appropriate user messages
        let errorMessage = "I'm having trouble connecting right now. Please try again or contact us directly at info@villagetech.co.za.";
        
        if (error.message.includes('Rate limit')) {
          errorMessage = "I'm receiving a lot of questions right now! Please wait a moment before sending another message.";
        } else if (error.message.includes('temporarily unavailable')) {
          errorMessage = "Our chat service is temporarily down for maintenance. Please try again in a few minutes or contact us at 087 135 1313.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "It looks like there's a connection issue. Please check your internet and try again.";
        }
        
        // Add error message as bot response
        messages = [...messages, {
          id: Date.now() + 1,
          text: errorMessage,
          sender: "bot",
          timestamp: new Date()
        }];
      } finally {
        isLoading = false;
        scrollToBottom();
      }
    }
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:3000/api/chat';

    // Call the chat API endpoint
    async function callChatAPI(message) {
        // console.log('CHAT_API_URL:', CHAT_API_URL);
      try {
        const response = await fetch(CHAT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message
          })
        });

        // Handle HTTP error statuses
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          if (response.status === 429) {
            throw new Error('Rate limit exceeded - please wait a moment');
          } else if (response.status === 503) {
            throw new Error('Service temporarily unavailable');
          } else if (response.status >= 500) {
            throw new Error('Server error - please try again later');
          } else if (response.status === 400) {
            throw new Error('Invalid message format');
          } else {
            throw new Error(`API error: ${response.status}`);
          }
        }

        const data = await response.json();
        
        // Validate response format
        if (!data || !data.success) {
          throw new Error(data?.message || 'Invalid response from chat service');
        }

        if (!data.response) {
          throw new Error('No response received from chat service');
        }

        return data.response;
        
      } catch (error) {
        // Re-throw with appropriate error message
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network connection error');
        }
        throw error;
      }
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

    // Auto-fill input with quick action text
    function setQuickAction(text) {
      inputText = text;
      // Auto-focus the input after setting text
      setTimeout(() => {
        const inputElement = document.querySelector('.chat-input');
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
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
            <p class="chat-status">Online • Powered by AI</p>
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
              <p class="message-text">{@html message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
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
        <button class="quick-action" on:click={() => setQuickAction("Tell me about your courses")}>📚 Courses</button>
        <button class="quick-action" on:click={() => setQuickAction("How much are the courses?")}>💰 Pricing</button>
        <button class="quick-action" on:click={() => setQuickAction("How can I contact you?")}>📞 Contact</button>
        <button class="quick-action" on:click={() => setQuickAction("What are your accreditations?")}>🎓 Accredited</button>
      </div>
  
      <div class="chat-input-container">
        <div class="input-wrapper">
          <input
            type="text"
            bind:value={inputText}
            on:keypress={handleKeyPress}
            placeholder="Ask about courses, pricing, accreditations, or anything else..."
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
/* Existing CSS remains the same */
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

.message-text strong {
    font-weight: 600;
    color: #21409A;
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