<script>
  import { selectedPost } from '$lib/stores/stores';
  import { onMount } from 'svelte';

    let post;

    onMount(() => {
        // Subscribe to the store to get the selected post
        const unsubscribe = selectedPost.subscribe(value => {
            post = value;
        });

        // Cleanup the subscription
        return () => unsubscribe();
    });
</script>
  
<main class="container mx-auto min-h-screen max-w-3xl p-8">
    <!-- <article>
        {#if post}
            <h1>{data.post.title}</h1>
            <p>Published on: {new Date(data.post.publishedAt).toLocaleDateString()}</p>
            {#if data.post.image}
                <img src={getImageUrl(data.post.image)} alt={data.post.title} />
            {/if}
            <div>
                {#if data.post.body && data.post.body.length > 0}
                    {#each data.post.body as block}
                        {#if block._type === 'block'}
                            <p>
                                {#each block.children as child}
                                    {child.text}
                                {/each}
                            </p>
                        {:else if block._type === 'image'}
                            <figure>
                                <img src={getImageUrl(block)} alt={block.alt} />
                                {#if block.caption}
                                    <figcaption>{block.caption}</figcaption>
                                {/if}
                            </figure>
                        {/if}
                    {/each}
                {:else}
                    <p>No content available</p>
                {/if}
            </div>
        {:else}
            <p>Loading post...</p>
        {/if}
    </article> -->
    <div class="py-16">
        {#if post}
            <h1>{post.title}</h1>

            <img src={post.imageUrl} alt={post.title} />
            <p>{@html post.body}</p>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</main>