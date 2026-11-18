import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

if (process.env.GITHUB_ACTIONS !== 'true') {
	console.error(
		'Refusing to run tests locally: tests are restricted to GitHub Actions CI (GITHUB_ACTIONS=true).'
	);
	process.exit(1);
}

const appRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const testsDir = path.join(appRoot, 'tests');
const testFiles = fs
	.readdirSync(testsDir)
	.filter((f) => f.endsWith('.test.mjs') || f.endsWith('.test.js'))
	.map((f) => path.join(testsDir, f));

if (testFiles.length === 0) {
	console.error('No test files found in tests/.');
	process.exit(1);
}

execFileSync(process.execPath, ['--test', ...testFiles], {
	stdio: 'inherit',
	cwd: appRoot
});
