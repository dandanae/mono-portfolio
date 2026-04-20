import { type Dictionary, t } from 'intlayer';

const pageContent: Dictionary = {
  key: 'page',
  content: {
    getStarted: {
      main: t({
        en: 'Get started by editing',
        ko: '시작하기 메인 내용',
      }),
      pageLink: 'src/app/page.tsx',
    },
  },
} satisfies Dictionary;

export default pageContent;
