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
      { text: 'Tutorials', link: '/tutorials', icon: 'GiEvilBook' },
      // { text: 'Guide', link: '/guide', icon: 'DvAnkhWingsTome' },
      { text: 'Bài viết', link: '/posts', icon: 'GiMagicPortal' },
    ],
    navbar: {
      showThemeToggle: true,
      showThemeSeparator: true,
    },
    sidebar: {
      '/tutorials': [
        {
          text: 'Technical',
          icon: 'FaCode',
          collapsible: false,
          children: [
            {
              text: 'Java Core',
              icon: 'FaJava',
              items: [
                { text: 'Giới thiệu', icon: 'FaBookOpen', link: '/tutorials/programing/java-core/introduction' },
                { text: 'Cấu trúc rẽ nhánh', icon: 'FaCodeBranch', link: '/tutorials/programing/java-core/conditionals' },
                { text: 'Vòng lặp', icon: 'FaRepeat', link: '/tutorials/programing/java-core/loops' },
                { text: 'Mảng', icon: 'FaTableCells', link: '/tutorials/programing/java-core/array' },
                { text: 'Chuỗi', icon: 'FaFont', link: '/tutorials/programing/java-core/string' },
                { text: 'Phương thức', icon: 'FaGears', link: '/tutorials/programing/java-core/method' },
              ],
            },
            {
              text: 'Java OOP',
              icon: 'RiJavaLine',
              items: [
                { text: 'Tổng quan', icon: 'FaBookOpen', link: '/tutorials/programing/java-oop/introduction' },
                { text: 'Lập trình hướng đối tượng', icon: 'FaCubes', link: '/tutorials/programing/java-oop/oop' },
                { text: 'Tính trừu tượng', icon: 'FaShapes', link: '/tutorials/programing/java-oop/abstract' },
              ],
            },
            {
              text: 'JavaScript',
              icon: 'FaJs',
              items: [
                { text: 'Tổng quan', icon: 'FaBookOpen', link: '/tutorials/programing/javascript-basic/javascript-overview' },
                { text: 'Bắt đầu với JavaScript', icon: 'FaRocket', link: '/tutorials/programing/javascript-basic/getting-started-with-javascript' },
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
              icon: 'TbBrandNodejs',
              items: [
                { text: 'Tìm hiểu về NodeJS', icon: 'FaBookOpen', link: '/tutorials/back-end/nodejs/introduction-to-nodejs' },
                { text: 'Tìm hiểu về EJS', icon: 'FaFileCode', link: '/tutorials/back-end/nodejs/introduction-to-ejs' },
                { text: 'Giới thiệu Restful API', icon: 'FaPlug', link: '/tutorials/back-end/nodejs/introduction-to-restful-api' },
                { text: 'Xây dựng Restful API', icon: 'FaServer', link: '/tutorials/back-end/nodejs/building-restful-api' },
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
              icon: 'DiMsqlServer',
              items: [
                { text: 'Giới thiệu SQL Server', icon: 'FaBookOpen', link: '/tutorials/database/sql-server/introduction' },
                { text: 'Tạo CSDL và T-SQL', icon: 'FaTable', link: '/tutorials/database/sql-server/db-and-tsql' },
                { text: 'Hàm và xử lý chuỗi', icon: 'FaCode', link: '/tutorials/database/sql-server/functions-and-strings' },
                { text: 'Điều kiện và vòng lặp', icon: 'FaCodeBranch', link: '/tutorials/database/sql-server/conditions-and-loops' },
                { text: 'Stored Procedures', icon: 'FaBoxOpen', link: '/tutorials/database/sql-server/stored-procedures' },
                { text: 'Trigger', icon: 'FaBolt', link: '/tutorials/database/sql-server/trigger' },
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
              icon: 'FaGitAlt',
              items: [
                { text: 'Setup môi trường', icon: 'FaWrench', link: '/tutorials/tools/git/setup' },
                { text: 'Đẩy code lên GitHub', icon: 'FaCloudArrowUp', link: '/tutorials/tools/git/push-code' },
                { text: 'Undo commit', icon: 'FaUndo', link: '/tutorials/tools/git/undo-commit' },
                { text: 'Làm việc nhóm', icon: 'FaUsers', link: '/tutorials/tools/git/collaborators' },
                { text: 'Làm việc với nhánh', icon: 'FaCodeBranch', link: '/tutorials/tools/git/branch' },
                { text: 'Viết commit message', icon: 'FaPen', link: '/tutorials/tools/git/commit-message' },
              ],
            },
          ],
        },
        {
          text: 'Interview',
          icon: 'FaComments',
          collapsible: false,
          children: [
            { text: 'Java', icon: 'FaJava', link: '/tutorials/interview/java' },
            { text: 'Redis', icon: 'DiRedis', link: '/tutorials/interview/redis' },
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