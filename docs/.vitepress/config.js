// VitePress Configuration: https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
import mathjax3 from 'markdown-it-mathjax3';

const customElements = [
    "mjx-container",
    "mjx-assistive-mml",
    "math",
    "maction",
    "maligngroup",
    "malignmark",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mi",
    "mlongdiv",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "ms",
    "mscarries",
    "mscarry",
    "mscarries",
    "msgroup",
    "mstack",
    "mlongdiv",
    "msline",
    "mstack",
    "mspace",
    "msqrt",
    "msrow",
    "mstack",
    "mstack",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "semantics",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mspace",
    "mtext",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "msqrt",
    "mstyle",
    "mmultiscripts",
    "mover",
    "mprescripts",
    "msub",
    "msubsup",
    "msup",
    "munder",
    "munderover",
    "none",
    "maligngroup",
    "malignmark",
    "mtable",
    "mtd",
    "mtr",
    "mlongdiv",
    "mscarries",
    "mscarry",
    "msgroup",
    "msline",
    "msrow",
    "mstack",
    "maction",
    "semantics",
    "annotation",
    "annotation-xml",
];

export default {
    lang: "en-US",
    title: "Notebook",
    description: "Online notebook powered by VitePress",
    cleanUrls: true,
    lastUpdated: true,
    // use LaTex in markdown
    markdown: {
        config: (markdown) => {
            markdown.use(mathjax3);
        }
    },
    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => customElements.includes(tag)
            },
        },
    },
    themeConfig: {
        logo: "/logo.svg",

        nav: [
            { text: "App Guide", link: "/application/getting-started/docker" },
            { text: "System Intro", link: "/system/compiler/getting-started" },
        ],

        sidebar: {
            "/application/": [
                {
                    text: "Application Guide",
                    items: [
                        {
                            text: "Getting started",
                            collapsed: true,
                            items: [
                                { text: "🐋 Docker", link: "/application/getting-started/docker" },
                                { text: "⚙️ Nginx", link: "/application/getting-started/nginx" },
                            ]
                        },
                        {
                            text: "More Practices",
                            collapsed: true,
                            items: []
                        }
                    ]
                }
            ],
            "/system/": [
                {
                    text: "System Introduction",
                    items: [
                        {
                            text: "Compiler",
                            collapsed: true,
                            items: [
                                { text: "▶️ Getting Started", link: "/system/compiler/getting-started" },
                                { text: "1️⃣ Lexical Analysis", link: "/system/compiler/lexical-analysis" },
                                { text: "2️⃣ Parsing", link: "/system/compiler/parsing" },
                            ]
                        }
                    ]
                }
            ],
        },

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
