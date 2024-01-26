<script setup>
	import '../app.css';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
	const currentPage = $derived($page.url.pathname);
</script>

<div id="app">
	<header>
		<div class="logo">
			<a href="/"><img src="prompteur.svg" alt="logo" /></a>
		</div>
		<div class="title"><a href="/">Prompteur</a></div>
		<div class="menu">
			<nav>
				<a href="/documentation" class:active={currentPage === `/documentation`}>Documentation</a>
				<a href="/examples" class:active={currentPage === `/examples`}>Examples</a>
				<a href="/try" class:active={currentPage === `/try`}>Try it!</a>
			</nav>
			<div class="social">
				<a href="https://github.com/pierre-cm/prompteur" target="_blank"><Icon name="github" /></a>
				<a href="https://npmjs.com" target="_blank"><Icon name="npm" /></a>
			</div>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	#app {
		display: flex;
		flex-direction: column;
	}
	header {
		position: fixed;
		height: 3rem;
		padding: 0.5rem 1rem 0.5rem 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
		width: calc(100% - 2rem);
		background-color: #fff8;
		backdrop-filter: blur(4px);
		.logo img {
			width: 3rem;
			height: 3rem;
			max-width: 3rem;
			max-height: 3rem;
		}
		.title a {
			text-decoration: none;
			color: var(--text);
			font-size: 1.5rem;
		}
		.menu {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 2rem;
			flex-grow: 1;
			nav {
				display: flex;
				align-items: center;
				gap: 1rem;
				a {
					text-decoration: none;
					color: var(--text);
					&:hover:not(.active) {
						color: var(--primary);
					}
					&.active {
						border-bottom: 1px solid black;
					}
				}
			}
			.social {
				display: flex;
				gap: 0.5rem;
				a {
					color: var(--text);
					width: 1.75rem;
					height: 1.75rem;
					&:hover {
						color: var(--primary);
					}
				}
			}
		}
	}
	main {
		margin-top: 5rem;
		min-height: calc(100vh - 5rem);
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
	}
</style>
