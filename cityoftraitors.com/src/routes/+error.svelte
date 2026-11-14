<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - City of Traitors</title>
</svelte:head>

<section class="error-card">
	<span class="status-code">{$page.status}</span>
	<h1>Land Sacrificed</h1>
	<p class="flavor">
		&ldquo;When you play another land, sacrifice City of Traitors.&rdquo;
	</p>
	<p class="message">
		{$page.error?.message || 'The chronicle or path you are looking for could not be found.'}
	</p>
	<a href="/" class="home-link">&larr; Return to Chronicles</a>
</section>

<style>
	.error-card {
		max-width: 620px;
		margin: 3rem auto;
		padding: 3rem 2rem;
		text-align: center;
		background: linear-gradient(180deg, var(--color-surface) 0%, #121216 100%);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.status-code {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-accent);
		background: var(--color-accent-dim);
		border: 1px solid var(--color-border);
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.6rem;
		margin-bottom: 0.75rem;
	}

	.flavor {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--color-accent-bright);
		margin-bottom: 1rem;
	}

	.message {
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}

	.home-link {
		display: inline-block;
		padding: 0.65rem 1.25rem;
		border-radius: var(--radius-sm);
		background: var(--color-accent);
		color: #110f0b;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.home-link:hover {
		background: var(--color-accent-bright);
		color: #110f0b;
	}
</style>
