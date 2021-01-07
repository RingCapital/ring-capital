module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        'vue/no-v-html': 'off',
        'no-unused-vars': 'warn',
        'no-useless-escape': 'off',
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed']
    }
};
