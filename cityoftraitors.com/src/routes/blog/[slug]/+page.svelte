<script>
	import { onMount, tick } from 'svelte';
	import { authors } from '$lib/authors.js';
	import { formatPostDate } from '$lib/utils/format.js';

	export let data;

	let scrollProgress = 0;
	let copiedLink = false;
	/** @type {{ src: string; alt: string } | null} */
	let lightboxImage = null;
	/** @type {HTMLButtonElement | null} */
	let lightboxCloseBtn = null;
	/** @type {HTMLElement | null} */
	let lastFocusedImage = null;

	$: authorInfo = data.author ? authors[data.author] : null;
	$: authorInitials = authorInfo
		? authorInfo.name
				.split(' ')
				.map((part) => part[0])
				.join('')
				.slice(0, 2)
				.toUpperCase()
		: '';

	function updateScrollProgress() {
		const doc = document.documentElement;
		const scrollTop = window.scrollY || doc.scrollTop;
		const maxScroll = doc.scrollHeight - doc.clientHeight;
		scrollProgress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
	}

	async function copyPostLink() {
		try {
			await navigator.clipboard.writeText(canonicalUrl);
			copiedLink = true;
			setTimeout(() => {
				copiedLink = false;
			}, 2000);
		} catch {
			// Fallback ignored if clipboard is unavailable
		}
	}

	/** @param {MouseEvent} event */
	async function handleContentClick(event) {
		if (event.target instanceof HTMLImageElement && event.target.src) {
			lastFocusedImage = event.target;
			lightboxImage = {
				src: event.target.currentSrc || event.target.src,
				alt: event.target.alt || data.title
			};
			document.body.style.overflow = 'hidden';
			await tick();
			lightboxCloseBtn?.focus();
		}
	}

	function closeLightbox() {
		lightboxImage = null;
		document.body.style.overflow = '';
		lastFocusedImage?.focus();
		lastFocusedImage = null;
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape' && lightboxImage) {
			closeLightbox();
		}
	}

	onMount(() => {
		updateScrollProgress();
	});
	$: canonicalUrl = `https://cityoftraitors.com/blog/${data.slug}/`;
	$: structuredDataTag = `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		description: data.description || undefined,
		datePublished: data.date || undefined,
		url: canonicalUrl,
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
		image: 'https://cityoftraitors.com/assets/og-card.jpg',
		author: authorInfo
			? { '@type': 'Person', name: authorInfo.name }
			: { '@type': 'Organization', name: 'City of Traitors' },
		publisher: {
			'@type': 'Organization',
			name: 'City of Traitors',
			url: 'https://cityoftraitors.com/'
		}
	})}<\/script>`;
</script>

<svelte:window on:scroll={updateScrollProgress} on:resize={updateScrollProgress} on:keydown={handleKeydown} />

<svelte:head>
	<title>{data.title} - City of Traitors</title>
	<link rel="canonical" href={canonicalUrl} />
	{#if data.description}
		<meta name="description" content={data.description} />
		<meta property="og:description" content={data.description} />
		<meta name="twitter:description" content={data.description} />
	{/if}
	<meta property="og:title" content={`${data.title} - City of Traitors`} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="City of Traitors" />
	{#if data.date}
		<meta property="article:published_time" content={data.date} />
	{/if}
	{#if authorInfo}
		<meta property="article:author" content={authorInfo.name} />
	{/if}
	<meta property="og:image" content="https://cityoftraitors.com/assets/og-card.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${data.title} - City of Traitors`} />
	<meta name="twitter:image" content="https://cityoftraitors.com/assets/og-card.jpg" />
	{@html structuredDataTag}
</svelte:head>

<div class="progress-track" aria-hidden="true">
	<div class="progress-bar" style="width: {scrollProgress}%"></div>
</div>

<article class="blog-post">
	<div class="breadcrumb">
		<a href="/">&larr; Back to Chronicles</a>
	</div>

	<header class="post-header">
		<div class="meta">
			<time datetime={data.date}>{formatPostDate(data.date)}</time>
			{#if data.readingTime}
				<span class="dot" aria-hidden="true">&middot;</span>
				<span>{data.readingTime} min read</span>
			{/if}
			{#if data.author}
				<span class="dot" aria-hidden="true">&middot;</span>
				<span class="author">By {data.author}</span>
			{/if}
			<button
				type="button"
				class="copy-link-btn"
				on:click={copyPostLink}
				aria-live="polite"
			>
				{copiedLink ? 'Link copied' : 'Copy link'}
			</button>
		</div>
		<h1>{data.title}</h1>
		{#if data.description}
			<p class="lead">{data.description}</p>
		{/if}
		{#if data.tags?.length}
			<div class="post-tags">
				{#each data.tags as tag}
					<span class="post-tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
	<div class="content" on:click={handleContentClick}>
		<svelte:component this={data.content} />
	</div>

	{#if authorInfo}
		<footer class="post-footer">
			<section class="about-author" aria-label="About the Author">
				<div class="author-avatar" aria-hidden="true">{authorInitials}</div>
				<div class="author-info">
					<span class="author-label">About the Author</span>
					<p>
						<strong>{authorInfo.name}</strong>
						{authorInfo.bio}
					</p>
				</div>
			</section>
		</footer>
	{/if}

	<div class="back-link">
		<a href="/">&larr; Return to all Chronicles</a>
	</div>
</article>

{#if lightboxImage}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<div
		class="lightbox-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="Expanded image preview"
		tabindex="-1"
		on:click={(e) => {
			if (e.target === e.currentTarget) closeLightbox();
		}}
	>
		<button
			bind:this={lightboxCloseBtn}
			type="button"
			class="lightbox-close"
			aria-label="Close image preview"
			on:click={closeLightbox}
		>
			&times;
		</button>
		<figure class="lightbox-figure">
			<img src={lightboxImage.src} alt={lightboxImage.alt} />
			{#if lightboxImage.alt}
				<figcaption>{lightboxImage.alt}</figcaption>
			{/if}
		</figure>
	</div>
{/if}

<style>
	.progress-track {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		z-index: 200;
		background: transparent;
		pointer-events: none;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent), var(--color-accent-bright));
		box-shadow: 0 0 10px rgba(201, 166, 107, 0.55);
		transition: width 0.08s linear;
	}

	.blog-post {
		max-width: 820px;
		margin: 0 auto;
		background: linear-gradient(180deg, var(--color-surface) 0%, #121216 100%);
		padding: 2.75rem 3.25rem 3.25rem;
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		box-shadow:
			0 24px 60px -24px rgba(0, 0, 0, 0.75),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.breadcrumb {
		margin-bottom: 1.75rem;
	}

	.breadcrumb a {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.03em;
		color: var(--color-text-muted);
	}

	.breadcrumb a:hover {
		color: var(--color-accent-bright);
	}

	.post-header {
		margin-bottom: 2.75rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-accent);
		margin-bottom: 1rem;
	}

	.meta .dot {
		color: var(--color-secondary);
	}

	.meta .author {
		color: var(--color-text-muted);
	}

	.copy-link-btn {
		margin-left: auto;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.03em;
		color: var(--color-text-muted);
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 0.2rem 0.65rem;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	.copy-link-btn:hover {
		color: var(--color-accent-bright);
		border-color: var(--color-border-strong);
		background: var(--color-accent-dim);
	}

	h1 {
		font-size: clamp(2.15rem, 4.8vw, 3.1rem);
		margin-bottom: 0.85rem;
		color: var(--color-primary);
		line-height: 1.12;
	}

	.lead {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.22rem;
		font-style: italic;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 1.15rem;
	}

	.post-tag {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.03em;
		color: var(--color-accent);
		background: var(--color-accent-dim);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 0.18rem 0.6rem;
	}

	.content {
		font-family: var(--font-serif);
		font-size: 1.16rem;
		line-height: 1.78;
		color: var(--color-text);
		max-width: var(--prose-width);
	}

	/* Suppress duplicate leading H1 if markdown repeats frontmatter title */
	.content :global(> h1:first-child) {
		display: none;
	}

	.content :global(h2) {
		font-family: var(--font-display);
		font-size: 1.95rem;
		margin-top: 3rem;
		margin-bottom: 1.2rem;
		color: var(--color-primary);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.content :global(h3) {
		font-family: var(--font-display);
		font-size: 1.48rem;
		margin-top: 2.25rem;
		margin-bottom: 0.75rem;
		color: var(--color-accent-bright);
	}

	.content :global(p) {
		margin-top: 0;
		margin-bottom: 1.5rem;
	}

	.content :global(a) {
		color: var(--color-accent-bright);
		text-decoration: underline;
		text-decoration-color: rgba(201, 166, 107, 0.45);
		text-underline-offset: 3px;
	}

	.content :global(a:hover) {
		text-decoration-color: var(--color-accent-bright);
	}

	.content :global(ul),
	.content :global(ol) {
		margin-bottom: 1.6rem;
		padding-left: 1.65rem;
	}

	.content :global(li) {
		margin-bottom: 0.5rem;
	}

	.content :global(blockquote) {
		border-left: 3px solid var(--color-accent);
		margin: 2rem 0;
		padding: 1rem 1.5rem;
		background: rgba(201, 166, 107, 0.05);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		font-style: italic;
		color: #cfc7b8;
	}

	.content :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.content :global(code) {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--color-border-subtle);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: var(--color-primary);
	}

	.content :global(pre) {
		background: #0d0d10;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius-md);
		overflow-x: auto;
		margin: 1.75rem 0 2rem;
		border: 1px solid var(--color-border-subtle);
	}

	.content :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: 0.9rem;
	}

	.content :global(img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 2.25rem auto;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.85);
		cursor: zoom-in;
	}

	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		background: rgba(6, 6, 8, 0.9);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.lightbox-close {
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: 1px solid var(--color-border-strong);
		background: rgba(22, 22, 27, 0.92);
		color: var(--color-primary);
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-close:hover {
		color: var(--color-accent-bright);
		border-color: var(--color-accent);
	}

	.lightbox-figure {
		margin: 0;
		max-width: min(1100px, 94vw);
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.lightbox-figure img {
		max-width: 100%;
		max-height: 82vh;
		width: auto;
		height: auto;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-strong);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
	}

	.lightbox-figure figcaption {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-text-muted);
		text-align: center;
	}

	.post-footer {
		margin-top: 3.5rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border-subtle);
	}

	.about-author {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		background: rgba(11, 11, 13, 0.55);
		padding: 1.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.author-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--color-accent-dim);
		border: 1px solid var(--color-border-strong);
		color: var(--color-accent-bright);
		font-family: var(--font-display);
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.author-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-accent);
		margin-bottom: 0.35rem;
	}

	.author-info p {
		margin: 0;
		font-size: 0.96rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.author-info strong {
		color: var(--color-primary);
	}

	.back-link {
		margin-top: 2.5rem;
		padding-top: 1.75rem;
		border-top: 1px solid var(--color-border-subtle);
		text-align: center;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.86rem;
		letter-spacing: 0.03em;
	}

	@media (max-width: 640px) {
		.blog-post {
			padding: 1.5rem 1.25rem 2rem;
		}

		.content {
			font-size: 1.06rem;
		}

		.about-author {
			flex-direction: column;
			gap: 0.9rem;
		}
	}
</style>
