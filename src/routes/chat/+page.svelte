<script>
    let messages = [
      { user: 'Patricia Woodall', avatar: 'path/to/avatar1.jpg', message: 'Nibh erat iaculis turpis' },
      { user: 'Rodolfo Hernadez', avatar: 'path/to/avatar2.jpg', message: 'Aptent suscipit diam' },
      { user: 'Rebecca Myers', avatar: 'path/to/avatar3.jpg', message: 'Consectetuer ante phasellus' },
      { user: 'Timothy Boudain', avatar: 'path/to/avatar4.jpg', message: 'Tellus lacus aliquam' },
      { user: 'Larry Clark', avatar: 'path/to/avatar5.jpg', message: 'Quis noi amet' },
    ];
  </script>
  
  <div class="bg-white rounded-lg p-4">
    <h2 class="font-bold mb-4">CHATBOX</h2>
    <div class="space-y-4 mb-4">
      {#each messages as message}
        <div class="flex items-center">
          <img src={message.avatar} alt={message.user} class="w-8 h-8 rounded-full mr-2">
          <div>
            <div class="font-bold">{message.user}</div>
            <div class="text-sm">{message.message}</div>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex">
      <input type="text" placeholder="Say something..." class="flex-grow border rounded-l px-2 py-1">
      <button class="bg-gray-200 px-4 py-1 rounded-r">Send</button>
    </div>
  </div>