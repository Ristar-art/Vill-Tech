import { json } from '@sveltejs/kit';
import { db } from "$lib/firebase/firebase";
import { collection, addDoc, getDocs } from 'firebase/firestore';



// Fetch all posts
export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return json(posts);
}

