import { Project } from './types';

export const proj007: Project = {
  id: 'proj007',
  tags: ['React', 'AWS'],
  title: 'DATA CLOUD',
  subtitle: '윈도우 프로그램에서 제공하는 서비스를 웹에서도 제공하는 사이트를 개발했어요.',
  challenge: 'AWS(ECR-ECS)',
  date: '2024. 08 - 2025. 02',
  image: 'https://dev-datacloud.pie.co.kr/static/media/datacloud.34b65b9b18e2c2229b60.png',
  links: [{ title: 'Data Cloud', href: 'https://datacloud.pie.co.kr/' }],
  libraries: [
    { title: '@tanstack/react-query', href: 'https://www.npmjs.com/package/@tanstack/react-query' },
    { title: 'jotai', href: 'https://www.npmjs.com/package/jotai' },
    { title: 'react-hook-form', href: 'https://www.npmjs.com/package/react-hook-form' },
    { title: 'yup', href: 'https://www.npmjs.com/package/yup' },
    {
      title: 'tosspayments-sdk',
      href: 'https://www.npmjs.com/package/@tosspayments/tosspayments-sdk',
    },
    { title: 'tailwindcss', href: 'https://www.npmjs.com/package/tailwindcss' },
    { title: 'framer-motion', href: 'https://www.npmjs.com/package/framer-motion' },
    { title: 'canvas', href: 'https://www.npmjs.com/package/canvas' },
    { title: 'google-spreadsheet', href: 'https://www.npmjs.com/package/google-spreadsheet' },
    { title: 'Google Sheets API', href: 'https://developers.google.com/sheets/api/reference/rest' },
    { title: 'nivo', href: 'https://nivo.rocks/' },
  ],
  role: '프론트엔드 개발 및 UI/UX를 총괄했어요.',

  tasks: [
    {
      title: '고객 및 이미지 데이터의 통합 관리',
      lists: [
        '기존 윈도우 프로그램에서만 관리할 수 있던 데이터를 OS에 구애받지 않고 웹 기반으로 관리할 수 있는 시스템을 구현했어요.',
      ],
    },
    {
      title: '이미지 뷰어',
      lists: [
        <>
          <code>Canvas API</code>를 이용해 촬영 이미지의 확대/축소, 드로잉, 텍스트 삽입 등 다양한 이미지 편집 기능을
          지원해요.
        </>,
      ],
    },
    {
      title: '인사이트 중심의 대시보드',
      lists: ['고객 증가 추이, 데이터 사용량 등의 데이터를 월간/연간 통계 리포트로 시각화하여 제공해요.'],
    },
    {
      title: '파트너 사이트 통합',
      lists: ['분리되어 있던 파트너 사이트 기능을 하나의 플랫폼으로 통합했어요.'],
    },
    {
      title: '멤버십 결제 및 관리',
      lists: [
        <>
          <code>토스 페이먼츠</code>를 통해 안정적이고 편리한 멤버십 결제와 멤버십 관리 기능을 제공해요.
        </>,
      ],
    },
    {
      title: '하위 고객 관리',
      lists: ['본사에서 직접 가맹점 및 하위 고객을 관리할 수 있도록 하는 기능을 제공해요.'],
    },
    {
      title: '구글 시트를 통한 다국어 지원 자동화 기능',
      lists: [
        <>
          <code>Google Sheet API</code>를 이용해 다국어 지원 자동화하여 손쉽게 관리할 수 있도록 했어요.
        </>,
      ],
    },
  ],

  hardTasks: [
    {
      title: '이미지 뷰어 구현 과정',
      problems: [
        '다중 캔버스를 실시간 동기화해야 해서 기존 이미지 뷰어/드로잉 라이브러리를 그대로 사용할 수 없었어요.',
        '드로잉 도형 크기를 조절할 때 도형이 반복해서 그려지는 문제가 발생했어요.',
      ],
      solutions: [
        '요구사항: 확대/축소, 드로잉, 분할 화면 간 실시간 동기화, 태블릿 호환성을 모두 만족해야 했어요.',
        <>
          <code>Konva</code>는 좌표 처리 복잡성 때문에 제외하고, <code>zoom-and-pinch</code> 기반 커스텀 드로잉 기능을
          구현했어요.
        </>,
        <>
          <code>jotai</code>로 상태를 원자화해 각 캔버스가 필요한 atom만 구독하도록 하여 불필요한 리렌더를 최소화했어요.
        </>,
        <>
          도형 크기 조절은 임시 캔버스를 활용해 미리보기 후 <code>mouseup</code> 이벤트에서 본 캔버스로 확정하는
          방식으로 해결했어요.
        </>,
      ],
      learningPoints: [
        '유명한 라이브러리라도 요구사항에 맞지 않으면 복잡성이 오히려 커질 수 있음을 배웠어요.',
        <>
          임시 캔버스로 미리보기 → 확정 구조를 적용하며 <b>UX와 성능을 동시에 고려하는 패턴</b>을 익혔어요.
        </>,
      ],
    },
    {
      title: 'UI/UX 숙련도',
      problems: [
        '디자이너님이 UI/UX 분야에 처음 도전해 디자인 틀과 환경에 익숙하지 않았어요.',
        'UI/UX 분야에 처음 도전하는 디자이너님과의 협업은 단순한 작업 분담을 넘어서 상호 성장의 기회라고 생각했어요.',
      ],
      solutions: [
        <>
          <code>Tailwind CSS</code>를 도입해 일관된 디자인 시스템을 빠르게 적용했어요.
        </>,
        <>
          {' '}
          그리드, 여백, 컴포넌트 명명 규칙 등을 정리해 <b>디자인 가이드 문서</b>로 공유했어요.
        </>,
        '디자인 요청 시 구체적인 예시와 설명을 함께 전달해 협업 효율을 높였어요.',
      ],
      learningPoints: [
        '디자이너와 함께 성장하며 상호 이해를 바탕으로 한 협업이 결과물 완성도에 직접적으로 기여한다는 걸 경험했어요.',
        'UI/UX 가이드라인을 명확히 공유하면 디자인–개발 간 커뮤니케이션 비용을 크게 줄일 수 있음을 배웠어요.',
      ],
    },
    {
      title: 'ECS 환경에서 CSR 방식의 환경 변수 관리 이슈',
      problems: [
        'CSR 환경에서는 서버 환경 변수(.env)를 직접 사용할 수 없었어요.',
        'AWS CodePipeline 빌드 과정에서 Secret Key를 안전하게 주입하는 방법이 필요했어요.',
      ],
      solutions: [
        <>
          <code>Toss Payment API</code>의 <code>Client Key</code>는 클라이언트 코드에 노출해도 되는 구조라는 점을
          확인했어요.
        </>,
        <>
          <code>Secret Key</code>는 백엔드 API를 통해 호출하도록 설계해 보안 문제를 해결했어요.
        </>,
      ],
      learningPoints: [
        <>
          CSR 환경에서 보안을 유지하면서도 기능을 제공하기 위해, <b>보안과 사용자 경험을 균형 있게 고려</b>해야 한다는
          걸 배웠어요.
        </>,
      ],
    },
  ],

  results: [
    {
      title: '새로운 캐시 카우 창출',
      lists: [
        '기존에는 디바이스 판매에만 집중하고, 프로그램은 평생 업데이트를 지원함으로써 추가적인 수익 창출이 어려웠어요.',
        '평소 고객들이 하드웨어 용량이 부족하다는 니즈를 고려해, 클라우드를 활용한 월정액 시스템을 도입함으로써 새로운 캐시 카우를 창출하였어요.',
      ],
    },
    {
      title: 'OS의 제한을 일부 해소',
      lists: [
        '기존에는 윈도우 프로그램으로 개발되어 다른 플랫폼에서는 이용이 어려웠어요.',
        '일부 기능을 웹 기반으로 전환하여 타 플랫폼에서도 촬영한 사진을 확인할 수 있도록 하였어요.',
      ],
    },
  ],

  uiPoint: [
    {
      title: '인사이트 중심 대시보드',
      lists: [
        <>
          <code>nivo</code> 차트로 월간/연간 트렌드를 시각화하고, 핵심 KPI(고객 증가, 사용량)를 카드+차트 조합으로 한
          화면에 배치했어요.
        </>,
      ],
    },
    {
      title: '유사 기능 탭 구성',
      lists: [
        '회원초대/회원수락/회원관리 등 유사 흐름을 하나의 페이지에서 탭으로 분리해 페이지 난립을 방지했어요.',
        '탭 전환 시 상태를 유지(검색/필터/정렬)하여 컨텍스트 손실 없이 작업을 이어갈 수 있도록 했어요.',
      ],
    },
    {
      title: '상태 중심 UX(로딩/빈 상태/에러)',
      lists: [
        <>
          <code>react-query</code>의 로딩·에러 상태를 기반으로 스켈레톤, 비어 있음(Empty) 메시지, 재시도 버튼을
          표준화했어요.
        </>,
        '서버/네트워크 에러는 요약 메시지+자세히 보기로 나눠 정보 과부하를 줄이면서도 원인 파악을 도왔어요.',
      ],
    },
    {
      title: '다국어/지역화 UX',
      lists: [
        'Google Sheets 연동으로 문구를 원격 관리하고, 언어 전환 시 레이아웃 깨짐을 방지하도록 길이 여유를 확보했어요.',
        '날짜/숫자/통화 포맷을 로케일에 맞춰 자동 표기해 혼선을 줄였어요.',
      ],
    },
    {
      title: '권한 기반 인터페이스',
      lists: [
        '역할(본사/가맹점/하위 사용자)에 따라 메뉴와 액션을 조건부 노출해 불필요한 기능을 숨겼어요.',
        '권한 부족 시 비활성화+이유 툴팁으로 학습 비용을 낮췄어요.',
      ],
    },
  ],

  // content: <></>,
};
