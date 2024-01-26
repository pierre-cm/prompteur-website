<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
</script>

<main>
	<h1>Try it</h1>
	<div class="content"></div>
</main>

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
	.content {
		max-width: 60rem;
	}
</style>
