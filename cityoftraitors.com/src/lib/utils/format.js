const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

/**
 * Format an ISO-like date string (e.g. '2026-02-23') without local timezone drift.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatPostDate(dateStr) {
	if (!dateStr) return '';
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr).trim());
	if (match) {
		const year = Number(match[1]);
		const monthIndex = Number(match[2]) - 1;
		const day = Number(match[3]);
		if (monthIndex >= 0 && monthIndex < 12) {
			return `${MONTHS[monthIndex]} ${day}, ${year}`;
		}
	}
	const parsed = new Date(dateStr);
	if (Number.isNaN(parsed.getTime())) return String(dateStr);
	return parsed.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

/**
 * Estimate reading time in minutes from raw markdown source.
 * @param {string} rawMarkdown
 * @returns {number}
 */
export function estimateReadingTime(rawMarkdown) {
	if (!rawMarkdown) return 1;
	const withoutFrontmatter = rawMarkdown.replace(/^---[\s\S]*?---/, '');
	const words = withoutFrontmatter.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}
