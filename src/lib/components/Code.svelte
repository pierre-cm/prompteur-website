<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import shell from 'highlight.js/lib/languages/shell';
	import bash from 'highlight.js/lib/languages/bash';
	import Icon from './Icon.svelte';
	import CopyButton from './CopyButton.svelte';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('shell', shell);
	hljs.registerLanguage('bash', bash);

	let { content = '', lang = '', copiable = true } = $props();
	let lineBylineCopy = lang === 'bash' || lang === 'shell';
	let icon = $state('copy');
	let highlightedContent = $derived(
		lang ? hljs?.highlight(content, { language: lang })?.value : content
	);
	let shellCommands = content.split('\n');
	let copiedElt = $state();

	const copy = async (event: PointerEvent, text: string) => {
		console.log(event.target);

		try {
			await navigator.clipboard.writeText(text);
		} catch (e) {
			console.error(e);
		}
		copiedElt = event.target;
		icon = 'tick';
		setTimeout(() => {
			icon = 'copy';
		}, 1000);
	};
</script>

<div class="code">
	{#if lineBylineCopy}
		<div class="shell-pre">
			{#each shellCommands as line}
				<div class="line">
					{#if line.startsWith('#')}
						<pre>{@html hljs?.highlight(line, { language: lang })?.value}</pre>
					{:else}
						<pre class="command">{@html hljs?.highlight(line, { language: lang })?.value}</pre>
						<CopyButton text={line} />
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<pre>{@html highlightedContent}</pre>
		{#if copiable}
			<div class="copy"><CopyButton text={content} /></div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.code {
		position: relative;
		margin-top: 0.5rem;
		pre {
			margin: 0;
			tab-size: 2;
			background-color: #303235;
			color: #ebebeb;
			border-radius: 1rem;
			padding: 1rem;
			overflow: auto;
			min-width: 0px;
		}
		.copy {
			position: absolute;
			top: 0.75rem;
			right: 0.75rem;
		}
		.shell-pre {
			.line {
				position: relative;
				display: flex;
				padding: 0 1rem 0 1rem;
				background-color: #303235;
				align-items: center;
				pre {
					padding: 0;
					border-radius: 0;
					flex-grow: 1;
					&.command {
						&::before {
							content: '$ ';
						}
					}
				}
			}
			.line:first-child {
				padding-top: 1rem;
				border-top-left-radius: 1rem;
				border-top-right-radius: 1rem;
			}
			.line:last-child {
				padding-bottom: 1rem;
				border-bottom-left-radius: 1rem;
				border-bottom-right-radius: 1rem;
			}
		}
	}
</style>
