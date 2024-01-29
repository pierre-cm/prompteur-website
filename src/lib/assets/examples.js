export default {
	example1: {
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut finibus dolor. Vivamus aliquet ac magna eu auctor. Sed vel felis maximus, congue metus quis, elementum sapien. Donec tempor nisi ut est sollicitudin, vitae porta turpis aliquam. Nunc tincidunt egestas urna eget suscipit.',
		code: `const p = new Prompteur({
  elt: document.getElementById("example1"),
  text: 'Lorem ipsum ...',
  speed: 20,
  loop: true
});
p.start();`
	},
	example2: {
		values: ['Great ', 'Fantastic ', 'Wonderful ', 'Outstanding '],
		code: `const VALUES = 
  ['Great', 'Fantastic', 'Wonderful', 'Outstanding'];
const sleep = (n) => new Promise((r) => setTimeout(r, n));

const print = async (n) => {
  let i = n % VALUES.length;
  let s = 0.5;
  let d = s * 1000 + 500;

  const p = new Prompteur({
    elt: document.getElementById("example2"),
    text: VALUES[i],
    speed: VALUES[i].length / s
  });

  p.start();
  await sleep(d + 1000);
  p.render = 'reverse';
  p.start();
  await sleep(d);
  p.stop();
  
  print(i + 1);
};`
	},
	example3: {
		code: `const p = new Prompteur({
  elt: document.getElementById("example3"),
  text: '$ bun init ..',
  speed: 20,
  render: (f, { text }) => {
    const lines = text.split('\\n');
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
        [...lines.slice(0, n), lastL.slice(0, cl + 1)]
        .join('\\n') + (cl === 0 ? ' ' : '') + '▉'
      );
    } else {
      if (lines[n + 1]?.startsWith('$')) p.speed = 40;
      return lines.slice(0, n + 1).join('\\n') + '▉';
    }
  }
});
p.start();`,
		text: `$ bun init
<span style='font-weight:bold'>bun init</span> helps you get started with a minimal project and tries to guess sensible defaults. Press ^C anytime to quit

<span style='color:#1276a1'>package name</span> (test): 
<span style='color:#1276a1'>entry point</span> (index.ts): 

<span style='color:#5c8b09'>Done!</span> A package.json file was saved in the current directory.
  + index.ts
  + tsconfig.json (for editor auto-complete)
  + README.md

To get started, run:
  <span style='color:#1276a1'>bun run index.ts</span>

$ bun add prompteur
<span style='font-weight:bold'>bun add</span> v1.0.25 (a8ff7be6)

  <span style='color:#5c8b09'>installed</span> <span style='font-weight:bold'>prompteur</span>@1.0.6

  <span style='color:#5c8b09'>1</span> package installed [<span style='font-weight:bold'>817.00ms</span>]
$ bun run index.ts 
Hello via Bun!
`
	}
};
