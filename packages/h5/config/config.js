import { components } from './components'

export default {
  mode: 'site',
  title: '@react-mobile-kit/h5',
  logo: 'https://gw.alipayobjects.com/zos/bmw-prod/cadedaff-8c88-4af2-870f-0574d322761c.svg',
  favicon:
    'https://gw.alipayobjects.com/mdn/rms_25513e/afts/img/A*ShzFT47r_F8AAAAAAAAAAAAAARQnAQ',
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '了解更多',
      children: [
        {
          title: '在线体验',
          path: 'https://codesandbox.io/s/antd-mobile-snrxr?file=/package.json',
        },
        {
          title: 'Roadmap',
          path: 'https://github.com/ant-design/ant-design-mobile/discussions/3924',
        },
        {
          title: '参与贡献',
          path: 'https://github.com/ant-design/ant-design-mobile/blob/master/.github/CONTRIBUTING.md',
        },
      ],
    },
    {
      title: '返回旧版',
      children: [
        {
          title: 'v2',
          path: 'https://antd-mobile-v2.surge.sh',
        },
        {
          title: 'v2 国内站点',
          path: 'https://antd-mobile-doc-v2.gitee.io',
        },
        {
          title: 'v3 alpha',
          path: 'https://antd-mobile-v3.surge.sh',
        },
      ],
    },
    {
      title: '发布日志',
      path: 'https://github.com/ant-design/ant-design-mobile/releases',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/ant-design/ant-design-mobile',
    },
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '快速上手',
        path: '/guide/quick-start',
      },
      {
        title: 'FAQ',
        path: '/guide/faq',
      },
      {
        title: 'CSS 变量',
        path: '/guide/css-variables',
      },
      {
        title: '主题',
        path: '/guide/theme',
      },
      {
        title: '按需加载',
        path: '/guide/import-on-demand',
      },
      {
        title: '高清适配（试验性）',
        path: '/guide/hd',
      },
      {
        title: '服务端渲染 / SSR（试验性）',
        path: '/guide/ssr',
      },
    ],
    '/components': [
      {
        title: '基础',
        children: components.basic,
      },
    ],
  },
  resolve: {
    includes: ['docs', 'src'],
    passivePreview: true,
  },
  alias: {
    '@react-mobile-kit/h5/es': process.cwd() + '/src',
    '@react-mobile-kit/h5': process.cwd() + '/src',
    'demos': process.cwd() + '/src/demos/index.js',
  },
  scripts: [
    `if (location.pathname.startsWith('/~demos/')) {
      document.body.style.background = '#f5f7fa'
    }`,
    'https://s9.cnzz.com/z_stat.php?id=1280306924&web_id=1280306924',
  ],
  // locales: [
  //   ['en', 'English'],
  //   ['zh', '中文'],
  // ],
  styles: [
    `
    #root .__dumi-default-mobile-demo-layout {
      padding: 0;
    }
    a[title='站长统计'] {
      display: none;
    }
    `,
  ],
  themeConfig: {
    hd: {
      rules: [
        // {mode: 'vw', options: [100, 750]}
      ],
    },
  },
  hire: {
    title: '招招招招招前端！！！！',
    content: `
<ul>
  <li>ahooks、qiankun、antd mobile、l7 各种开源项目，快来并肩作战！</li>
  <li>小组介绍：<a href="https://www.yuque.com/docs/share/8f763b3f-acd8-4ebf-a443-a0f45c5db293?#" target="_blank">http://topurl.cn/8wP</a></li>
  <li>投递邮箱：brickspert.fjl@antfin.com</li>
</ul>`,
    email: 'brickspert.fjl@antfin.com',
    slogan: '招招招招招前端！！！！',
  },
}
