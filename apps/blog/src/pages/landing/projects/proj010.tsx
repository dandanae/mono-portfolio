import { Project } from './types';

export const proj010: Project = {
  id: 'proj010',
  tags: ['React', 'AWS'],
  title: 'PIE EVENT',
  subtitle: 'PIE와 JANUS Pro에 대한 퀴즈를 풀면 추첨을 통해 상품을 주는 이벤트를 위한 페이지를 개발했어요.',
  challenge: 'middleware 관리',
  date: '2025. 04 - 2025. 04.',
  image: '',
  links: [],
  libraries: [
    { title: '@tanstack/react-query', href: 'https://www.npmjs.com/package/@tanstack/react-query' },
    { title: 'mui', href: 'https://mui.com/' },
    { title: 'material-symbols', href: 'https://www.npmjs.com/package/material-symbols' },
    { title: '@use-funnel/browser', href: 'https://www.npmjs.com/package/@use-funnel/browser' },
    { title: 'framer-motion', href: 'https://www.npmjs.com/package/framer-motion' },
    { title: 'next-intl', href: 'https://www.npmjs.com/package/next-intl' },
    { title: 'tailwind-variants', href: 'https://www.npmjs.com/package/tailwind-variants' },
    { title: 'clsx', href: 'https://www.npmjs.com/package/clsx' },
    { title: 'tailwind-merge', href: 'https://www.npmjs.com/package/tailwind-merge' },
  ],
  role: '프론트엔드 개발 및 UI/UX를 총괄했어요.',

  tasks: [
    {
      title: 'PIE EVENT 퀴즈',
      lists: [
        'PIE 회사의 JANUS Pro에 대한 퀴즈를 만들어 풀 수 있도록 했어요.',
        <>
          <code>json</code>으로 다국어에 대응할 수 있도록 만들었어요.
        </>,
        '응모가 완료되면 수집한 이메일로 응모 번호를 전송해요.',
      ],
    },
    { title: '전시회 등록 / 관리', lists: ['자주 가는 전시회를 등록하고 관리할 수 있어요.'] },
    {
      title: '응모 일정 등록 / 관리',
      lists: ['등록된 전시회를 선택해 기간을 정하면 퀴즈 페이지가 열려요.'],
    },
    {
      title: '추첨',
      lists: [
        <>
          <code>framer-motion</code>의 애니메이션 효과를 통해 추첨할 때 긴장감을 유도했어요.
        </>,
      ],
    },
  ],
  hardTasks: [
    {
      title: '하나의 로드밸런서에 두 개의 도메인',
      problems: [
        '이벤트 서버는 항상 켜둘 필요가 없어 기존 서버를 함께 사용하기로 했어요.',
        <>
          <code>event.pie.co.kr</code>은 <code>/event</code> 하위만 접근 가능해야 했어요.
        </>,

        '경로 매칭은 정규식 기반 화이트리스트 방식으로 단순화하여 성능 저하를 방지했습니다.',
      ],
      solutions: [
        <>
          Next.js <code>middleware</code>를 활용해 도메인·경로 기반 분기를 구현했어요.
        </>,
        <>
          사용자 경험을 고려해 접근 불가한 경우에는 모두 <code>redirect</code>로 처리하여 잘못된 경로 접근 시에도
          안정적으로 루트 경로로 돌려보냈어요.
        </>,
        '허용 경로 화이트리스트 방식으로 정규식을 단순화하고 성능 저하를 방지했어요.',
      ],
      learningPoints: [
        '실무에서 도메인/라우팅 분기 시 보안, 성능, 접근성을 함께 고려하는 운영 패턴을 익혔어요.',
        '웹 표준 가이드라인에 따라 접근 경로를 일관성 있게 유지하는 것이 UX 신뢰성에 직결됨을 체감했어요.',
      ],
    },
  ],
  results: [
    {
      title: '전문적 이미지를 넘어, 친근한 참여 기회 제공',
      lists: [
        'PIE와 JANUS Pro를 기술 중심이 아닌 퀴즈 이벤트 형식으로 풀어내어 사용자 접근 장벽을 낮췄어요.',
        '전문적인 기기라는 인식 때문에 일반 고객 참여가 저조했지만, 이벤트를 통해 가볍게 즐길 수 있는 분위기를 조성했어요.',
        '응모와 추첨 과정을 통해 고객과 직접적으로 연결되는 경험을 제공했어요.',
        '결과적으로 제품 인지도를 넓히고, 잠재 고객층까지 친근하게 다가가는 접점을 새롭게 창출했어요.',
      ],
    },
  ],

  uiPoint: [
    {
      title: '제스처 간섭 최소화(iOS 홈 인디케이터 대응)',
      lists: [
        'iOS에서 하단 스와이프 제스처(홈/시리)와 충돌하지 않도록 주요 하단 버튼의 위치를 상향 배치했어요.',
        'Safe Area를 고려해 하단 여백을 확보하고, 제스처 영역과 터치 타깃이 겹치지 않도록 레이아웃을 조정했어요.',
      ],
    },
    {
      title: '퍼널형(단계적) 퀴즈 진행',
      lists: [
        '@use-funnel/browser를 활용해 퀴즈를 단계별(안내 → 개인정보 동의 → 문제 풀이 → 검토 → 제출 → 결과)로 분리해 인지 부하를 낮췄어요.',
        '단계별 유효성 검사를 통과해야만 다음 단계로 이동하도록 가드(guard) 로직을 두어 입력 품질과 완주율을 높였어요.',
      ],
    },
    {
      title: '응모 경험 최적화(이메일 확인 & 중복 방지)',
      lists: [
        '응모 완료 시 이메일로 응모번호를 발송하고, 화면에서도 즉시 확인 가능한 성공 피드백(토스트)을 제공했어요.',
        '중복 응모를 방지하기 위해 동일 이메일/세션에 대해 CTA를 비활성화하고 상태 배지로 “응모 완료”를 표시했어요.',
        '서버 검증 대기 동안 로딩 스피너와 비동기 상태 메시지를 노출해 불안감을 줄였어요.',
      ],
    },
    {
      title: '다국어 & 문구 관리',
      lists: [
        '문항/문구는 JSON 기반으로 분리해 next-intl과 함께 다국어 대응을 단일 소스로 관리했어요.',
        '언어 변경 시 레이아웃 깨짐을 방지하도록 버튼/라벨 폭에 여유를 두고 줄바꿈 규칙을 정의했어요.',
      ],
    },

    {
      title: '피드백 & 마이크로 인터랙션',
      lists: [
        'framer-motion으로 스텝 전환/정답 확인/추첨 연출에 미세한 모션을 적용해 몰입감을 높였어요.',
        '정답/오답, 제출 성공/실패에 따라 색·아이콘·토스트를 일관된 토큰으로 표준화했어요.',
      ],
    },
  ],

  // content: <></>,
};
