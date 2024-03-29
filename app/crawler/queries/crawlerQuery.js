export default `
    query Crawler($lang: SiteLocale, $first: IntType, $skip: IntType) {
        allPages(locale: $lang, first: $first, skip: $skip) {
            slug
            _modelApiKey
        }
        allModularPages(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        },
        contact(locale: $lang) {
            slug
            _modelApiKey
        }
        team(locale: $lang) {
            slug
            _modelApiKey
        }
        portfolio(locale: $lang) {
            slug
            _modelApiKey
        }
		portfolioTech(locale: $lang) {
            slug
            _modelApiKey
        }
        investorsPage(locale: $lang) {
            slug
            _modelApiKey
        }
        ring2success(locale: $lang) {
            slug
            _modelApiKey
        }
        sustainableEngagement(locale: $lang) {
            slug
            _modelApiKey
        }
        vision(locale: $lang) {
            slug
            _modelApiKey
        }
        allFunds(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allCompanies(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        },
        useCasesPage(locale: $lang) {
            slug
            _modelApiKey
        },
        podcastsPage(locale: $lang) {
            slug
            _modelApiKey
        },
        pressRoom(locale: $lang) {
            slug
            _modelApiKey
        },
        jobsPage(locale: $lang) {
            slug
            _modelApiKey
        },
		blog(locale: $lang) {
            slug
            _modelApiKey
        },
    }
`;
