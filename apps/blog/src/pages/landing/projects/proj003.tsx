import { Project } from './types';

export const proj003: Project = {
  id: 'proj003',
  tags: ['AWS'],
  title: '사내 Rest API 유지보수',
  subtitle: '운영 중인 Rest API의 유지보수와 신규 기능 개발을 담당했어요.',
  challenge: 'AWS(EC2)',
  date: '2023. 06 ~ 2025. 07',
  image: '',
  links: [{ title: 'PIE PARTNER', href: 'https://partner.pie.co.kr/' }],
  libraries: [],
  role: '유지보수와 추가 기능 개발을 담당했어요.',

  tasks: [
    {
      title: '보안과 편의 기능 개선',
      lists: [
        '결과 페이지에 생년월일 인증을 추가해 보안성 강화',
        '회원 탈퇴 기능과 아이템 그룹 복사 기능 개발',
        '운영 중 발생한 API 관련 버그 지속적 수정',
      ],
    },
  ],
  hardTasks: [
    {
      title: '이미지 보안 이슈',
      problems: [
        <>
          S3에 업로드된 이미지의 경로가 <code>bucket 이름</code>을 포함하여 노출되고 있었어요.
        </>,
      ],
      solutions: [
        <>
          php 파일이라 따로 관리하기에 어려움이 있어, <code>image.php</code> 파일을 따로 만들어 이미지 파일을
          분리했어요.
        </>,
      ],
      learningPoints: ['보안을 강화하고, 사용자에게 안전하게 데이터를 제공하는 방법을 익혔어요.'],
    },
    {
      title: '운영 환경',
      problems: ['AWS EC2, S3 환경에서의 접근 제어와 로그 관리가 미숙했어요.'],
      solutions: [
        <>
          <code>AWS EC2</code> 기반 환경에서 <code>WinSCP</code>와 키 페어, 퍼미션 설정을 다루며 실제 서버 접근과 파일을
          전송했어요.
        </>,
        <>
          DB 관리를 <code>DBeaver</code>로 일원화하여 운영 효율을 높였어요.
        </>,
      ],
      learningPoints: [
        <>
          운영 DB에 직접 접근하여 데이터 확인·수정 및 SQL 쿼리 작성을 하면서, 서비스 운영 관점의 데이터 흐름을
          이해했어요.
        </>,
      ],
    },
  ],
  results: [
    {
      title: '안정적인 API 운영',
      lists: ['API 보안성을 높이고 신규 기능을 제공해 서비스 만족도를 높였어요.'],
    },
  ],

  // content: <></>,
};
