<template>
    <ul v-if="content" class="social">
        <li v-for="link in content.socialLinks" :key="link.title">
            <a
                class="social-link"
                :class="link.iconName"
                :href="link.link"
                :aria-label="link.title"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon :name="link.iconName" />
            </a>
        </li>
    </ul>
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
.social {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    margin: 0;
    padding: 0;
    > li {
        flex: 0 0 auto;
    }
}
.social-link {
    > svg {
        display: block;
        height: 15px;
        width: 20px;
        fill: currentColor;
        transition: fill 0.2s ease-out;
    }
}
</style>
