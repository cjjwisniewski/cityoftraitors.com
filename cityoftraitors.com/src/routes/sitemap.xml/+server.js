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
				date: String(metadata.date ?? '')
			};
		})
	);

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const buildDate = new Date().toISOString().split('T')[0];
	const latestPostDate = posts[0]?.date || buildDate;

	const staticRoutes = [
		{ loc: `${SITE_URL}/`, lastmod: latestPostDate, priority: '1.0' },
		{ loc: `${SITE_URL}/about/`, lastmod: buildDate, priority: '0.7' }
	];

	const postRoutes = posts.map((post) => ({
		loc: `${SITE_URL}/blog/${post.slug}/`,
		lastmod: post.date || buildDate,
		priority: '0.8'
	}));

	const urlsXml = [...staticRoutes, ...postRoutes]
		.map(
			({ loc, lastmod, priority }) => `\t<url>
\t\t<loc>${escapeXml(loc)}</loc>
\t\t<lastmod>${escapeXml(lastmod)}</lastmod>
\t\t<priority>${priority}</priority>
\t</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
