// VitePress Configuration: https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
export default {
    lang: "en-US",
    title: "Ten's Note",
    description: "Online note powered by VitePress",
    cleanUrls: true,
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.svg",

        sidebar: [
            {
                text: 'Docker',
                collapsed: false,
                items: [
                    { text: 'Nginx', link: '/docker/nginx' },
                    { text: 'Jenkins', link: '/docker/jenkins' }
                ]
            },
            {
                text: "Compiler",
                collapsed: false,
                items: [
                    { text: "▶️ Getting Started", link: "/compiler/getting-started" },
                    { text: "1️⃣ Lexical Analysis", link: "/compiler/lexical-analysis" },
                ]
            }
        ],

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
