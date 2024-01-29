<script lang="ts">
	import github from '$lib/assets/github.svg.svelte';
	import logo from '$lib/assets/logo.svg.svelte';
	import npm from '$lib/assets/npm.svg.svelte';
	import play from '$lib/assets/play.svg.svelte';
	import pause from '$lib/assets/pause.svg.svelte';
	import copy from '$lib/assets/copy.svg.svelte';
	import tick from '$lib/assets/tick.svg.svelte';
	import burger from '$lib/assets/burger.svg.svelte';
	import cross from '$lib/assets/cross.svg.svelte';
	import type { SvelteComponent } from 'svelte/legacy';

	const ICON_MAP: Record<string, any> = {
		default: logo,
		github: github,
		npm: npm,
		play: play,
		pause: pause,
		copy: copy,
		tick: tick,
		burger: burger,
		cross: cross
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
