// VitePress Configuration: https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
export default {
    lang: "en-US",
    title: "Notebook",
    description: "Online notebook powered by VitePress",
    cleanUrls: true,
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.svg",

        sidebar: [
            {
                text: 'Application',
                collapsed: false,
                items: [
                    { text: 'Docker', link: '/application/docker' },
                    { text: 'Nginx', link: '/application/nginx' },
                ]
            },
            {
                text: "Compiler",
                collapsed: false,
                items: [
                    { text: "▶️ Getting Started", link: "/compiler/getting-started" },
                    { text: "1️⃣ Lexical Analysis", link: "/compiler/lexical-analysis" },
                    { text: "2️⃣ Parsing", link: "/compiler/parsing" },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ChenYuTong10/notebook' }
        ],

        editLink: {
            pattern: 'https://github.com/ChenYuTong10/notebook/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: "👮<a target='_blank' href='https://beian.miit.gov.cn/'>Guangdong ICP No. 2022121173</a>",
        },
    }
};
