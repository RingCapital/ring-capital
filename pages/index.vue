<template>
    <div>
        <HomeHero :data="data" />

        <HomeVision :data="data" />
        <HomeCollectiveIntelligence :data="data" />

        <News :title="data.newsTitle" :content="data.news" />
        <Overlay />
    </div>
</template>

<script>
import { getIso } from '~/api/dato/helpers';
import { homeQuery } from '~/api/dato';
import handleSeo from '~/assets/js/seo';

export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const {
                data: { home: homeData }
            } = await $dato.post('/', { query: homeQuery, variables: { lang } }).then(({ data }) => data);

            finalData.data = homeData;

            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
        } catch (e) {
            return error({ statusCode: 404, message: e });
        }

        return finalData;
    },
    data() {
        return {
            data: {},
            seo: {}
        };
    },

    watch: {},
    beforeCreate() {},
    beforeDestroy() {},
    methods: {},
    head() {
        if (!this.seo.title) this.seo.title = 'Ring Capital • ' + this.data.title;

        return {
            ...this.seo
        };
    }
};
</script>

<style lang="scss" scoped>
.intro {
    margin-top: 55px;
    padding: 0 $gutter;
}
</style>
