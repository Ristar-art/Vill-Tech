// import { json } from '@sveltejs/kit';
// import { db } from '$lib/firebase/firebase';
// import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// export async function POST({ request }) {
//     try {
//         const { slug } = await request.json();

//         if (!slug) {
//             return new Response(JSON.stringify({ error: 'Slug is required' }), {
//                 status: 400,
//                 headers: { 'Content-Type': 'application/json' }
//             });
//         }

//         // Query the posts collection for the document with matching slug
//         const postsCollection = collection(db, 'posts');
//         const q = query(postsCollection, where('slug', '==', slug));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             return new Response(JSON.stringify({ error: 'Post not found' }), {
//                 status: 404,
//                 headers: { 'Content-Type': 'application/json' }
//             });
//         }

//         // Get the post document
//         const postDoc = querySnapshot.docs[0];
//         const postRef = doc(db, 'posts', postDoc.id);
//         const currentViews = postDoc.data().views || 0;

//         // Increment views
//         await updateDoc(postRef, {
//             views: currentViews + 1
//         });

//         return json({ success: true, views: currentViews + 1 });
//     } catch (error) {
//         console.error('Error incrementing views:', error);
//         return new Response(JSON.stringify({ error: 'Failed to increment views' }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }
// }