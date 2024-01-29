<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import md from '$lib/assets/imported/home.md?raw';
</script>

<div class="page">
	<h1>Documentation</h1>
	<div class="content">
		<Markdown input={md} />
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0rem 2rem 0rem 2rem;
		& > h1 {
			border: 1px solid var(--text);
			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 0.5rem;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		max-width: 60rem;
	}
</style>
