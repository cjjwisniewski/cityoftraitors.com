import { estimateReadingTime } from '$lib/utils/format.js';

/**
 * @typedef {{
 *   metadata: {
 *     title: string;
 *     date: string;
 *     description?: string;
 *     author?: string;
 *     tags?: string[];
 *   };
 *   default: import('svelte').Component;
 * }} MarkdownModule
 */

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const posts = import.meta.glob('/src/lib/posts/*.md');
	const rawPosts = import.meta.glob('/src/lib/posts/*.md', {
		query: '?raw',
		import: 'default'
	});

	const key = `/src/lib/posts/${params.slug}.md`;
	const postResolver = posts[key];

	if (!postResolver) {
		throw new Error(`Post not found: ${params.slug}`);
	}

	const post = /** @type {MarkdownModule} */ (await postResolver());
	const raw = rawPosts[key] ? String(await rawPosts[key]()) : '';
	const { title, date, author, description, tags } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		author,
		description,
		tags: Array.isArray(tags) ? tags : [],
		readingTime: estimateReadingTime(raw)
	};
};
