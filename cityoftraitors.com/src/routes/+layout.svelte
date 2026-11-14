<script>
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	$: pathname = $page.url.pathname;
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<div class="app-container">
	<header class="site-header">
		<div class="header-content">
			<a href="/" class="brand" aria-label="City of Traitors Home">
				<span class="brand-crest" aria-hidden="true">
					<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16 3L28 16L16 29L4 16L16 3Z"
							fill="#16161b"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M16 8.5L22.5 16L16 23.5L9.5 16L16 8.5Z"
							stroke="currentColor"
							stroke-opacity="0.55"
							stroke-width="1.1"
						/>
						<circle cx="16" cy="16" r="1.75" fill="#f2ece1" />
					</svg>
				</span>
				<span class="brand-text">City of Traitors</span>
			</a>

			<nav aria-label="Main navigation">
				<a href="/" class:active={pathname === '/' || pathname.startsWith('/blog')}>
					Chronicles
				</a>
				<a href="/about" class:active={pathname.startsWith('/about')}>
					About
				</a>
				<a
					href="https://seeker.cityoftraitors.com/"
					class="external-link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>Seeker</span>
					<svg
						class="external-icon"
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M5.5 3.5H12.5V10.5M12.25 3.75L4 12"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</nav>
		</div>
	</header>

	<main>
		<slot />
	</main>

	<footer class="site-footer">
		<div class="footer-content">
			<div class="footer-ornament" aria-hidden="true">
				<span class="line"></span>
				<span class="diamond"></span>
				<span class="line"></span>
			</div>
			<p class="copyright">
				&copy; {new Date().getFullYear()} City of Traitors &middot; Tap for two colorless.
			</p>
			<p class="disclaimer">
				Magic: The Gathering is a trademark of Wizards of the Coast. This site is not affiliated
				with Wizards of the Coast.
			</p>
		</div>
	</footer>
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(11, 11, 13, 0.78);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--color-border);
	}

	.header-content {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0.9rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-primary);
	}

	.brand:hover {
		color: var(--color-accent-bright);
	}

	.brand-crest {
		width: 28px;
		height: 28px;
		display: inline-flex;
		color: var(--color-accent);
		flex-shrink: 0;
		transition: transform 0.25s ease;
	}

	.brand:hover .brand-crest {
		transform: rotate(45deg) scale(1.04);
	}

	.brand-crest svg {
		width: 100%;
		height: 100%;
	}

	.brand-text {
		font-family: var(--font-display);
		font-size: 1.65rem;
		letter-spacing: 0.02em;
		line-height: 1;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	nav a {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.45rem 0.85rem;
		border-radius: 999px;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-text-muted);
		border: 1px solid transparent;
		transition:
			color 0.2s ease,
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	nav a:hover {
		color: var(--color-primary);
		background: rgba(255, 255, 255, 0.04);
	}

	nav a.active {
		color: var(--color-accent-bright);
		background: var(--color-accent-dim);
		border-color: var(--color-border);
	}

	.external-link {
		color: var(--color-accent);
	}

	.external-icon {
		width: 14px;
		height: 14px;
		opacity: 0.8;
		transition: transform 0.2s ease;
	}

	.external-link:hover .external-icon {
		transform: translate(1.5px, -1.5px);
		opacity: 1;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2.25rem 1.5rem 4rem;
	}

	.site-footer {
		margin-top: auto;
		padding: 2.5rem 1.5rem 3rem;
	}

	.footer-content {
		max-width: var(--max-width);
		margin: 0 auto;
		text-align: center;
	}

	.footer-ornament {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.footer-ornament .line {
		height: 1px;
		width: 100%;
		max-width: 180px;
		background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent);
	}

	.footer-ornament .diamond {
		width: 7px;
		height: 7px;
		transform: rotate(45deg);
		border: 1px solid var(--color-accent);
		background: var(--color-bg);
		flex-shrink: 0;
	}

	.copyright {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.disclaimer {
		font-size: 0.78rem;
		margin: 0.45rem 0 0;
		color: var(--color-secondary);
	}

	@media (max-width: 640px) {
		.header-content {
			padding: 0.8rem 1rem;
		}

		.brand-text {
			font-size: 1.35rem;
		}

		nav a {
			padding: 0.4rem 0.65rem;
			font-size: 0.85rem;
		}

		main {
			padding: 1.5rem 1rem 3rem;
		}
	}
</style>
