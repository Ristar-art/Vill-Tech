// src/lib/chat/store.js
// import { writable } from 'svelte/store';
// import io from 'socket.io-client';
// import { moodleClient } from '$lib/moodle';

// const socket = io('http://your-websocket-server-url');
// const messages = writable([]);

// export const chatStore = {
//     subscribe: messages.subscribe,
//     sendMessage: (room, message) => {
//         socket.emit('message', { room, message });
//     },
//     joinRoom: (room) => {
//         socket.emit('join', room);
//     },
//     initializeChat: async () => {
//         // const userInfo = await moodleClient.getSiteInfo();
//         socket.emit('authenticate', {
//             userId: userInfo.userid,
//             username: userInfo.username,
//             token: moodleClient.token // Be careful with token exposure
//         });
//     }
// };

// socket.on('message', (data) => {
//     messages.update(msgs => [...msgs, data]);
// });
