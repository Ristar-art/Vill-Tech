import { json } from '@sveltejs/kit';
import { db } from '$lib/firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { createRedisStore } from '$lib/redisStore';

const redisStore = createRedisStore();

export async function GET({ url }) {
    const slug = url.searchParams.get('slug');
    if (!slug) {
        return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Check cache
        const cachedPost = redisStore.get(`post:${slug}`);
        if (cachedPost) {
            return json(cachedPost);
        }

        // Query Firestore
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return new Response(JSON.stringify({ error: 'Post not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const postDoc = querySnapshot.docs[0];
        const post = { id: postDoc.id, ...postDoc.data() };

        // Cache post with 5-minute TTL
        redisStore.set(`post:${slug}`, post, 300);

        return json(post);
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}