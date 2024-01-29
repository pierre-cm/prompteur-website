import yaml from 'js-yaml';
import { existsSync } from 'fs';
import { extname } from 'path';
import config from '../config';
import { $, BunFile } from 'bun';

const isGit = extname(config?.repository || '') === '.git';
if (isGit) {
	if (existsSync('.docs')) {
		await $`cd .docs && git pull`;
	} else {
		const repoUrl = config.git.token
			? `https://${config.git.token}@github.com/${config.git.repo}.git`
			: `https://github.com/${config.git.repo}.git`;
		await $`git clone -n --depth=1 --filter=tree:0 ${repoUrl} .docs`;
		await $`cd .docs && git sparse-checkout set --no-cone README.md`;
		await $`cd .docs && git checkout`;
	}
}
const repoPath = isGit ? '.docs' : `${config?.repository}`;

const sitemapStr = await Bun.file('sitemap.yaml').text();
const sitemap = yaml.load(sitemapStr) as Record<string, any>;

for (const [src, doc] of Object.entries(sitemap)) {
	let target: BunFile | string = Bun.file(`${repoPath}/${src}`);
	if (doc?.start) {
		let content = await target.text();
		target = content.slice(content.indexOf(doc.start));
	}
	await Bun.write(doc.target, target);
}

export {};
