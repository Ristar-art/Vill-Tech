<!--  src/routes/chat/+page.svelte -->
<script>
import { onMount } from 'svelte';
import { chatStore } from '$lib/chat/store';

let message = '';
let currentRoom = 'general';

onMount(() => {
    chatStore.initializeChat();
    chatStore.joinRoom(currentRoom);
});

function sendMessage() {
    chatStore.sendMessage(currentRoom, message);
    message = '';
}
</script>

<section class="min-h-screen pt-14">
    <h1>Chat</h1>
    <select bind:value={currentRoom}>
</section>
<div class="mt-14">
    {#each $chatStore as msg}
        <p>{msg.username}: {msg.message}</p>
    {/each}
</div>

<input bind:value={message} />
<button on:click={sendMessage}>Send</button>
