import { json } from '@sveltejs/kit';
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
 * }} MarkdownPost
 */

export const prerender = true;

export const GET = async () => {
	const allPostFiles = import.meta.glob('/src/lib/posts/*.md');
	const rawPostFiles = import.meta.glob('/src/lib/posts/*.md', {
		query: '?raw',
		import: 'default'
	});

	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = /** @type {MarkdownPost} */ (await resolver());
			const rawResolver = rawPostFiles[path];
			const raw = rawResolver ? String(await rawResolver()) : '';
			const filename = path.split('/').pop() ?? '';
			const slug = filename.slice(0, -3);

			return {
				meta: {
					...metadata,
					tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : []
				},
				path: `/blog/${slug}`,
				readingTime: estimateReadingTime(raw)
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return json(sortedPosts);
};
