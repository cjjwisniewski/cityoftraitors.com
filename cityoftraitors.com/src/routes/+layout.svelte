<script>
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/newsreader/opsz.css';
	import '@fontsource-variable/newsreader/opsz-italic.css';
	import '../app.css';

	const DISCORD_INVITE_URL = 'https://discord.gg/a5Kyrfekxd';
	let showDiscordModal = false;

	$: pathname = $page.url.pathname;

	/** @param {MouseEvent} event */
	function openDiscordModal(event) {
		event.preventDefault();
		showDiscordModal = true;
	}

	function closeDiscordModal() {
		showDiscordModal = false;
	}

	/** @param {KeyboardEvent} event */
	function handleWindowKeydown(event) {
		if (event.key === 'Escape' && showDiscordModal) {
			closeDiscordModal();
		}
	}
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="City of Traitors RSS" href="/rss.xml" />
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
				<a
					href={DISCORD_INVITE_URL}
					class="external-link"
					target="_blank"
					rel="noopener noreferrer"
					on:click={openDiscordModal}
				>
					<span>Discord</span>
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
			<p class="footer-links">
				<a
					href={DISCORD_INVITE_URL}
					target="_blank"
					rel="noopener noreferrer"
					on:click={openDiscordModal}
				>Discord</a>
				<span aria-hidden="true">&middot;</span>
				<a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
				<span aria-hidden="true">&middot;</span>
				<a href="https://pittimps.com" target="_blank" rel="noopener noreferrer">Pitt Imps</a>
				<span aria-hidden="true">&middot;</span>
				<a href="https://www.undo.is/" target="_blank" rel="noopener noreferrer">undo.is</a>
			</p>
			<p class="disclaimer">
				Magic: The Gathering is a trademark of Wizards of the Coast. This site is not affiliated
				with Wizards of the Coast.
			</p>
		</div>
	</footer>
</div>

{#if showDiscordModal}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby="cot-discord-title"
		tabindex="-1"
		on:click={(e) => {
			if (e.target === e.currentTarget) closeDiscordModal();
		}}
	>
		<div class="modal-card">
			<button
				type="button"
				class="modal-close"
				aria-label="Close dialog"
				on:click={closeDiscordModal}
			>
				&times;
			</button>
			<span class="modal-eyebrow">Temporary Invite</span>
			<h2 id="cot-discord-title">Join the City of Traitors Discord</h2>
			<p class="modal-body">
				This link is a <strong>temporary invite</strong> to the City of Traitors Discord server.
				Once you arrive, please <strong>select a role</strong> in the server so your membership
				sticks permanently.
			</p>
			<div class="modal-actions">
				<button type="button" class="modal-btn modal-btn-secondary" on:click={closeDiscordModal}>
					Cancel
				</button>
				<a
					href={DISCORD_INVITE_URL}
					class="modal-btn modal-btn-primary"
					target="_blank"
					rel="noopener noreferrer"
					on:click={closeDiscordModal}
				>
					Continue to Discord
				</a>
			</div>
		</div>
	</div>
{/if}

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

	.footer-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.55rem;
		margin: 0.4rem 0 0;
		font-family: var(--font-sans);
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

	.footer-links a {
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-links a:hover {
		color: var(--color-accent-bright);
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
		background: rgba(6, 6, 8, 0.8);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.modal-card {
		position: relative;
		width: 100%;
		max-width: 460px;
		padding: 1.85rem;
		border-radius: var(--radius-lg);
		background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg-elevated) 100%);
		border: 1px solid var(--color-border-strong);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 24px 60px rgba(0, 0, 0, 0.75);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.modal-close {
		position: absolute;
		top: 0.85rem;
		right: 0.85rem;
		width: 36px;
		height: 36px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		font-size: 1.35rem;
		line-height: 1;
		cursor: pointer;
		transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
	}

	.modal-close:hover {
		color: var(--color-primary);
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--color-border);
	}

	.modal-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-accent);
	}

	.modal-card h2 {
		margin: 0;
		font-size: 1.55rem;
		color: var(--color-primary);
	}

	.modal-body {
		margin: 0;
		font-family: var(--font-sans);
		font-size: 0.96rem;
		line-height: 1.65;
		color: var(--color-text);
	}

	.modal-body strong {
		color: var(--color-primary);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.modal-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.65rem 1.2rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
	}

	.modal-btn-primary {
		background: var(--color-accent);
		color: #110f0b;
		border: 1px solid var(--color-accent);
	}

	.modal-btn-primary:hover {
		background: var(--color-accent-bright);
		border-color: var(--color-accent-bright);
		color: #110f0b;
	}

	.modal-btn-secondary {
		background: rgba(18, 18, 22, 0.78);
		color: var(--color-primary);
		border: 1px solid var(--color-border-strong);
	}

	.modal-btn-secondary:hover {
		background: var(--color-surface-hover);
		border-color: var(--color-accent);
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
			min-height: 44px;
			padding: 0.5rem 0.65rem;
			font-size: 0.85rem;
		}

		.footer-links a {
			min-height: 44px;
			display: inline-flex;
			align-items: center;
			padding: 0 0.25rem;
		}

		.modal-card {
			padding: 1.4rem;
		}

		.modal-actions {
			flex-direction: column-reverse;
		}

		.modal-btn {
			width: 100%;
			min-height: 44px;
		}

		main {
			padding: 1.5rem 1rem 3rem;
		}
	}
</style>
