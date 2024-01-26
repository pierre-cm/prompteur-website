<script lang="ts">
	import github from '$lib/assets/github.svg.svelte';
	import logo from '$lib/assets/logo.svg.svelte';
	import npm from '$lib/assets/npm.svg.svelte';
	import type { SvelteComponent } from 'svelte/legacy';

	const ICON_MAP: Record<string, any> = {
		default: logo,
		github: github,
		npm: npm
	};

	const {
		name,
		width = '1.75rem',
		height = '1.75rem'
	} = $props<{ name: string; width?: string; height?: string }>();

	let icon = $state<typeof SvelteComponent>();

	$effect(() => {
		icon = ICON_MAP[name in ICON_MAP ? name : 'default'];
	});
</script>

{#if icon}
	<svelte:component this={icon} {width} {height} />
{/if}

<style>
	:global(svg) {
		/* width: 1.75rem;
		height: 1.75rem; */
		pointer-events: none;
	}
</style>
