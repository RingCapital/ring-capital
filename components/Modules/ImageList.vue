<template>
    <div class="image-list-wrapper">
        <div class="container">
            <div v-if="content.title || content.subtitle" class="content-pad">
                <div class="title-wrapper">
                    <h2 v-if="content.title" class="basic-h2 text-title">{{ content.title }}</h2>
                    <h3 v-if="content.subtitle" class="basic-h3 text-subtitle">{{ content.subtitle }}</h3>
                </div>
            </div>
            <div class="items">
                <div v-for="item in content.items" :key="item.id" class="item content-pad">
                    <div v-if="!item.link" class="item-inner">
                        <FastImage v-if="item.image" class="item-img" :image="item.image" cover />
                        <div class="item-info">
                            <div v-if="item.title" class="basic-subtitle item-title">{{ item.title }}</div>
                            <div v-if="item.text" class="item-text wysiwyg" v-html="item.text"></div>
                        </div>
                    </div>
                    <LinkTo v-else :link="item.link" class="item-inner" hide-label>
                        <FastImage v-if="item.image" class="item-img" :image="item.image" cover />
                        <div class="item-info">
                            <div v-if="item.title" class="basic-subtitle item-title">{{ item.title }}</div>
                            <div v-if="item.text" class="item-text wysiwyg" v-html="item.text"></div>
                        </div>
                    </LinkTo>
                </div>
            </div>
            <div v-if="content.link" class="content-pad wrapper-cta">
                <LinkTo v-if="content.link.__typename === 'LinkRecord'" class="btn-rounded" :link="content.link" />
                <LinkToFile
                    v-else-if="content.link.__typename === 'LinkFileRecord'"
                    class="btn-rounded"
                    :link="content.link"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.image-list-wrapper {
    padding-top: 5rem;
    padding-bottom: 5rem;
}

.title-wrapper {
    margin-bottom: 6rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--txt);
    .text-title,
    .text-subtitle {
        &:not(:last-child) {
            margin-bottom: 2rem;
        }
    }
}

.items {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

.item {
    width: 100%;
    margin-bottom: 6rem;
    &:last-child {
        margin-bottom: 0;
    }
}

.item-inner {
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    text-align: left;
}

.item-img {
    width: 50%;
    flex: 0 0 50%;
    aspect-ratio: 1;
    border: 1px solid var(--txt);
    margin-right: calc(var(--gutter) * 2);
}

.item-text {
    line-height: 2.1rem;
}

.item-title + .item-text {
    margin-top: 1rem;
}
.wrapper-cta {
    margin-top: 4rem;
}

@media (min-width: $tablet) {
    .item {
        width: 50%;
    }
}

@media (min-width: $desktop) {
    .image-list-wrapper {
        position: relative;
        padding-top: 7.5rem;
        padding-bottom: 7.5rem;
    }
    .item {
        width: 33.33%;
    }
    .item-img {
        margin-right: 2rem;
    }
}
</style>
