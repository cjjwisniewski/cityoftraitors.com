import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { authors } from '../src/lib/authors.js';
import { estimateReadingTime, formatPostDate } from '../src/lib/utils/format.js';
import { prerender as layoutPrerender, trailingSlash } from '../src/routes/+layout.js';

const appRoot = process.cwd();

test('formatPostDate formats ISO dates without local timezone drift', () => {
	assert.equal(formatPostDate('2026-02-23'), 'Feb 23, 2026');
	assert.equal(formatPostDate('2026-01-01'), 'Jan 1, 2026');
	assert.equal(formatPostDate('2026-12-31'), 'Dec 31, 2026');
	assert.equal(formatPostDate(''), '');
	assert.equal(formatPostDate('not-a-date'), 'not-a-date');
});

test('estimateReadingTime strips frontmatter and enforces 1-minute minimum', () => {
	assert.equal(estimateReadingTime(''), 1);
	assert.equal(estimateReadingTime('---\ntitle: Test\n---\nHello world'), 1);

	const longBody = Array.from({ length: 441 }, () => 'sol').join(' ');
	const markdown = `---\ntitle: Long Post\n---\n${longBody}`;
	assert.equal(estimateReadingTime(markdown), 3);
});

test('root layout enforces prerender and trailingSlash for Azure $web hosting', () => {
	assert.equal(layoutPrerender, true);
	assert.equal(trailingSlash, 'always');
});

test('all markdown chronicles have valid frontmatter and registered authors', () => {
	const postsDir = path.join(appRoot, 'src/lib/posts');
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
	assert.ok(files.length > 0, 'Expected at least one markdown post');

	for (const file of files) {
		const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
		const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
		assert.ok(match, `Missing YAML frontmatter in ${file}`);
		const fm = match[1];

		assert.match(fm, /^title:\s*.+/m, `Missing title in ${file}`);
		assert.match(fm, /^date:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/m, `Missing YYYY-MM-DD date in ${file}`);
		assert.match(fm, /^description:\s*.+/m, `Missing description in ${file}`);

		const authorMatch = /^author:\s*['"]?(.+?)['"]?\s*$/m.exec(fm);
		assert.ok(authorMatch, `Missing author in ${file}`);
		const authorName = authorMatch[1].trim();
		assert.ok(authorName in authors, `Unregistered author "${authorName}" in ${file}`);
	}
});

test('svelte.config.js configures adapter-static with build output', () => {
	const configSource = fs.readFileSync(path.join(appRoot, 'svelte.config.js'), 'utf8');
	assert.match(configSource, /adapter-static/);
	assert.match(configSource, /strict:\s*true/);
});
