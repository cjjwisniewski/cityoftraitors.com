<script>
    export let data;
</script>

<svelte:head>
    <title>City of Traitors</title>
    <meta
        name="description"
        content="A Magic: The Gathering blog focusing on deck lists and tournament reports."
    />
</svelte:head>

<section class="hero">
    <div class="hero-content">
        <h1>City of Traitors</h1>
        <p>
            A sanctuary for Magic: The Gathering history, deck lists, and
            tournament reports.
        </p>
    </div>
</section>

<div class="blog-container">
    <div class="posts">
        {#each data.posts as post}
            <article class="post-preview">
                <a href={post.path} class="post-link">
                    <h2>{post.meta.title}</h2>
                    <div class="meta">
                        <span class="date"
                            >{new Date(
                                post.meta.date,
                            ).toLocaleDateString()}</span
                        >
                    </div>
                    <p>{post.meta.description}</p>
                    <span class="read-more">Read Chronicle &rarr;</span>
                </a>
            </article>
        {/each}
    </div>
</div>

<style>
    .hero {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.7),
                rgba(0, 0, 0, 0.7)
            ),
            url("/assets/city_of_traitors.png");
        background-size: cover;
        background-position: center;
        height: 25vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        margin-bottom: 2rem;
        border: 1px solid #444;
    }

    .hero-content {
        text-align: center;
        color: #fff;
        padding: 2rem;
        background: rgba(20, 20, 20, 0.8);
        backdrop-filter: blur(3px);
        border: 1px solid var(--color-secondary);
        border-radius: 4px;
        max-width: 700px;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        text-shadow: 2px 2px 4px #000;
        letter-spacing: 2px;
    }

    p {
        font-size: 1.1rem;
        margin-bottom: 0;
        line-height: 1.6;
        color: #ddd;
    }

    .blog-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .posts {
        display: grid;
        gap: 2rem;
    }

    .post-preview {
        background: #222;
        border: 1px solid #333;
        border-radius: 4px;
        transition: all 0.2s;
        position: relative;
        overflow: hidden;
    }

    .post-preview:hover {
        transform: translateY(-2px);
        border-color: var(--color-accent);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .post-link {
        display: block;
        padding: 2rem;
        text-decoration: none;
        color: inherit;
    }

    .post-link:hover {
        text-decoration: none;
        color: inherit;
    }

    h2 {
        margin-bottom: 0.5rem;
        font-size: 2rem;
        color: var(--color-primary);
    }

    .meta {
        font-size: 0.9rem;
        color: var(--color-accent);
        margin-bottom: 1rem;
        font-family: var(--font-header);
    }

    .post-preview p {
        color: #ccc;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .read-more {
        color: var(--color-accent);
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
</style>
