import Image from 'next/image';
import { Project } from './types';

export const proj009: Project = {
  id: 'proj009',
  tags: ['React', 'AWS'],
  title: 'APL 관리자 페이지',
  subtitle: 'APL 장비 렌탈 관련 계약 및 기기 관리를 할 수 있는 페이지를 개발했어요.',
  challenge: 'UX 라이팅',
  date: '2025. 03 - 2025. 05.',
  image: '',
  links: [{ title: 'APL Admin', href: 'https://apladmin.pie.co.kr/' }],
  libraries: [
    { title: '@tanstack/react-query', href: 'https://www.npmjs.com/package/@tanstack/react-query' },
    { title: 'jotai', href: 'https://www.npmjs.com/package/jotai' },
    { title: 'react-hook-form', href: 'https://www.npmjs.com/package/react-hook-form' },
    { title: 'tailwindcss', href: 'https://www.npmjs.com/package/tailwindcss' },
    { title: 'framer-motion', href: 'https://www.npmjs.com/package/framer-motion' },
    { title: 'mui', href: 'https://mui.com/' },
    { title: 'material-symbols', href: 'https://www.npmjs.com/package/material-symbols' },
  ],
  role: '프론트엔드 개발 및 UI/UX를 총괄했어요.',

  tasks: [
    {
      title: '대시보드',
      lists: [
        '렌탈 관련 내용들을 한눈에 확인할 수 있어요.',
        '계약 이탈 수, 새 계약건, 현재 문제 있는 기기들의 알림 등을 보여 줬어요.',
      ],
    },
    {
      title: '렌탈 기기 관리',
      lists: [
        '렌탈한 기기를 등록해서 관리할 수 있어요.',
        <>
          제조사, 현재 기기 상태, 계약 상태 등 여러 내용을 mui의 <code>x-data-grid</code>를 통해서 보여 줬어요.
        </>,
      ],
    },
    {
      title: '렌탈 계약 관리',
      lists: [
        '렌탈 계약을 관리할 수 있어요.',
        '계약서는 스프라이트에 올라가고, 전자계약서를 pdf로 올려 s3에 저장해 관리할 수 있도록 했어요.',
      ],
    },
  ],
  hardTasks: [
    {
      title: '회원가입 단계 설계',
      problems: [
        '입력 필드를 한 화면에 모두 노출하면 사용자가 집중하기 어렵다고 판단했어요.',
        '서비스 특성상 데스크톱 사용이 중심이라, 모바일에서 자주 쓰이는 퍼널(funnel) UI를 그대로 적용하기엔 적합하지 않았어요.',
      ],
      solutions: [
        <div key="image" className="grid grid-cols-2 gap-2">
          <Image alt="image01" src="https://dandanae.github.io/images/013-01.gif" width={1000} height={800} />
          <Image alt="image02" src="https://dandanae.github.io/images/013-02.gif" width={1000} height={860} />
        </div>,
        '단계별 입력 프로세스를 도입하여 이전 단계를 완료해야 다음 입력칸이 열리도록 했어요.',
        '화면 상단에 단계 진행 표시(progress indicator)를 두어 남은 과정을 직관적으로 확인 가능하게 했어요.',
        <>
          <code>framer-motion</code> 애니메이션을 적용해 단계 전환 시 시각적 매끄러움을 강화했어요.
        </>,
      ],
      learningPoints: [
        '사용자의 집중도와 피로도를 줄이기 위해 입력 흐름을 단순화하는 것이 UX 품질에 핵심이라는 걸 배웠어요.',
        '환경(데스크톱 중심 등)에 맞는 적절한 UI 패턴을 선택하는 기준을 갖추게 되었어요.',
        '애니메이션 효과가 사용자의 심리적 부담을 줄이고 긍정적인 경험을 줄 수 있다는 점을 체감했어요.',
      ],
    },
    {
      title: '한정된 시간 속에서의 선택과 집중',
      problems: [
        '렌탈 계약 및 기기 데이터를 한눈에 보기 위해 표 컴포넌트를 구현하려 했어요.',
        '직접 구현하면 정렬, 페이지네이션, 검색 등 많은 기능을 새로 만들어야 해서 예상보다 시간이 많이 걸린 경험이 있어 지양하고 싶었어요.',
      ],
      solutions: ['MUI DataGrid를 도입해 기본 제공 기능(정렬, 페이지네이션, 검색)을 재사용하면서 시간을 절약했어요.'],
      learningPoints: [
        '빠듯한 일정 속에서는 생산성과 유지보수성을 고려해 라이브러리를 적극적으로 활용하는 것이 현명하다는 걸 배웠어요.',
        '직접 구현 경험 덕분에 라이브러리 내부 동작을 더 깊이 이해할 수 있었고, 이후 커스터마이징과 디버깅에도 자신감이 생겼어요.',
      ],
    },
    {
      title: 'UX Writing 톤 유지하기',
      problems: [
        '여러 알림창에서 어투·톤이 제각각이라 사용자가 일관되지 않은 경험을 할 수 있었어요.',
        '문자열(string)이 흩어져 있어 관리와 유지보수가 비효율적이었어요.',
      ],
      solutions: [
        <>
          <a href="https://toss.tech/article/8-writing-principles-of-toss" target="_blank" rel="noopener noreferrer">
            토스의 UX Writing 원칙
          </a>
          을 참고해 문구를 정리했어요.
        </>,
        '알림 문구를 성격별(JSON 구조화)로 묶어 관리하여 동일 톤을 유지했어요.',
        <pre key="code">{String.raw`  "toast": {
    "pending": {
      "signIn": "로그인 중이에요",

      "signUp": "회원을 등록 중이에요",
      "requestCode": "인증 메일을 전송 중이에요",
      "verifyCode": "코드를 확인 중이에요",

      "waiting": "가입을 수락하는 중이에요",

      "createDevice": "장비를 등록 중이에요",
      "updateDevice": "장비 정보를 수정 중이에요",
      "deleteDevice": "장비를 삭제 중이에요",

      "createContract": "계약을 등록 중이에요",
      "updateContract": "계약 정보를 수정 중이에요",
      "deleteContract": "계약을 삭제 중이에요"
    },`}</pre>,
        <>
          <code>next-intl</code>과 <code>i18n-ally</code>를 도입해 다국어 지원과 번역 검증 과정을 효율화했어요.
        </>,
        <Image
          key="image03"
          alt="image03"
          src="https://dandanae.github.io/images/013-03.png"
          width={593}
          height={287}
        />,
      ],
      learningPoints: [
        '알림 문구의 작은 차이가 UX 인식에 큰 영향을 준다는 걸 배웠어요.',
        '문자열 관리 체계를 표준화하면 유지보수 비용을 크게 줄일 수 있다는 점을 확인했어요.',
        '국제화(i18n) 도구를 활용해 협업 효율과 사용자 경험을 동시에 개선할 수 있었어요.',
      ],
    },
  ],
  results: [
    {
      title: '운영 효율성',
      lists: [
        '렌탈/계약 정보를 한곳에서 관리하여 업무 처리 시간 단축했어요.',
        '정렬·검색·페이지네이션 제공으로 담당자 탐색 시간 감소했어요.',
        '알림 기반 이슈 파악으로 반복 확인 작업 축소했어요.',
      ],
    },
    {
      title: 'UX 품질 향상',
      lists: [
        '알림 톤&매너 일원화로 사용자 혼란 감소했어요.',
        'MUI DataGrid 적용으로 목록 가독성과 상호작용 만족도 향상했어요.',
        '다국어(i18n) 기반 안내로 해외/외부 파트너 사용성 개선했어요.',
      ],
    },
  ],

  uiPoint: [
    {
      title: '회원가입 스텝형 퍼널(데스크톱 최적화)',
      lists: [
        '한 화면에 모든 필드를 노출하지 않고, 단계별로 순차 공개해 인지 부하를 줄였어요.',
        '진행 상태를 상단 Progress Indicator로 제공하고, 이전/다음 이동을 명확히 했어요.',
        <>
          <code>react-hook-form</code> + 스키마 검증으로 단계별 유효성 검사를 통과해야 다음 단계로 이동하도록
          가드했어요.
        </>,
      ],
    },
    {
      title: '테이블 중심 업무 UX',
      lists: [
        'MUI X DataGrid의 정렬/필터/페이지네이션을 기본 채택하고, 서버 파라미터와 동기화해 새로고침에도 상태를 유지했어요.',
        '중요 컬럼 고정(pin)과 열 너비 자동/수동 제어로 가독성을 높였어요.',
        '행 클릭 시 상세를 모달/드로어로 열어 컨텍스트 전환 비용을 줄였어요.',
      ],
    },
    {
      title: '상태 UX(로딩/빈 상태/에러) 표준화',
      lists: [
        <>
          <code>react-query</code> 상태에 맞춰 스켈레톤·Empty 가이드·재시도 버튼을 일관된 패턴으로 제공했어요.
        </>,
      ],
    },
    {
      title: 'UX Writing 일관성',
      lists: [
        '토스 UX Writing 원칙을 참고해 톤&매너를 통일하고, 알림 문구를 JSON으로 구조화해 재사용성을 높였어요.',
        'next-intl + i18n-ally로 다국어 품질을 점검하고, 길이 차이를 고려해 버튼/레이블 폭 여유를 두었어요.',
      ],
    },
    {
      title: '폼 사용성 강화',
      lists: [
        '인라인 검증과 필드별 도움말을 제공하고, 제출 시 포커스를 첫 오류로 이동해 수정 경로를 단축했어요.',
        '숫자/날짜/통화 입력은 마스킹·포맷팅으로 입력 오류를 줄였어요.',
      ],
    },
    {
      title: '피드백 & 마이크로 인터랙션',
      lists: ['CRUD 성공/실패에 색상/아이콘/토스트를 표준화해 학습 비용을 낮췄어요.'],
    },
  ],

  // content: <></>,
};
