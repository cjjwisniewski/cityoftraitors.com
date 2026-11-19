<svelte:head>
	<title>About - City of Traitors</title>
	<link rel="canonical" href="https://cityoftraitors.com/about/" />
	<meta
		name="description"
		content="About City of Traitors, an old-frame Magic: The Gathering blog and home of Seeker."
	/>
	<meta property="og:site_name" content="City of Traitors" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="About - City of Traitors" />
	<meta
		property="og:description"
		content="About City of Traitors, an old-frame Magic: The Gathering blog and home of Seeker."
	/>
	<meta property="og:url" content="https://cityoftraitors.com/about/" />
	<meta property="og:image" content="https://cityoftraitors.com/assets/og-card.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - City of Traitors" />
	<meta
		name="twitter:description"
		content="About City of Traitors, an old-frame Magic: The Gathering blog and home of Seeker."
	/>
	<meta name="twitter:image" content="https://cityoftraitors.com/assets/og-card.jpg" />
</svelte:head>

<div class="about-layout">
	<article class="about-card">
		<span class="eyebrow">Archival Note</span>
		<h1>Welcome to the City of Traitors</h1>

		<div class="prose">
			<p>
				City of Traitors is my personal blog, mostly a place where I can write tournament reports and
				talk about bad decks like the MTGTheSource of old. I'll probably even have about the same
				amount of people reading this stuff!
			</p>
			<p>
				Some of you reading this will be here for that stuff, and the others will be here for
				Seeker &mdash; a cool tool I designed to help track down hard to find Magic cards. If you
				know me, and if you want an invite to it, message me and we'll figure it out.
			</p>
		</div>
	</article>

	<aside class="seeker-card">
		<div class="seeker-header">
			<span class="seeker-mark" aria-hidden="true"></span>
			<h2>Seeker</h2>
		</div>
		<p>
			A dedicated card-hunting tool built to track down hard-to-find Magic: The Gathering singles
			across old-frame and niche printings.
		</p>
		<a
			href="https://seeker.cityoftraitors.com/"
			class="seeker-cta"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span>Launch Seeker</span>
			<span aria-hidden="true">&#8599;</span>
		</a>
	</aside>
</div>

<style>
	.about-layout {
		max-width: 820px;
		margin: 0 auto;
		display: grid;
		gap: 1.5rem;
	}

	.about-card {
		background: linear-gradient(180deg, var(--color-surface) 0%, #121216 100%);
		padding: 2.75rem 3rem;
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		box-shadow:
			0 24px 60px -24px rgba(0, 0, 0, 0.75),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-accent);
		margin-bottom: 0.75rem;
	}

	h1 {
		font-size: clamp(2.1rem, 4.5vw, 3rem);
		margin-bottom: 1.75rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--color-border);
	}

	.prose {
		font-family: var(--font-serif);
		font-size: 1.2rem;
		line-height: 1.78;
		color: var(--color-text);
	}

	.prose p {
		margin-top: 0;
		margin-bottom: 1.4rem;
	}

	.prose p:last-child {
		margin-bottom: 0;
	}

	.seeker-card {
		background: linear-gradient(135deg, rgba(201, 166, 107, 0.08) 0%, var(--color-surface) 65%);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 2rem 2.5rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
	}

	.seeker-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.seeker-mark {
		width: 10px;
		height: 10px;
		transform: rotate(45deg);
		border: 1.5px solid var(--color-accent);
		background: var(--color-accent-dim);
		flex-shrink: 0;
	}

	.seeker-card h2 {
		font-size: 1.75rem;
		margin: 0;
	}

	.seeker-card p {
		margin: 0;
		color: var(--color-text-muted);
		max-width: 60ch;
	}

	.seeker-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		margin-top: 0.35rem;
		padding: 0.65rem 1.2rem;
		border-radius: var(--radius-sm);
		background: var(--color-accent);
		color: #110f0b;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.seeker-cta:hover {
		background: var(--color-accent-bright);
		color: #110f0b;
	}

	@media (max-width: 640px) {
		.about-card {
			padding: 1.75rem 1.35rem;
		}

		.seeker-card {
			padding: 1.5rem 1.35rem;
		}
	}
</style>
