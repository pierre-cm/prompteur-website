<script setup lang="ts">
	import { Prompteur } from 'prompteur';
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import shell from 'highlight.js/lib/languages/shell';
	import bash from 'highlight.js/lib/languages/bash';
	import examples from '$lib/assets/examples';
	import rick from '$lib/assets/rick.txt?raw';
	import Code from '$lib/components/Code.svelte';

	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('shell', shell);
	hljs.registerLanguage('bash', bash);

	const sleep = (n: number) => new Promise((r) => setTimeout(r, n));

	// Example 1
	let ex1_elt = $state();
	let ex1_text = examples.example1.text;
	const ex1_code = examples.example1.code;
	const ex1_start = () => {
		const p = new Prompteur({
			elt: ex1_elt as Element,
			text: ex1_text,
			speed: 20,
			loop: true
		});
		p.start();
	};

	// Example 2
	let ex2_elt = $state();
	let ex2_cursor = $state('|');
	const ex2_code = examples.example2.code;
	const ex2_values = examples.example2.values;
	const ex2_start = async (n: number) => {
		let i = n % ex2_values.length;
		let s = 0.5;
		let d = s * 1000 + 500;
		const p = new Prompteur({
			elt: ex2_elt as Element,
			text: ex2_values[i],
			speed: ex2_values[i].length / s
		});
		p.start();
		await sleep(d + 1000);
		p.render = 'reverse';
		p.start();
		await sleep(d);
		p.stop();
		ex2_start(i + 1);
	};

	// Example 3
	let ex3_elt = $state();
	let ex3_text = examples.example3.text;
	const ex3_code = examples.example3.code;
	const ex3_start = () => {
		const p = new Prompteur({
			elt: ex3_elt as Element,
			text: ex3_text,
			speed: 20,
			render: (f, { text }) => {
				const lines = text.split('\n');
				const linesCmd = lines.map((l) => l.startsWith('$'));
				const n = Math.floor(f / (1 / lines.length)) - 1;
				if (linesCmd[n]) {
					p.speed = 20;
					let lastL = lines[n];
					let nb = (f % (1 / lines.length)) * lines.length;
					let cl = Math.floor(nb * lastL.length);
					if (cl === 0 && n > 0) {
						p.pause();
						setTimeout(() => p.start(), 1000);
					} else if (cl === lastL.length - 1) {
						p.pause();
						p.speed = 200;
						setTimeout(() => p.start(), 500);
					}
					return (
						[...lines.slice(0, n), lastL.slice(0, cl + 1)] //
							.join('\n') +
						(cl === 0 ? ' ' : '') +
						'▉'
					);
				} else {
					if (lines[n + 1]?.startsWith('$')) p.speed = 40;
					return lines.slice(0, n + 1).join('\n') + '▉';
				}
			}
		});
		p.start();
		setInterval(() => {
			p.start();
		}, 20000);
	};

	// Ascii meme
	let ex4_elt = $state();
	const ex4_text = rick;
	const ex4_start = () => {
		const p = new Prompteur({
			elt: ex4_elt as Element,
			text: ex4_text,
			speed: 500
		});
		p.start();
		setInterval(() => p.start(), 6000);
	};

	onMount(() => {
		// Example 1
		ex1_start();
		// Example 2
		ex2_start(0);
		setInterval(() => {
			ex2_cursor = ex2_cursor === '' ? '|' : '';
		}, 800);
		// Example 3
		ex3_start();
		// Ascii Logo
		ex4_start();
	});
</script>

<div class="page">
	<h1>Examples</h1>
	<div class="content">
		<!-- Example 1 -->
		<div class="example ex1">
			<div class="left">
				<h1>Basic example</h1>
				<p bind:this={ex1_elt}></p>
			</div>
			<div class="right"><Code content={ex1_code} lang="javascript" /></div>
		</div>
		<!-- Example 2 -->
		<div class="example">
			<div class="left">
				<h1>Typewriter effect</h1>
				<h2>This app is <span class="ex2" bind:this={ex2_elt} /><span>{ex2_cursor}</span></h2>
			</div>
			<div class="right"><Code content={ex2_code} lang="javascript" /></div>
		</div>
		<!-- Example 3 -->
		<div class="example">
			<div class="left">
				<h1>Terminal output</h1>
				<div class="terminal">
					<div class="bar">
						<div class="btn red" />
						<div class="btn yellow" />
						<div class="btn green" />
					</div>
					<pre class="terminal" bind:this={ex3_elt}></pre>
				</div>
			</div>
			<div class="right"><Code content={ex3_code} lang="javascript" /></div>
		</div>
		<!-- Meme -->
		<div class="meme"><pre class="asciiImg" bind:this={ex4_elt}></pre></div>
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
		flex-direction: column;
		max-width: 60rem;
		padding-top: 2rem;
		flex-wrap: wrap;
		gap: 2rem;
		.example {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;
			.left {
				width: 24rem;
				max-width: 30rem;
				h1 {
					text-decoration: underline;
				}
				min-width: 20rem;
			}
		}
	}
	.ex1 {
		p {
			min-height: 9rem;
		}
	}
	.ex2 {
		background: -webkit-linear-gradient(#00d1b2, #6a73c5);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.right {
		font-size: 0.9rem;
		margin: 0;
		max-width: calc(100vw - 4rem);
	}
	.terminal {
		overflow: hidden;
		min-height: 31rem;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		.bar {
			height: 1.55rem;
			border-top-left-radius: 1rem;
			border-top-right-radius: 1rem;
			background-color: #d6d6d6;
			display: flex;
			gap: 0.5rem;
			align-items: center;
			padding-left: 1rem;
			.btn {
				width: 0.75rem;
				height: 0.75rem;
				border-radius: 100%;
				&.red {
					background-color: var(--danger);
				}
				&.yellow {
					background-color: var(--warning);
				}
				&.green {
					background-color: var(--success);
				}
			}
		}
		pre {
			overflow-x: scroll;
			color: var(--light);
			background-color: #303235;
			margin: 0;
			padding: 0.5rem;
		}
	}
	.meme {
		display: flex;
		justify-content: center;
		.asciiImg {
			background-color: transparent;
			font-size: 0.66rem;
			line-height: 0.75rem;
			max-width: calc(100vw - 4rem);
			min-height: 23.5rem;
			color: var(--text);
		}
	}
	@media (min-width: 66rem) {
		.example {
			flex-direction: row !important;
		}
	}
</style>
