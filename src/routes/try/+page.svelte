<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Code from '$lib/components/Code.svelte';
	import { Prompteur } from 'prompteur';
	import { onMount } from 'svelte';

	let p: Prompteur | undefined = $state();
	let elt = $state();
	let text = $state('Hello <span style="color:magenta">Mom</span>!');
	let speed = $state(15);
	let loop = $state(true);
	let render = $state('html' as const);
	let animState = $state('play');
	let code = $state(`const prompteur = new Prompteur({
  elt: document.getElementById('prompteur'),
	text: 'Your text',
	speed: ${speed},
	loop: ${loop},
	render: '${render}'
});`);

	const triggerPlay = () => {
		animState = animState === 'pause' ? 'play' : 'pause';
		if (animState === 'pause') p?.pause();
		if (animState === 'play') p?.start();
	};

	$effect(() => {
		if (p) {
			p.stop();
			p.text = text;
			p.speed = speed;
			p.loop = loop;
			p.render = render;
			p.start();
			code = `const prompteur = new Prompteur({
	elt: document.getElementById('prompteur'),
	text: 'Your text',
	speed: ${speed},
	loop: ${loop},
	render: '${render}'
});`;
		}
	});

	onMount(() => {
		p = new Prompteur({
			elt: elt as Element,
			text: text,
			speed: speed,
			loop: loop,
			render: render
		});
		p.on('start', () => {
			animState = 'play';
		});
		p.on('stop', () => {
			animState = 'pause';
		});
		p.start();
	});
</script>

<div class="page">
	<h1>Try it</h1>
	<div class="content">
		<div class="playbox">
			<div class="left">
				<div class="input col">
					<label for="text">text</label>
					<textarea id="text" bind:value={text} />
				</div>
				<div class="input">
					<label for="speed">speed</label>
					<input type="number" id="speed" bind:value={speed} />
				</div>
				<div class="input">
					<label for="loop">loop</label>
					<input type="checkbox" id="loop" bind:checked={loop} />
				</div>
				<div class="input">
					<label for="render">render</label>
					<select id="render" bind:value={render}>
						<option value="default">default</option>
						<option value="reverse">reverse</option>
						<option value="line">line</option>
						<option value="html">html</option>
					</select>
				</div>
			</div>
			<div class="right">
				<pre bind:this={elt} />
				<button
					class="playButton"
					on:click={triggerPlay}
					title={animState === 'play' ? 'pause' : 'play'}
				>
					<Icon name={animState === 'play' ? 'pause' : 'play'} width="1.5rem" height="1.5rem" />
				</button>
			</div>
		</div>
		<div class="code">
			<Code content={code} lang="javascript" />
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0rem 2rem 0rem 2rem;
		gap: 2rem;
		& > h1 {
			border: 1px solid var(--text);
			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 0.5rem;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		max-width: calc(100vw - 2rem);
		.playbox {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.left {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				.input {
					display: flex;
					gap: 1rem;
					&.col {
						flex-direction: column;
						gap: 0.5rem;
					}
					label {
						font-weight: bold;
						min-width: 6ch;
					}
					textarea {
						resize: none;
						height: 7rem;
						border-color: var(--border);
						border-radius: 1rem;
						padding: 0.75rem;
					}
					input,
					select {
						font-size: 1rem;
						border: 1px solid var(--border);
						border-radius: 0.5rem;
						padding: 0.25rem 0.5rem 0.25rem 0.5rem;
						&[type='checkbox'] {
							border-radius: 0.25rem;
						}
					}
				}
			}
			.right {
				position: relative;
				pre {
					padding: 1rem;
					border-radius: 1rem;
					min-height: 14rem;
					max-height: 14rem;
					overflow: auto;
					background-color: #fff8ee;
					border: 1px solid var(--border);
					color: var(--text);
				}
				.playButton {
					border: none;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 0.25rem;
					background-color: var(--primary);
					border-radius: 50%;
					color: white;
					position: absolute;
					top: 1.5rem;
					right: 0.75rem;
				}
			}
		}
		@media (min-width: 66rem) {
			.content {
				max-width: 60rem;
			}
			.left {
				min-width: 28rem;
			}
			.right {
				min-width: 30rem;
			}
			.playbox {
				flex-direction: row !important;
			}
		}
	}
</style>
