// VitePress Configuration: https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
export default {
    lang: "en-US",
    title: "Ten's Note",
    description: "Online note powered by VitePress",
    cleanUrls: true,
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.svg",

        sidebar: {
            "/docker/": [
                {
                    text: 'Docker',
                    collapsed: true,
                    items: [
                        { text: 'Nginx Configuration', link: '/docker/nginx' },
                        { text: 'Jenkins Configuration', link: '/docker/jenkins' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ChenYuTong10/10note' }
        ],

        editLink: {
            pattern: 'https://github.com/ChenYuTong10/10note/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: "👮<a target='_blank' href='https://beian.miit.gov.cn/'>粤ICP备2022121173号</a>"
        },
    }
};
