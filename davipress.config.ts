import { defineConfig } from 'davipress'

export default defineConfig({
  title: 'Trần Hữu Đang – Lập trình viên Fullstack',
  description: 'Portfolio của Trần Hữu Đang – Lập trình viên Fullstack với kinh nghiệm Next.js, Spring Boot, DevOps, Microservices và xây dựng hệ thống web.',
  url: 'https://dangth.dev',
  lang: 'vi',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en', 'zh'],
    localeLabels: { vi: 'VI', en: 'EN', zh: 'ZH' },
  },
  repository: {
    url: 'https://github.com/2hjaito/dangth',
    editLink: 'https://github.com/2hjaito/dangth/edit/main',
  },
  github: {
    username: '2hjaito',
    topic: 'featured',
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'FaUser' },
      { text: 'Dự án', link: '/project', icon: 'DvTerminalBlink' },
      { text: 'Chứng chỉ', link: '/cert', icon: 'FaCertificate' },
      { text: 'Tutorials', link: '/tutorial', icon: 'GiEvilBook' },
      // { text: 'Guide', link: '/guide', icon: 'DvAnkhWingsTome' },
      { text: 'Bài viết', link: '/post', icon: 'GiMagicPortal' },
    ],
    navbar: {
      showThemeToggle: true,
      showThemeSeparator: true,
    },
    sidebar: {
      '/tutorial': [
        {
          text: 'Technical',
          icon: 'FaCode',
          collapsible: false,
          children: [
            {
              text: 'Java Core',
              icon: 'DvFrogJava',
              items: [
                { text: 'Giới thiệu', link: '/tutorial/programing/java-core/introduction' },
                { text: 'Cấu trúc rẽ nhánh', link: '/tutorial/programing/java-core/conditionals' },
                { text: 'Vòng lặp', link: '/tutorial/programing/java-core/loops' },
                { text: 'Mảng', link: '/tutorial/programing/java-core/array' },
                { text: 'Chuỗi', link: '/tutorial/programing/java-core/string' },
                { text: 'Phương thức', link: '/tutorial/programing/java-core/method' },
              ],
            },
            {
              text: 'Java OOP',
              icon: 'DvJavaGiphy',
              items: [
                { text: 'Tổng quan', link: '/tutorial/programing/java-oop/introduction' },
                { text: 'Lập trình hướng đối tượng', link: '/tutorial/programing/java-oop/oop' },
                { text: 'Tính trừu tượng', link: '/tutorial/programing/java-oop/abstract' },
              ],
            },
            {
              text: 'JavaScript',
              icon: 'DvJsGiphy',
              items: [
                { text: 'Tổng quan', link: '/tutorial/programing/javascript-basic/javascript-overview' },
                { text: 'Bắt đầu với JavaScript', link: '/tutorial/programing/javascript-basic/getting-started-with-javascript' },
              ],
            },
          ],
        },
        {
          text: 'Back end',
          icon: 'FaServer',
          collapsible: false,
          children: [
            {
              text: 'NodeJS',
              icon: 'DvNodejsGiphy',
              items: [
                { text: 'Tìm hiểu về NodeJS', link: '/tutorial/back-end/nodejs/introduction-to-nodejs' },
                { text: 'Tìm hiểu về EJS', link: '/tutorial/back-end/nodejs/introduction-to-ejs' },
                { text: 'Giới thiệu Restful API', link: '/tutorial/back-end/nodejs/introduction-to-restful-api' },
                { text: 'Xây dựng Restful API', link: '/tutorial/back-end/nodejs/building-restful-api' },
              ],
            },
          ],
        },
        {
          text: 'Database',
          icon: 'FaDatabase',
          collapsible: false,
          children: [
            {
              text: 'SQL Server',
              icon: 'DiMicrosoftsqlserverOriginal',
              items: [
                { text: 'Giới thiệu SQL Server', link: '/tutorial/database/sql-server/introduction' },
                { text: 'Tạo CSDL và T-SQL', link: '/tutorial/database/sql-server/db-and-tsql' },
                { text: 'Hàm và xử lý chuỗi', link: '/tutorial/database/sql-server/functions-and-strings' },
                { text: 'Điều kiện và vòng lặp', link: '/tutorial/database/sql-server/conditions-and-loops' },
                { text: 'Stored Procedures', link: '/tutorial/database/sql-server/stored-procedures' },
                { text: 'Trigger', link: '/tutorial/database/sql-server/trigger' },
              ],
            },
          ],
        },
        {
          text: 'Tool',
          icon: 'FaTools',
          collapsible: false,
          children: [
            {
              text: 'Git',
              icon: 'DvGithubGiphy',
              items: [
                { text: 'Setup môi trường', link: '/tutorial/tools/git/setup' },
                { text: 'Đẩy code lên GitHub', link: '/tutorial/tools/git/push-code' },
                { text: 'Undo commit', link: '/tutorial/tools/git/undo-commit' },
                { text: 'Làm việc nhóm', link: '/tutorial/tools/git/collaborators' },
                { text: 'Làm việc với nhánh', link: '/tutorial/tools/git/branch' },
                { text: 'Viết commit message', link: '/tutorial/tools/git/commit-message' },
              ],
            },
          ],
        },
        {
          text: 'Interview',
          icon: 'FaComments',
          collapsible: false,
          children: [
            { text: 'Java', icon: 'ViFileTypeJava', link: '/tutorial/interview/java' },
            { text: 'Redis', icon: 'DiRedisOriginal', link: '/tutorial/interview/redis' },
          ],
        },
      ],
    },
    footer: {
      copyright: '© Trần Hữu Đang 2026',
      links: [
        {
          type: 'source',
          label: 'SRC',
          href: 'https://github.com/2hjaito/dangth',
          ariaLabel: 'Xem mã nguồn trên GitHub',
          external: true,
        },
        {
          type: 'rss',
          label: 'RSS',
          href: '/rss.xml',
          ariaLabel: 'Xem RSS feed',
        },
      ],
    },
  },
  giscus: {
    enabled: true,
    repo: 'dangth12/blog-giscus-comments',
    repoId: 'R_kgDOJpeyjQ',
    category: 'Announcements',
    categoryId: 'DIC_kwDOJpeyjc4CW2KO',
    mapping: 'pathname',
    theme: 'preferred_color_scheme',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    lang: 'vi',
  },
  seo: {
    twitterCard: 'summary_large_image',
  },
  plugins: [
    ['live2d', { models: ['rem_2', 'xisitina', 'HK416-1-normal', 'HK416-2-destroy', 'Kar98k-normal', 'kp31'], width: 200, height: 300 }],
  ],
})