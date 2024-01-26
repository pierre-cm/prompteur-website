export default {
	repository: process.env.PROMPTEUR_REPO,
	git: {
		token: process.env.GH_TOKEN,
		repo: process.env.GH_REPO
	},
	site: `https://${process.env.PROMPTEUR_DOMAIN}`,
	base: process.env.PROMPTEUR_BASE
};
