<template>
    <div v-if="data" class="wrapper-page">
        <div class="container">
            <div class="container-small wysiwyg content-pad">
                <h1 class="underlined">
                    <span>{{ data.title }}</span>
                </h1>
                <div v-if="data.content" v-html="data.content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true }
    },
    head() {
        return {
            htmlAttrs: {
                class: this.data.whiteBackground ? 'lightmode' : ''
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.wrapper-page {
    padding: 10px 0 60px;
}

@media (min-width: $desktop-small) {
    .wrapper-page {
        padding: 70px 0 110px;
    }
}
</style>
