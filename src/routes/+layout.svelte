<script setup>
	import '../app.css';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
	import { PUBLIC_BASE } from '$env/static/public';

	let innerWidth = $state();
	let menuOpen = $state(false);
	const currentPage = $derived($page.url.pathname.replace(new RegExp(`^${PUBLIC_BASE}`), ''));
	const triggerMenu = () => (menuOpen = !menuOpen);

	$effect(() => {
		menuOpen = innerWidth > 1024;
	});
</script>

<svelte:window bind:innerWidth />

<div id="app">
	<header>
		<div class="logo">
			<a href={PUBLIC_BASE}><img src="prompteur.svg" alt="logo" /></a>
		</div>
		<div class="title"><a href={PUBLIC_BASE}>Prompteur</a></div>
		<div class="menu" class:open={menuOpen}>
			<button class="burger" on:click={triggerMenu}>
				<Icon name={menuOpen ? 'cross' : 'burger'} />
			</button>
			<nav>
				<a href="documentation" class:active={currentPage === `/documentation`}>Documentation</a>
				<a href="examples" class:active={currentPage === `/examples`}>Examples</a>
				<a href="try" class:active={currentPage === `/try`}>Try it!</a>
			</nav>
			<div class="social">
				<a href="https://github.com/pierre-cm/prompteur" target="_blank"><Icon name="github" /></a>
				<a href="https://www.npmjs.com/package/prompteur" class="npm" target="_blank"
					><Icon name="npm" /></a
				>
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
		flex-wrap: wrap;
		z-index: 10;
		padding: 0.5rem 1rem 0.5rem 1rem;
		display: flex;
		gap: 0;
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
		.burger {
			position: absolute;
			top: 1rem;
			right: 1rem;
			display: flex;
			background: transparent;
			border: none;
			&:hover {
				cursor: pointer;
			}
		}
		.menu {
			display: flex;
			width: 100%;
			flex-direction: column;
			overflow: hidden;
			align-items: center;
			justify-content: flex-end;
			gap: 2rem;
			flex-grow: 1;
			&:not(.open) {
				max-height: 0;
			}
			nav {
				display: flex;
				flex-direction: column;
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
				.npm {
					color: #c12127;
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
	@media (min-width: 1024px) {
		header {
			flex-direction: row;
			gap: 1rem;
			.menu {
				width: fit-content;
				flex-direction: row;
				nav {
					flex-direction: row;
				}
				.burger {
					display: none;
				}
			}
		}
		main {
			padding-bottom: 0;
		}
	}
</style>
