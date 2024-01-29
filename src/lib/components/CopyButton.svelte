<script lang="ts">
	import Icon from './Icon.svelte';

	let { text = '' } = $props();
	let icon = $state('copy');

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (e) {
			console.error(e);
		}
		icon = 'tick';
		setTimeout(() => {
			icon = 'copy';
		}, 1000);
	};
</script>

<button class="copy" class:green={icon === 'tick'} on:click={copy}>
	<Icon name={icon} width="1.33rem" height="1.33rem" />
</button>

<style lang="scss">
	.copy {
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		border-radius: 0.5rem;
		background-color: transparent;
		color: white;
		// position: absolute;
		// top: 0.75rem;
		// right: 0.75rem;
		&:hover {
			color: var(--primary);
		}
		&.green {
			color: var(--success);
		}
	}
</style>
