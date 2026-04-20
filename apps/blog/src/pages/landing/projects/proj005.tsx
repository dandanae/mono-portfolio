import { Project } from './types';

export const proj005: Project = {
  id: 'proj005',
  tags: ['Flutter'],
  title: '뷰티플레이스 애플리케이션',
  subtitle: '뷰티플레이스 애플리케이션의의 유지보수와 신규 기능 개발을 맡았어요.',
  challenge: '플레이스토어, 앱스토어 업로드',
  date: '2023. 09 ~ 2025. 07',
  image:
    'https://play-lh.googleusercontent.com/4W6KFicvsxUKKW54x_e_VTC2o-HNdDplvua4UGGsUAq1aGh5qbnshpypAaGzTqt6TGBI=w240-h480-rw',
  links: [
    {
      title: 'Beauty Place - Google Play 앱',
      href: 'https://play.google.com/store/apps/details?id=com.pieapp.BeautyPlace&pcampaignid=web_share',
    },
    {
      title: 'App Store에서 제공하는 BeautyPlace',
      href: 'https://apps.apple.com/kr/app/beautyplace/id1562621370',
    },
  ],
  libraries: [],
  role: '유지보수와 신규 기능 개발을 담당했어요.',

  tasks: [
    {
      title: '애플리케이션 기능 개선',
      lists: [
        '패키지를 최신화하고 오류 수정',
        '전화번호 인증 기능 개선',
        '회원 탈퇴와 비밀번호 변경 기능 추가',
        '상품 상세 이동 기능을 구현',
        '스토어 배포까지 경험',
      ],
    },
  ],
  hardTasks: [
    {
      title: '패키지 호환성과 인증',
      problems: ['패키지 버전 차이로 충돌과 오류가 자주 발생했어요.', '전화번호 인증 과정에서 실패율이 높았어요.'],
      solutions: [
        '패키지를 최신화하고 호환성을 확인했어요.',
        '인증 실패 원인을 로그로 추적해 API 요청 로직을 개선했어요.',
      ],
      learningPoints: [
        '패키지 관리와 애플리케이션 배포 프로세스를 경험했어요.',
        'UI 디테일 개선이 사용자 만족에 직접적으로 연결된다는 걸 느꼈어요.',
      ],
    },
  ],
  results: [
    {
      title: '안정성 강화',
      lists: ['앱의 안정성과 편의성을 높여 고객 불만을 줄이고 사용자 만족을 향상시켰어요.'],
    },
  ],

  content: (
    <>
      <img src="https://www.pie.co.kr/assets/image/product/sunlike/mobile.png" />
    </>
  ),
};
