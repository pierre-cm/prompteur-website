import yaml from 'js-yaml';
import { readdirSync, renameSync, existsSync, rmSync } from 'fs';
import { resolve, extname } from 'path';
import config from '../config';

const isGit = extname(config?.repository || '') === '.git';
if (isGit) {
	if (existsSync('.docs')) {
		let proc = Bun.spawn({
			cwd: '.docs',
			cmd: ['git', 'pull'],
			stdout: 'inherit'
		});
		await proc.exited;
	} else {
		console.log('GH_TOKEN found ?', !!config?.git?.token);
		let proc = Bun.spawn({
			cmd: [
				'git',
				'clone',
				'-n',
				'--depth=1',
				'--filter=tree:0',
				config.git.token
					? `https://${config.git.token}@github.com/${config.git.repo}.git`
					: `git@github.com:${config.git.repo}.git`,
				'.docs'
			],
			stdout: 'inherit'
		});
		await proc.exited;
		proc = Bun.spawn({
			cwd: '.docs',
			cmd: ['git', 'sparse-checkout', 'set', '--no-cone', 'README.md'],
			stdout: 'inherit'
		});
		await proc.exited;
		proc = Bun.spawn({
			cwd: '.docs',
			cmd: ['git', 'checkout'],
			stdout: 'inherit'
		});
		await proc.exited;
		readdirSync('.docs/docs').forEach((file) => {
			renameSync(resolve('.docs/docs', file), resolve('.docs', file));
		});
		rmSync('.docs/docs', { recursive: true, force: true });
	}
}
const repoPath = isGit ? '.docs' : `${config?.repository}`;

const sitemapStr = await Bun.file('sitemap.yaml').text();
const sitemap = yaml.load(sitemapStr) as Record<string, string>;

console.log(sitemap);
for (const [src, target] of Object.entries(sitemap)) {
	await Bun.write(target, Bun.file(`${repoPath}/${src}`));
}
