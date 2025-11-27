<script>
	import "../app.css";
</script>

<div class="app-container">
	<header>
		<div class="header-content">
			<a href="/" class="brand">City of Traitors</a>
			<nav>
				<a href="https://seeker.cityoftraitors.com/">Seeker</a>
				<a href="/about">About</a>
			</nav>
		</div>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<div class="footer-content">
			<p>
				&copy; {new Date().getFullYear()} City of Traitors. All rights reserved.
			</p>
			<p class="disclaimer">
				Magic: The Gathering is a trademark of Wizards of the Coast.
				This site is not affiliated with Wizards of the Coast.
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

	header {
		background: linear-gradient(to bottom, #2a2a2a, #1e1e1e);
		border-bottom: 3px solid var(--color-secondary);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand {
		font-family: var(--font-header);
		font-size: 2rem;
		color: var(--color-primary);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	}

	nav a {
		margin-left: 2rem;
		font-family: var(--font-header);
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		box-sizing: border-box;
	}

	footer {
		background: #151515;
		border-top: 1px solid #333;
		padding: 2rem 0;
		margin-top: auto;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		text-align: center;
		color: var(--color-secondary);
	}

	.disclaimer {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		opacity: 0.7;
	}

	@media (max-width: 600px) {
		.header-content {
			flex-direction: column;
			gap: 1rem;
		}

		nav a {
			margin: 0 1rem;
		}
	}
</style>
