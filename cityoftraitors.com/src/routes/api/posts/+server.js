import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
    const allPostFiles = import.meta.glob('/src/lib/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver();
            const slug = path.split('/').pop().slice(0, -3);

            return {
                meta: metadata,
                path: `/blog/${slug}`
            };
        })
    );

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date) - new Date(a.meta.date);
    });

    return json(sortedPosts);
};
