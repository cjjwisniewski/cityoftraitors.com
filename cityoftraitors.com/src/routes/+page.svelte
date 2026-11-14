<script>
	import { formatPostDate } from '$lib/utils/format.js';

	export let data;

	$: latestPost = data.posts?.[0] ?? null;
</script>

<svelte:head>
	<title>City of Traitors</title>
	<meta
		name="description"
		content="A Magic: The Gathering blog focusing on old-frame formats, Premodern, Legacy deck lists, and tournament reports."
	/>
</svelte:head>

<section class="hero">
	<div class="hero-backdrop" aria-hidden="true"></div>
	<div class="hero-frame" aria-hidden="true">
		<span class="corner tl"></span>
		<span class="corner tr"></span>
		<span class="corner bl"></span>
		<span class="corner br"></span>
	</div>

	<div class="hero-content">
		<h1>City of Traitors</h1>
		<p class="hero-subtitle">
			Tournament reports, rogue brews, and dispatches from the home for all things that tap for two
			colorless mana.
		</p>

		<div class="hero-actions">
			{#if latestPost}
				<a href={latestPost.path} class="btn btn-primary">
					<span>Read Latest Chronicle</span>
					<span class="arrow" aria-hidden="true">&rarr;</span>
				</a>
			{/if}
			<a
				href="https://seeker.cityoftraitors.com/"
				class="btn btn-secondary"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>Open Seeker</span>
				<span class="arrow" aria-hidden="true">&#8599;</span>
			</a>
		</div>
	</div>
</section>

<section class="chronicles" aria-labelledby="chronicles-heading">
	<div class="section-header">
		<div class="section-title-group">
			<h2 id="chronicles-heading">Chronicles</h2>
			<span class="count-pill">{data.posts.length} {data.posts.length === 1 ? 'entry' : 'entries'}</span>
		</div>
		<p class="section-caption">Premodern, Legacy &amp; questionable Sol-land decisions</p>
	</div>

	<div class="posts">
		{#each data.posts as post}
			<article class="post-card">
				<a href={post.path} class="post-link">
					<div class="post-meta">
						<time datetime={post.meta.date}>{formatPostDate(post.meta.date)}</time>
						{#if post.readingTime}
							<span class="dot" aria-hidden="true">&middot;</span>
							<span>{post.readingTime} min read</span>
						{/if}
						{#if post.meta.author}
							<span class="dot" aria-hidden="true">&middot;</span>
							<span class="author">{post.meta.author}</span>
						{/if}
					</div>

					<h3>{post.meta.title}</h3>
					<p class="post-description">{post.meta.description}</p>

					<span class="read-more">
						<span>Read Chronicle</span>
						<span class="read-more-arrow" aria-hidden="true">&rarr;</span>
					</span>
				</a>
			</article>
		{/each}
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		background-color: var(--color-bg-elevated);
		min-height: 380px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3.5rem 2rem;
		margin-bottom: 3.5rem;
		box-shadow:
			0 24px 60px -20px rgba(0, 0, 0, 0.75),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.hero-backdrop {
		position: absolute;
		inset: 0;
		background-image:
			radial-gradient(circle at 50% 42%, rgba(11, 11, 13, 0.35) 0%, rgba(11, 11, 13, 0.88) 78%),
			linear-gradient(180deg, rgba(11, 11, 13, 0.45) 0%, rgba(11, 11, 13, 0.92) 100%),
			url('/assets/city_of_traitors.png');
		background-size: cover;
		background-position: center 38%;
		transform: scale(1.03);
		filter: saturate(0.92) contrast(1.06);
	}

	.hero-frame {
		position: absolute;
		inset: 12px;
		border: 1px solid rgba(201, 166, 107, 0.16);
		border-radius: calc(var(--radius-lg) - 6px);
		pointer-events: none;
	}

	.corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border-color: var(--color-accent);
		border-style: solid;
		opacity: 0.65;
	}

	.corner.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
		border-top-left-radius: 6px;
	}
	.corner.tr {
		top: -1px;
		right: -1px;
		border-width: 2px 2px 0 0;
		border-top-right-radius: 6px;
	}
	.corner.bl {
		bottom: -1px;
		left: -1px;
		border-width: 0 0 2px 2px;
		border-bottom-left-radius: 6px;
	}
	.corner.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
		border-bottom-right-radius: 6px;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 660px;
	}

	h1 {
		font-size: clamp(2.65rem, 6vw, 4.1rem);
		margin-bottom: 0.9rem;
		color: var(--color-primary);
		text-shadow: 0 6px 28px rgba(0, 0, 0, 0.9);
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.1rem, 2.2vw, 1.32rem);
		line-height: 1.55;
		color: #ded7ca;
		margin: 0 auto 2rem;
		max-width: 540px;
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.85);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.72rem 1.35rem;
		border-radius: var(--radius-sm);
		font-size: 0.92rem;
		font-weight: 500;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn-primary {
		background: var(--color-accent);
		color: #110f0b;
		border: 1px solid var(--color-accent-bright);
		box-shadow: 0 8px 24px -8px rgba(201, 166, 107, 0.55);
	}

	.btn-primary:hover {
		background: var(--color-accent-bright);
		color: #110f0b;
	}

	.btn-secondary {
		background: rgba(18, 18, 22, 0.78);
		color: var(--color-primary);
		border: 1px solid var(--color-border-strong);
		backdrop-filter: blur(8px);
	}

	.btn-secondary:hover {
		background: rgba(28, 28, 35, 0.92);
		border-color: var(--color-accent-bright);
		color: var(--color-accent-bright);
	}

	.arrow {
		transition: transform 0.2s ease;
	}

	.btn:hover .arrow {
		transform: translateX(2px);
	}

	.chronicles {
		max-width: 820px;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem 1.5rem;
		margin-bottom: 1.5rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.section-title-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	h2 {
		font-size: 2rem;
		margin: 0;
	}

	.count-pill {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-accent);
		background: var(--color-accent-dim);
		border: 1px solid var(--color-border);
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
	}

	.section-caption {
		margin: 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.posts {
		display: grid;
		gap: 1.25rem;
	}

	.post-card {
		background: linear-gradient(180deg, var(--color-surface) 0%, #131318 100%);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
		transition:
			transform 0.22s ease,
			border-color 0.22s ease,
			box-shadow 0.22s ease,
			background 0.22s ease;
	}

	.post-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-border-strong);
		background: linear-gradient(180deg, var(--color-surface-hover) 0%, #16161c 100%);
		box-shadow:
			0 18px 40px -20px rgba(0, 0, 0, 0.8),
			0 0 0 1px rgba(201, 166, 107, 0.14),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.post-link {
		display: block;
		padding: 1.85rem 2rem;
		color: inherit;
	}

	.post-link:hover {
		color: inherit;
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--color-accent);
		margin-bottom: 0.75rem;
		letter-spacing: 0.02em;
	}

	.post-meta .dot {
		color: var(--color-secondary);
	}

	.post-meta .author {
		color: var(--color-text-muted);
	}

	h3 {
		font-size: clamp(1.55rem, 3vw, 2rem);
		margin-bottom: 0.65rem;
		color: var(--color-primary);
		transition: color 0.2s ease;
	}

	.post-card:hover h3 {
		color: var(--color-accent-bright);
	}

	.post-description {
		margin: 0 0 1.25rem;
		color: var(--color-text-muted);
		font-size: 1rem;
		line-height: 1.6;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.read-more-arrow {
		transition: transform 0.2s ease;
	}

	.post-card:hover .read-more-arrow {
		transform: translateX(4px);
	}

	@media (max-width: 640px) {
		.hero {
			min-height: 320px;
			padding: 2.5rem 1.25rem;
			margin-bottom: 2.5rem;
		}

		.hero-frame {
			inset: 8px;
		}

		.post-link {
			padding: 1.4rem 1.35rem;
		}
	}
</style>
