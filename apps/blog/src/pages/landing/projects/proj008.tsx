import Image from 'next/image';
import { Project } from './types';

export const proj008: Project = {
  id: 'proj008',
  tags: ['Flutter'],
  title: 'ARTISTIC&CO 애플리케이션',
  subtitle: '일본 기업 ARTISTIC & CO와 협업하여 블루투스를 통해 뷰티 디바이스 컨트롤 애플리케이션을 개발했어요.',
  challenge: 'Flutter',
  date: '2024. 12 - 2025. 04',
  image:
    'https://play-lh.googleusercontent.com/pM6292ZwuVFYR1ovMjqHK2Pp404OQginGy056Cck6lU8lf2L42NNWoiYyocUZ4GAsHE=w240-h480-rw',
  links: [
    {
      title: 'ARTISTIC&CO - Google Play 앱',
      href: 'https://play.google.com/store/apps/details?id=com.artistic.co&hl=ko',
    },
    {
      title: 'App Store에서 제공하는 ARTISTIC&CO',
      href: 'https://apps.apple.com/us/app/artistic-co/id6744670056',
    },
    {
      title: 'ARTICTIC&CO offitial site',
      href: 'https://artistic.co.jp/',
    },
  ],
  libraries: [
    { title: 'flutter_blue_plus', href: 'https://pub.dev/packages/flutter_blue_plus' },
    { title: 'easy_localization', href: 'https://pub.dev/packages/easy_localization' },
    { title: 'flutter_secure_storage', href: 'https://pub.dev/packages/flutter_secure_storage' },
    { title: 'table_calendar', href: 'https://pub.dev/packages/table_calendar' },
    { title: 'logger', href: 'https://pub.dev/packages/logger' },
    { title: 'flutter_slidable', href: 'https://pub.dev/packages/flutter_slidable' },
    { title: 'upgrader', href: 'https://pub.dev/packages/upgrader' },
  ],
  role: 'UIUX 디자인, 애플리케이션 개발',

  tasks: [
    {
      title: '이메일 마케팅 연동 회원가입',
      lists: [
        <>
          회원가입 시 입력된 이메일 정보를{' '}
          <a
            href="https://www.activecampaign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-primary transition-colors duration-300 hover:text-white"
          >
            ActiveCampaign
          </a>{' '}
          마케팅 플랫폼과 자동 연동하여, 사용자 동의를 바탕으로 이메일 마케팅에 효과적으로 활용할 수 있는 구조를
          구현했어요.
        </>,
      ],
    },
    {
      title: '블루투스를 통한 뷰티 디바이스 제어',
      lists: [
        '한 번 연결한 디바이스는 리스트에 남아 관리할 수 있도록 하였고, 동시에 하나의 디바이스만 연결할 수 있도록 하여 안정적인 제어를 보장해요.',
      ],
    },
    {
      title: '미리 정의된 프리셋 모드 + 커스텀 모드 기능',
      lists: [
        '세 가지 기본 제공 모드 외에도, 사용자가 원하는 시간, 펄스 강도, LED 강도 등을 자유롭게 설정하여 커스텀 모드를 구성할 수 있도록 했어요.',
      ],
    },
    {
      title: '이력 자동 저장 및 관리 기능',
      lists: [
        '모드 실행 시 타이머 시작과 함께 해당 기록이 API를 통해 자동 저장되며, 사용자는 자신의 사용 이력을 확인하고 관리할 수 있어요.',
      ],
    },
    {
      title: '이력 기반 재사용 기능',
      lists: [
        '이력에서 사용한 모드를 선택하면 해당 모드 페이지로 이동해 다시 실행할 수 있으며, 커스텀 모드 역시 사용 당시의 세부 설정 그대로 실행돼요.',
      ],
    },
    {
      title: '커스텀 프리셋 모드 기능',
      lists: ['커스텀 모드를 저장하여 추후 다시 사용할 수 있도록 했어요.'],
    },
  ],
  hardTasks: [
    {
      title: '해외 기업과의 협업',
      problems: ['처음에는 영업팀을 거쳐 일본 측과 소통하다 보니 전달 과정에서 오류가 많았고 일정이 지연됐어요.'],
      solutions: [
        '제가 JLPT N1을 가지고 있어서 직접 일본 측과 소통하겠다고 제안했고, 이후부터는 제가 바로 소통을 맡았어요.',
        '개발자가 직접 기능 목적과 구현 방식을 설명하다 보니 요구사항이 명확해지고 피드백 속도도 빨라졌어요.',
      ],
      learningPoints: [
        '언어 능력 자체가 답은 아니지만, 직접 소통을 통해 신뢰와 속도를 높일 수 있다는 걸 배웠어요.',
        '기술적인 설명을 직접 전달하면서 개발자와 클라이언트 사이의 간극을 줄일 수 있다는 자신감을 얻었어요.',
      ],
    },
    {
      title: 'Flutter의 크로스 플랫폼 지원',
      problems: [
        'iOS에서는 잘 되는데 Android에서는 권한 문제 등으로 안 되는 경우가 있었어요.',
        '에뮬레이터에서는 문제없는데 실제 기기(Android 12 이상)에서만 오류가 나는 경우가 있었어요.',
        'iOS는 위치 권한 없이 BLE 스캔이 되는데, Android는 권한 요청과 GPS 활성화가 필요했어요.',
      ],
      solutions: [
        <>
          에뮬레이터뿐만 아니라 다양한 실기기를 이용해 테스트할 수 있도록{' '}
          <a
            href="https://www.dctestlab.or.kr/u/testbed/install.do"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-primary transition-colors duration-300 hover:text-white"
          >
            온라인 테스트베드 : 메타버스 테스트 랩
          </a>
          을 활용해 테스트 범위를 확대했어요.
        </>,
      ],
      learningPoints: [
        '크로스 플랫폼이라고 해도 OS별 동작 차이를 잘 이해하고 있어야 한다는 걸 배웠어요.',
        '문제 원인을 분석하고 해결하는 과정에서 문제 해결 능력이 많이 늘었어요.',
      ],
    },
    {
      title: 'BLE 개발',
      problems: [
        '블루투스 리스트에서 기기를 선택하고 자동으로 연결하게 하는데 많은 어려움이 있었어요.',
        '일정 시간이 지나 화면이 꺼지면, 백그라운드에서 커맨드 전송이 되지 않았어요.',
      ],
      solutions: [
        <>
          블루투스 정보를 리스트에 저장해두고, 선택 시 바로 <code>connect()</code> 하도록 했어요.
        </>,
        <>
          <code>wakelock</code> 라이브러리를 사용해 화면이 꺼지지 않도록 했어요.
        </>,
      ],
      learningPoints: [
        <>
          BLE 통신은 단순히 <code>connect()</code>가 아니라 스캔, 연결, 서비스 탐색, 데이터 송수신 등 여러 단계를
          거친다는 걸 직접 경험했어요.
        </>,
        '안정적인 연결 로직을 설계하는 감각을 익혔고, 시스템 자원 제약에 대응하는 방법도 배웠어요.',
      ],
    },
  ],
  results: [
    {
      title: '협업 관계 강화 및 신뢰 구축',
      lists: ['일본 기업과 직접 소통하면서 신뢰를 얻었고, 이후 다른 프로젝트(APL)로 이어질 기회를 만들었어요.'],
    },
    {
      title: '브랜드 및 제품 홍보 효과',
      lists: ['도쿄 뷰티 월드 전시회에서 애플리케이션과 연동한 시연을 진행해서 제품 홍보 효과를 높였어요.'],
    },
  ],

  uiPoint: [
    {
      title: '브랜드 톤&매너 재정의',
      lists: [
        '초기 제공된 흑백 위주의 러프한 UI 시안을 기반으로, 컬러·타이포·컴포넌트 스케일을 재설계했어요.',
        '컴포넌트 시스템(버튼/카드/폼)을 통일해 화면 간 일관성을 확보하고 시각적 위계를 명확히 했어요.',
      ],
    },
    {
      title: '제스처 간섭 최소화(iOS 홈 인디케이터 대응)',
      lists: [
        'iOS에서 하단 스와이프 제스처(홈/시리)와 충돌하지 않도록 주요 하단 버튼의 위치를 상향 배치했어요.',
        'Safe Area를 고려해 하단 여백을 확보하고, 제스처 영역과 터치 타깃이 겹치지 않도록 레이아웃을 조정했어요.',
      ],
    },
    {
      title: '터치 타깃 확대 & 오조작 방지',
      lists: [
        '커스텀 모드의 +/− 컨트롤은 미적 기준을 유지하되, 실제 터치 영역을 확장(최소 44pt 이상)해 약간 빗나가도 반응하도록 했어요.',
        '연속 탭 시 값이 과도하게 변하지 않도록 단일 스텝·가속 규칙을 분리했어요.',
      ],
    },
    {
      title: '가입 퍼널 설계(단계적 진행)',
      lists: [
        '회원가입을 단계별 퍼널로 분리(정보 입력 → 동의 → 검증)해 인지 부하를 낮추고 이탈 지점을 줄였어요.',
        '각 단계에 진행 표시(스텝 인디케이터)와 검증 에러의 인라인 피드백을 제공해 수정 흐름을 자연스럽게 했어요.',
      ],
    },
    {
      title: 'BLE 컨트롤 신뢰성 UX',
      lists: [
        '연결/해제/재시도 상태를 명확히 구분(스피너·상태 배지·비활성화)하고, 실패 시 원인과 대안을 함께 제시했어요.',
        '최근 연결 기기를 리스트로 보관해 재연결을 단순화하고, 연결 중에는 중복 액션을 잠가 충돌을 방지했어요.',
      ],
    },
    {
      title: '다국어·지역화 대응',
      lists: [
        '문구 길이 차이를 고려해 버튼/레이블에 여유 폭을 주고 줄바꿈 규칙을 정의했어요.',
        '날짜·숫자 포맷을 로케일에 맞춰 표기해 혼선을 줄였어요.',
      ],
    },
  ],

  content: (
    <>
      <div className="grid grid-cols-5 gap-2">
        <Image alt="image01" src="https://dandanae.github.io/images/012-01.png" width={1290} height={2796} />
        <Image alt="image02" src="https://dandanae.github.io/images/012-02.png" width={1290} height={2796} />
        <Image alt="image03" src="https://dandanae.github.io/images/012-03.png" width={1290} height={2796} />
        <Image alt="image04" src="https://dandanae.github.io/images/012-04.png" width={1290} height={2796} />
        <Image alt="image05" src="https://dandanae.github.io/images/012-05.png" width={1290} height={2796} />
        <Image alt="image06" src="https://dandanae.github.io/images/012-06.png" width={1290} height={2796} />
        <Image alt="image07" src="https://dandanae.github.io/images/012-07.png" width={1290} height={2796} />
        <Image alt="image08" src="https://dandanae.github.io/images/012-08.png" width={1290} height={2796} />
        <Image alt="image09" src="https://dandanae.github.io/images/012-09.png" width={1290} height={2796} />
        <Image alt="image10" src="https://dandanae.github.io/images/012-10.png" width={1290} height={2796} />
      </div>
    </>
  ),
};
