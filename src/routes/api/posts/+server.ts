import { json } from '@sveltejs/kit';
import { db } from '$lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { createRedisStore } from '$lib/redisStore';

const redisStore = createRedisStore();

export async function GET() {
    try {
        // Check cache
        const cachedPosts = redisStore.get('posts');
        if (cachedPosts) {
            return json(cachedPosts);
        }

        // Fetch from Firestore
        const postsCollection = collection(db, 'posts');
        const querySnapshot = await getDocs(postsCollection);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Cache posts with 5-minute TTL
        redisStore.set('posts', posts, 300);

        return json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}