<template>
    <nuxt-link :to="portfolioLink(company)" :aria-label="company.name" class="company">
        <div class="company-logo">
            <div class="wrapper-logo"><FastImage :image="company.logo" class="logo" contains /></div>
        </div>
        <div class="company-arrow"><Icon name="arrow-diag-light" /></div>
        <div class="company-title">{{ company.title }}</div>
        <div class="company-sector">
            <span class="sector-title">{{ $t('portfolio.sectorTitle') }}</span>
            <span class="sector-content">{{ company.sector }}</span>
        </div>
    </nuxt-link>
</template>

<script>
import { routeByApiModels } from '~/app/crawler/routes';

export default {
    props: {
        company: {
            type: Object,
            required: true
        }
    },
    methods: {
        portfolioLink(detail) {
            if (!detail.slug) return '';
            return this.localePath({
                name: routeByApiModels[detail._modelApiKey].routerFormat,
                params: { slug: detail.slug }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.company {
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 4rem var(--gutter);
    text-decoration: none;
    &::before {
        content: '';
        position: absolute;
        left: var(--gutter);
        right: var(--gutter);
        top: 0;
        border-top: 1px solid currentColor;
    }
    &:last-child {
        &::after {
            content: '';
            position: absolute;
            left: var(--gutter);
            right: var(--gutter);
            bottom: 0;
            border-bottom: 1px solid currentColor;
        }
    }
}
.company-logo {
    flex: 0 0 auto;
    width: calc(100% - 50px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    filter: brightness(0%);
    ::v-deep .image {
        max-width: 12rem;
        max-height: 6rem;
    }
}
.company-arrow {
    .icon {
        width: 1.8rem;
        height: 1.8rem;
    }
}
.company-title {
    flex: 0 0 auto;
    width: 100%;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.1rem;
}
.company-sector {
    display: flex;
    align-items: baseline;
    gap: 2rem;
}
.sector-title {
    font-family: var(--urbanist);
    font-size: 1.4rem;
    line-height: 1.7rem;
    font-weight: 700;
    letter-spacing: 0.03rem;
    text-transform: uppercase;
}
.sector-content {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.1rem;
}

@media (min-width: $desktop-small) {
    .company {
        align-items: center;
        min-height: 12rem;
        padding: 2rem 0;
        gap: 0;
    }
    .company-logo {
        order: 1;
        justify-content: space-between;
        width: calc(3 / 12 * 100%);
        height: 13rem;
        padding: 3rem calc(var(--gutter) + 5rem);
        .wrapper-logo,
        .logo {
            width: 100%;
            height: 100%;
        }
        ::v-deep .image {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .company-title {
        order: 2;
        flex: 0 0 auto;
        width: calc(5 / 12 * 100%);
        padding: 0 var(--gutter);
    }
    .company-sector {
        order: 3;
        flex: 0 0 auto;
        width: calc(3 / 12 * 100%);
        padding: 0 var(--gutter);
        gap: 1rem;
    }
    .company-arrow {
        order: 4;
        flex: 0 0 auto;
        width: calc(1 / 12 * 100%);
        padding: 0 var(--gutter);
        display: flex;
        justify-content: flex-start;
    }
}
</style>
