export const load = async ({ params }) => {
    const posts = import.meta.glob('/src/lib/posts/*.md');
    const postResolver = posts[`/src/lib/posts/${params.slug}.md`];

    if (!postResolver) {
        throw new Error(`Post not found: ${params.slug}`);
    }

    const post = await postResolver();
    const { title, date } = post.metadata;
    const content = post.default;

    return {
        content,
        title,
        date
    };
};
