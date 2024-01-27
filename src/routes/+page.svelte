<script lang="ts">
	import { Prompteur } from 'prompteur';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import shell from 'highlight.js/lib/languages/shell';
	import bash from 'highlight.js/lib/languages/bash';
	import Icon from '$lib/components/Icon.svelte';

	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('shell', shell);
	hljs.registerLanguage('bash', bash);

	const text = `import { Prompteur } from "prompteur"

const prompteur = new Prompteur({
  elt: document.getElementById("elementId"),
  text: "Hello Mom!",
  speed: 2,
})

prompteur.start()
`;

	let elt = $state();
	let prompteur;

	$effect(() => {
		const highlightedCode = hljs?.highlight(text, { language: 'js' })?.value;
		prompteur = new Prompteur({
			text: highlightedCode ?? text,
			speed: 100,
			elt: elt as Element,
			render: 'html'
		});
		prompteur.start();
	});
</script>

<div class="hero">
	<div class="description">
		<div class="header">
			<Icon name="logo" width="7rem" height="7rem" />
			<h1>Prompteur</h1>
		</div>
		<p>
			A sleek library for easily animating text on your HTML pages, bringing dynamic and engaging
			content to life with minimal effort.
		</p>
		<div class="buttons">
			<a class="button primary" href="documentation">Get started</a>
			<a class="button bordered" href="try">Try it!</a>
		</div>
	</div>
	<div class="preview">
		<pre bind:this={elt}></pre>
	</div>
</div>

<style lang="scss">
	.hero {
		display: flex;
		padding-top: 3rem;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		.description {
			// width: 50%;
			padding: 0rem 1rem 0rem 1rem;
			.header {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				h1 {
					margin: 0;
					font-size: 3rem;
				}
			}
			.buttons {
				display: flex;
				justify-content: center;
				gap: 0.5rem;
				a.button {
					text-decoration: none;
					&.primary:hover {
						text-decoration: none;
						background-color: var(--primary-dark);
					}
					&.bordered:hover {
						text-decoration: none;
						color: var(--text);
					}
				}
			}
		}
		.preview {
			pre {
				font-size: 0.9rem;
				line-height: 1.5rem;
				margin: 0;
				min-width: 23.75rem;
				height: 13.25rem;
				background-color: #303235;
				color: #ebebeb;
				border-radius: 1rem;
				padding: 1rem;
			}
		}
	}
	@media (min-width: 40rem) {
		.hero {
			padding-top: 10rem;
			.description {
				max-width: 30rem;
			}
			.preview {
				pre {
					font-size: 1.25rem;
					min-width: 33.5rem;
				}
			}
		}
	}
</style>
