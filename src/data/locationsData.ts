import { DistrictGuide } from '../types';

export const DISTRICTS_GUIDE: DistrictGuide[] = [
  {
    id: 'district-yongsan',
    name: '용산 · 한남',
    subName: 'Yongsan & Hannam Prestige',
    highlight: '배산임수 전통의 최고 부촌 & 용산국제업무지구 미래가치',
    description: '남산을 등지고 한강을 굽어보는 전형적인 배산임수 명당으로 정재계 인사, 외교관, 톱스타들의 주거 선호도 1위 지역입니다. 나인원한남, 한남더힐, 유엔빌리지 등 프라이버시가 철저히 보장되는 하이엔드 저밀도 주거단지가 밀집해 있으며, 용산민족공원과 용산국제업무지구 개발로 서울의 새로운 글로벌 센트럴파크로 도약하고 있습니다.',
    avgSalePyeongPrice: '평당 1억 3,500만원',
    avgJeonsePyeongPrice: '평당 6,500만원',
    schoolGrade: '용산국제학교(YISS), 독일학교, 한남초',
    lifestyle: '이태원·한남동 파인다이닝, 리움미술관, 한강공원',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    tags: ['전통부촌', '용산국제업무', '한강조망', '철저한보안'],
    landmarkComplexes: ['나인원 한남', '한남더힐', '유엔빌리지 루시드하우스', '파르크 한남']
  },
  {
    id: 'district-gangnam',
    name: '강남 · 청담 · 압구정',
    subName: 'Cheongdam & Apgujeong Luxury Belt',
    highlight: '대한민국 하이퍼엔드 주거의 정점 & 명품 패션 1번지',
    description: '대한민국 부의 기준이자 명품 갤러리아, 청담 명품거리, 최고급 클리닉이 집약된 핵심 축입니다. 압구정 현대아파트의 70층 초고층 재건축이 본궤도에 올랐으며, PH129, 에테르노 청담 등 영구 한강뷰를 품은 하이퍼엔드 주거가 계속해서 신고가를 경신하고 있습니다.',
    avgSalePyeongPrice: '평당 1억 5,000만원',
    avgJeonsePyeongPrice: '평당 7,200만원',
    schoolGrade: '압구정초·중·고, 청담초·중·고, 현대고',
    lifestyle: '갤러리아백화점, 도산공원 카페거리, 청담 파인다이닝',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    tags: ['하이퍼엔드', '압구정재건축', '청담명품거리', '한강조망'],
    landmarkComplexes: ['PH129 더 펜트하우스', '압구정 현대 7차', '에테르노 청담', '상지리츠빌 카일룸']
  },
  {
    id: 'district-seongsu',
    name: '성동 · 성수',
    subName: 'Seongsu Creative & Waterfront',
    highlight: '서울숲 35만평 녹지와 초고층 한강뷰의 크리에이티브 부촌',
    description: '서울의 브루클린으로 시작해 글로벌 명품 플래그십과 테크 유니콘 기업들이 모여드는 가장 역동적인 하이엔드 지역입니다. 아크로서울포레스트, 갤러리아포레, 트리마제가 형성한 삼각 랜드마크 벨트는 도심 속에서 서울숲 녹지와 한강 물결을 동시에 품는 독보적인 주거 경험을 제공합니다.',
    avgSalePyeongPrice: '평당 1억 2,000만원',
    avgJeonsePyeongPrice: '평당 5,800만원',
    schoolGrade: '경일초·중·고, 성수초·고',
    lifestyle: '서울숲 산책로, 성수동 아틀리에, 디올 성수, 대림창고',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    tags: ['서울숲조망', '신흥부촌', '호텔식서비스', '영앤리치'],
    landmarkComplexes: ['아크로 서울포레스트', '트리마제', '갤러리아포레']
  },
  {
    id: 'district-seocho',
    name: '서초 · 반포',
    subName: 'Banpo Waterfront & Prestigious Schools',
    highlight: '대한민국 최고 명문 학군과 한강변 신축 랜드마크',
    description: '래미안원베일리, 아크로리버파크, 래미안퍼스티지로 이어지는 한강변 신축 아파트의 최강자입니다. 세화고·세화여고 등 전국 최고 수준의 명문 학군과 신세계백화점 강남점, 가톨릭대 서울성모병원, 고속터미널 사통팔달 교통망이 완벽한 인프라를 완성합니다.',
    avgSalePyeongPrice: '평당 1억 4,000만원',
    avgJeonsePyeongPrice: '평당 6,800만원',
    schoolGrade: '세화고, 세화여고, 반포초·중, 계성초',
    lifestyle: '반포한강공원 달빛무지개분수, 신세계 강남점, 파미에스테이션',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80',
    tags: ['한강변대장주', '세화학군', '신세계강남', '사통팔달'],
    landmarkComplexes: ['래미안 원베일리', '아크로 리버파크', '래미안 퍼스티지', '메이플자이']
  },
  {
    id: 'district-songpa',
    name: '송파 · 잠실',
    subName: 'Jamsil Lake & Global MICE',
    highlight: '롯데월드타워 스카이라인 & 잠실 스포츠·MICE 복합단지',
    description: '123층 롯데월드타워와 석촌호수의 사계절 낭만을 품은 동남권 허브입니다. 시그니엘 레지던스를 중심으로 한 초고층 럭셔리 라이프와 엘스, 리센츠 등 대단지 아파트 인프라가 공존하며, 영동대로 복합환승센터 및 잠실 돔구장 MICE 개발의 직접적인 수혜지입니다.',
    avgSalePyeongPrice: '평당 9,500만원',
    avgJeonsePyeongPrice: '평당 4,800만원',
    schoolGrade: '잠실초·중·고, 잠신중·고, 영동일고',
    lifestyle: '석촌호수 카페거리, 롯데월드몰, 송리단길, 올림픽공원',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    tags: ['롯데월드타워', '석촌호수', '잠실MICE', '초고층뷰'],
    landmarkComplexes: ['롯데월드타워 시그니엘', '잠실 엘스', '리센츠', '잠실 래미안아이파크']
  },
  {
    id: 'district-gwangju',
    name: '광주 · 봉선',
    subName: 'Gwangju Bongseon Elite Education',
    highlight: '호남 최고 명문 학원가 1번지 & 제석산 친환경 숲세권',
    description: '광주의 대치동으로 전국적인 명성을 가진 봉선동은 의대 및 명문대 진학률 최상위 학군과 수백 개의 대형 학원가가 밀집한 교육 특구입니다. 제석산의 쾌적한 자연과 함께 한국아델리움 등 대형 평형 위주의 하이엔드 주거가 탄탄한 실수요와 자산가층을 형성하고 있습니다.',
    avgSalePyeongPrice: '평당 3,200만원',
    avgJeonsePyeongPrice: '평당 1,800만원',
    schoolGrade: '문성고, 대성여고, 동아여고, 조봉초',
    lifestyle: '봉선동 학원가, 유안근린공원, 제석산 등산로',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    tags: ['호남1등학군', '의치한진학', '대형펜트', '광주지하철2호선'],
    landmarkComplexes: ['봉선 한국아델리움', '봉선 제일풍경채', '남양휴튼']
  }
];
