<template>
    <div>
        <component :is="template" v-if="template" :data="data" />
        <Overlay />
    </div>
</template>

<script>
import { camalize, pascalize } from '@stereorepo/sac';
import { forEach } from '@stereorepo/sac/src/core';
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';

import slugToModelApiKey from '~/api/dato/helpers/slugToModelApiKey.json';
import { getQuery } from '~/api/dato';
import handleSeo from '~/assets/js/seo';
import { routeByApiModels } from '~/app/crawler/routes';

import Page from '~/components/Templates/Page';
import ModularPage from '~/components/Templates/ModularPage';
import Contact from '~/components/Templates/Contact';
import Team from '~/components/Templates/Team';
import Portfolio from '~/components/Templates/Portfolio';
import InvestorsPage from '~/components/Templates/InvestorsPage';
import Fund from '~/components/Templates/Fund';
import UseCasesPage from '~/components/Templates/UseCasesPage';
import PodcastsPage from '~/components/Templates/PodcastsPage';
import PressRoom from '~/components/Templates/PressRoom';
import SustainableEngagement from '~/components/Templates/SustainableEngagement';
import Ring2success from '~/components/Templates/Ring2success';
import Vision from '~/components/Templates/Vision';
import JobsPage from '~/components/Templates/JobsPage';
import PortfolioTech from '~/components/Templates/PortfolioTech';
import Blog from '~/components/Templates/Blog';

export default {
    components: {
        Page,
        ModularPage,
        Contact,
        Team,
        Portfolio,
        InvestorsPage,
        Fund,
        UseCasesPage,
        PodcastsPage,
        PressRoom,
        SustainableEngagement,
        Ring2success,
        Vision,
        JobsPage,
        PortfolioTech,
        Blog
    },
    layout(context) {
        const layoutLang = getIso.call(context);
        const layoutSlug = getSlug.call(context);
        const layoutTemplate = slugToModelApiKey[layoutLang][layoutSlug];

        if (layoutTemplate === 'contact') {
            return 'minimal';
        }
    },
    async asyncData(context) {
        const { $dato, error, route, $axios } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        // Getting the slug
        const slug = getSlug.call(context);

        // Ici ton _modelApiKey
        finalData.template = slugToModelApiKey[lang][slug];

        try {
            const { data } = await $dato
                .post('/', { query: getQuery(finalData.template), variables: { lang, slug } })
                .then(({ data }) => data);

            finalData.data = data[camalize(finalData.template)];
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
            finalData.template = pascalize(finalData.template);
        } catch (e) {
            return error({ statusCode: 404, message: e });
        }

        if (finalData.template === 'Landing') {
            finalData.data.newsCaseStudies = finalData.data.newsCaseStudies.map(
                ({ slug, _modelApiKey, ...postProps }) => ({
                    _modelApiKey,
                    ...postProps,
                    url: context.app.localePath({
                        name: routeByApiModels[_modelApiKey].routerFormat,
                        params: { post: slug }
                    })
                })
            );
        }

        if (finalData.template === 'JobsPage') {
            if (finalData.data.companies.length) {
                const promises = finalData.data.companies.map(({ wttjId }) => {
                    return $axios.$get('https://www.welcomekit.co/api/v1/embed?organization_reference=' + wttjId);
                });
                const wttjCompanies = await Promise.all(promises);
                const jobs = wttjCompanies.reduce((acc, company, index) => {
                    if (!company.jobs.length) return acc;

                    company.jobs.forEach(job => {
                        acc.push({
                            logo: finalData.data.companies[index].logo,
                            image: finalData.data.companies[index].image,
                            companyName: company.name,
                            ...job
                        });
                    });
                    return acc;
                }, []);

                finalData.data.jobs = jobs;
            }
        }

        // Getting raw slugs for the current page from Dato
        const datoLocales = finalData.data._allSlugLocales;
        await setRouteParams.call(context, datoLocales);

        return finalData;
    },
    data: () => ({
        data: {},
        seo: {}
    }),
    head() {
        if (!this.seo.title) this.seo.title = 'Ring Capital • ' + this.data.title;

        return {
            ...this.seo
        };
    }
};
</script>
