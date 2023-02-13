// VitePress Configuration: https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
export default {
    lang: "en-US",
    title: "Ten's Note",
    description: "A note underlying VitePress",
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.svg",

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ChenYuTong10/10note' }
        ],

        sidebar: [
            {
                text: 'Section Title A',
                collapsed: true,
                items: [
                    { text: 'Item A', link: '/item-a' },
                    { text: 'Item B', link: '/item-b' },
                ]
            },
            {
                text: 'Section Title B',
                collapsed: true,
                items: [
                    { text: 'Item C', link: '/item-c' },
                    { text: 'Item D', link: '/item-d' },
                ]
            }
        ],

        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
    }
};
