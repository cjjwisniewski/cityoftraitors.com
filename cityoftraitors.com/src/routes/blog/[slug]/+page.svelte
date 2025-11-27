<script>
    export let data;
</script>

<svelte:head>
    <title>{data.title} - City of Traitors</title>
</svelte:head>

<article class="blog-post">
    <header>
        <h1>{data.title}</h1>
        <div class="meta">
            <span class="date">{new Date(data.date).toLocaleDateString()}</span>
        </div>
    </header>

    <div class="content">
        <svelte:component this={data.content} />
    </div>

    <div class="back-link">
        <a href="/">&larr; Back to Chronicles</a>
    </div>
</article>

<style>
    .blog-post {
        max-width: 800px;
        margin: 0 auto;
        background: #222;
        padding: 3rem;
        border: 1px solid #333;
        border-radius: 4px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    header {
        margin-bottom: 3rem;
        border-bottom: 1px solid #444;
        padding-bottom: 2rem;
        text-align: center;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--color-primary);
    }

    .meta {
        color: var(--color-accent);
        font-family: var(--font-header);
        font-size: 1.1rem;
    }

    .content {
        line-height: 1.8;
        font-size: 1.1rem;
        color: #ddd;
    }

    /* Markdown Styles */
    .content :global(h2) {
        font-size: 2rem;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        color: var(--color-primary);
        border-bottom: 1px solid #444;
        padding-bottom: 0.5rem;
    }

    .content :global(h3) {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: var(--color-primary);
    }

    .content :global(p) {
        margin-bottom: 1.5rem;
    }

    .content :global(a) {
        color: var(--color-accent);
        text-decoration: underline;
    }

    .content :global(ul),
    .content :global(ol) {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
    }

    .content :global(li) {
        margin-bottom: 0.5rem;
    }

    .content :global(blockquote) {
        border-left: 4px solid var(--color-accent);
        margin: 2rem 0;
        padding: 1rem 2rem;
        background: #1a1a1a;
        font-style: italic;
        color: #bbb;
    }

    .content :global(code) {
        background: #151515;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: monospace;
        font-size: 0.9em;
    }

    .content :global(pre) {
        background: #151515;
        padding: 1.5rem;
        border-radius: 4px;
        overflow-x: auto;
        margin-bottom: 2rem;
        border: 1px solid #333;
    }

    .content :global(pre code) {
        background: none;
        padding: 0;
    }

    .back-link {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid #444;
        text-align: center;
    }

    .back-link a {
        font-family: var(--font-header);
        font-size: 1.2rem;
    }

    @media (max-width: 600px) {
        .blog-post {
            padding: 1.5rem;
        }

        h1 {
            font-size: 2rem;
        }
    }
</style>
