<template>
    <div v-if="data" class="wrapper-portfolio">
        <div class="container">
            <div class="hero-portfolio">
                <h1 class="basic-h1 underlined neptune">
                    <span>{{ data.title }}</span>
                </h1>
                <p v-if="data.subtitle" class="basic-subtitle">{{ data.subtitle }}</p>
            </div>
            <DetailList class="shape-two" :content="data.companies" random overlay />
            <div class="container-see-other-potfolio-companies">
                <LinkTo
                    v-if="data.seeOtherPortfolioCompanies"
                    class="btn-block secondary"
                    :link="data.seeOtherPortfolioCompanies"
                />
            </div>
        </div>
        <div v-if="data.tableEntries.length > 0">
            <Table :content="data" />
        </div>
        <Mosaic :content="data.mosaic" />
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true }
    },
    computed: {},
    head() {
        return {
            htmlAttrs: {
                class: 'lightmode'
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.wrapper-portfolio {
    color: $orbit;
}

.hero-portfolio {
    padding: 20px $gutter 40px;
}

@media (min-width: $desktop-small) {
    .hero-portfolio {
        width: percentage(6/9);
        min-height: 350px;
        padding: 90px #{2 * $gutter} 80px #{$gutter};
    }
}
@media (min-width: $desktop-large) {
    .hero-portfolio {
        width: percentage(4/9);
    }
}

.container-see-other-potfolio-companies {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 40px;
    margin-top: 40px;
}

#see-other-portfolio-companies-link:hover {
    color: $orbit;
}
</style>
