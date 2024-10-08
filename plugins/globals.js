import Vue from 'vue';

Vue.filter('formatDate', (date, i18n) => {
    const [{ iso }] = i18n.locales.filter(({ code }) => {
        return code === i18n.locale;
    });
    const localeIso = iso.replace('_', '-');
    return new Date(date).toLocaleDateString(localeIso, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
});

Vue.filter('noPAround', function (value) {
    if (value.substring(0, 3) === '<p>') {
        let text = value.substring(3);
        text = text.slice(0, -4);
        return text;
    } else {
        return value;
    }
});

Vue.filter('nestedTitle', function (value, centered = false) {
    return value
        .split('<p>')
        .join(`<p class="${centered ? 'underlined-center' : 'underlined'}"><span>`)
        .split('</p>')
        .join('</span></p>');
});
