export const siteSeo = {
	name: 'Demonstrength',
	title: 'Demonstrength | Online krachttraining coaching',
	description:
		'Online coaching voor krachttraining met persoonlijke schema’s, techniekfeedback en wekelijkse check-ins.',
	locale: 'nl_NL',
	themeColor: '#000000',
	logoPath: '/images/logo-demonstrength.png',
	socialImagePath: '/images/logo-demonstrength.png'
};

export function buildPageTitle(title?: string) {
	return title ? `${title} | ${siteSeo.name}` : siteSeo.title;
}
