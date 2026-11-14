export const prerender = true;

const SITE_URL = 'https://cityoftraitors.com';

/**
 * @param {string} value
 * @returns {string}
 */
function escapeXml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET = async () => {
	const allPostFiles = import.meta.glob('/src/lib/posts/*.md');
	const posts = await Promise.all(
		Object.entries(allPostFiles).map(async ([path, resolver]) => {
			const { metadata } = /** @type {{ metadata: Record<string, any> }} */ (await resolver());
			const filename = path.split('/').pop() ?? '';
			const slug = filename.slice(0, -3);
			return {
				slug,
				title: String(metadata.title ?? slug),
				date: String(metadata.date ?? ''),
				description: String(metadata.description ?? ''),
				tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : []
			};
		})
	);

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const lastBuildDate = posts[0]?.date
		? new Date(`${posts[0].date}T12:00:00Z`).toUTCString()
		: new Date().toUTCString();

	const itemsXml = posts
		.map((post) => {
			const url = `${SITE_URL}/blog/${post.slug}/`;
			const pubDate = post.date ? new Date(`${post.date}T12:00:00Z`).toUTCString() : lastBuildDate;
			const categories = post.tags
				.map((tag) => `\n\t\t\t<category>${escapeXml(tag)}</category>`)
				.join('');
			return `\t\t<item>
			<title>${escapeXml(post.title)}</title>
			<link>${escapeXml(url)}</link>
			<guid isPermaLink="true">${escapeXml(url)}</guid>
			<pubDate>${pubDate}</pubDate>
			<description>${escapeXml(post.description)}</description>${categories}
		</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>City of Traitors</title>
		<link>${SITE_URL}/</link>
		<description>Tournament reports, rogue brews, and old-frame Magic: The Gathering chronicles.</description>
		<language>en-us</language>
		<lastBuildDate>${lastBuildDate}</lastBuildDate>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
