<template>
    <div class="wrapper-ecosystem container content-pad">
        <h2 class="ecosystem-title basic-h1">{{ data.ecosystemTitle }}</h2>
        <div class="ecosystem-intro intro-mobile basic-txt" v-html="data.ecosystemIntro"></div>
        <div class="ecosystem">
            <component
                :is="getTagName(tile)"
                v-for="tile in data.ecosystemMosaic"
                :key="tile.id"
                :data="tile"
                class="tile"
            />
            <div class="tile ecosystem-intro intro-desktop basic-txt" v-html="data.ecosystemIntro"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        isDesktop() {
            if (!this.$store.state.superWindow) return true;
            return this.$store.state.superWindow.width >= this.$breakpoints.list.l;
        }
    },
    methods: {
        getTagName(tile) {
            if (tile._modelApiKey === 'ecosystem_quote_tile') {
                return 'HomeTileQuote';
            } else if (tile._modelApiKey === 'ecosystem_logo_tile') {
                return 'HomeTileLogo';
            } else if (tile._modelApiKey === 'ecosystem_image_tile') {
                return 'HomeTileImage';
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.wrapper-ecosystem {
    margin: 10rem 0;
}
.ecosystem-title {
    text-align: center;
    margin-bottom: 4rem;
}
.ecosystem {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr) auto 1fr;
    margin: 4rem 0 0;
}
.tile {
    border: 1px solid var(--txt);
    overflow: hidden;
    transform: translateY(calc(50px * var(--scroll-appear)));
    opacity: calc(1 - var(--scroll-appear));
    &:nth-child(1) {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
    }
    &:nth-child(2) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        aspect-ratio: 1 / 0.75;
    }
    &:nth-child(3) {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
    &:nth-child(4) {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }
    &:nth-child(5) {
        grid-column: 1 / 2;
        grid-row: 4 / 5;
    }
    &:nth-child(6) {
        grid-column: 2 / 3;
        grid-row: 3 / 5;
    }
    &:nth-child(7) {
        grid-column: 1 / 3;
        grid-row: 5 / 6;
    }
    &:nth-child(8) {
        grid-column: 1 / 2;
        grid-row: 6 / 7;
    }
    &:nth-child(9) {
        grid-column: 2 / 3;
        grid-row: 6 / 7;
    }
}

.intro-desktop {
    display: none;
}

@media (min-width: $tablet) {
    .tile {
        &:nth-child(2) {
            aspect-ratio: 1 / 0.6;
        }
    }
}
@media (min-width: $desktop-small) {
    .intro-desktop {
        display: block;
    }
    .ecosystem-title {
        margin-bottom: 0;
    }
    .intro-mobile {
        display: none;
    }
    .ecosystem {
        grid-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        max-width: 100%;
        margin-top: 6rem;
    }
    .tile {
        &:nth-child(1) {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }
        &:nth-child(2) {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            aspect-ratio: auto;
        }
        &:nth-child(3) {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
        }
        &:nth-child(4) {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
        }
        &:nth-child(5) {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
        }
        &:nth-child(6) {
            grid-column: 4 / 5;
            grid-row: 2 / 4;
        }
        &:nth-child(7) {
            grid-column: 2 / 4;
            grid-row: 3 / 4;
        }
        &:nth-child(8) {
            grid-column: 4 / 5;
            grid-row: 4 / 5;
        }
        &:nth-child(9) {
            grid-column: 3 / 4;
            grid-row: 4 / 5;
        }
        &:nth-child(10) {
            border: 0;
            align-self: center;
            grid-column: 3 / 5;
            grid-row: 1 / 2;
        }
    }
}
</style>
