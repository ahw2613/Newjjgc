import { Property, AgentInfo } from '../types';

export const PRINCIPAL_BROKERS: Record<string, AgentInfo> = {
  luxury_team: {
    name: '강태양 대표 공인중개사',
    title: '디 어드레스 대표 / 하이엔드 전담 파트너',
    phone: '02-588-7740',
    mobile: '010-3891-9981',
    email: 'ty.kang@theaddress.co.kr',
    kakaoId: 'theaddress_vip',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    licenseNumber: '제11680-2018-00214호',
    experienceYears: 16
  },
  residential_lead: {
    name: '정유진 수석 이사',
    title: '용산·성수 프라이빗 매칭 디렉터',
    phone: '02-588-7741',
    mobile: '010-8204-7119',
    email: 'yj.jung@theaddress.co.kr',
    kakaoId: 'yj_luxury_realty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    licenseNumber: '제11650-2019-00188호',
    experienceYears: 12
  },
  commercial_lead: {
    name: '박민우 본부장',
    title: '상업용 부동산 & 빌딩 매입매각 총괄',
    phone: '02-588-7742',
    mobile: '010-9931-4502',
    email: 'mw.park@theaddress.co.kr',
    kakaoId: 'theaddress_building',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    licenseNumber: '제11680-2020-00302호',
    experienceYears: 14
  }
};

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'addr-01',
    titleKo: '나인원 한남 펜트하우스 듀플렉스',
    subTitle: '최고급 프라이빗 테라스 & 남산·한강 파노라마 파크뷰',
    region: '서울시 용산구 한남동',
    district: '용산/한남',
    addressShort: '한남대로 91',
    roadAddress: '서울특별시 용산구 한남대로 91 (한남동)',
    listingType: 'sale',
    propertyType: 'luxury_villa',
    price: 1350000, // 135억
    exclusivePyeong: 74,
    supplyPyeong: 101,
    exclusiveAreaM2: 244.72,
    supplyAreaM2: 334.2,
    rooms: 5,
    baths: 4,
    parking: 4,
    floor: 9,
    totalFloors: 9,
    direction: '남향',
    builtYear: 2019,
    moveInDate: '즉시 입주 (협의 가능)',
    maintenanceCost: 180,
    maintenanceCostDesc: '공용관리비, 보안, 피트니스 및 수영장 이용 포함',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '대한민국 하이엔드 주거의 정점에 서 있는 나인원 한남 최상층 펜트하우스 세대입니다. 2개 층 복층 구조와 단독 루프탑 가든 테라스를 갖추고 있어 완벽한 도심 속 독립적인 휴식을 선사합니다. 24시간 보안 시스템과 호텔급 컨시어지, 입주민 전용 인도어 골프레인지, 온수풀, 게스트하우스, 와인 라운지가 구비되어 있습니다. 유명 인사 및 글로벌 자산가 선호도 1위 단지입니다.',
    features: [
      '단독 루프탑 가든 테라스',
      '남산 & 한강 더블 조망권',
      '지하 단독 지정주차 4대',
      '마스터존 독립 드레스룸',
      '밀레·불탑 최고급 가전 풀빌트인',
      '24시간 게이티드 철통보안',
      '호텔식 조식 & 클럽하우스'
    ],
    schools: [
      { name: '서울한남초등학교', type: '초등', distance: '도보 4분', ratingNote: '용산 핵심 명문 공립초' },
      { name: '서울용산국제학교 (YISS)', type: '국제학교', distance: '차량 6분', ratingNote: '외교관 및 글로벌 자녀 최고 선호' },
      { name: '오산중·고등학교', type: '고등', distance: '차량 5분', ratingNote: '전통 명문 사립' }
    ],
    subway: {
      station: '한강진역 (6호선) / 한남역 (경의중앙선)',
      walkMinutes: 7,
      lines: ['6호선', '경의중앙선']
    },
    isVipExclusive: true,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.luxury_team,
    coordinates: { lat: 37.5348, lng: 127.0062 }
  },
  {
    id: 'addr-02',
    titleKo: '아크로 서울포레스트 하이라이즈 한강뷰',
    subTitle: '서울숲 영구 조망과 파노라마 아트프레임 창호',
    region: '서울시 성동구 성수동1가',
    district: '성동/성수',
    addressShort: '왕십리로 83-21',
    roadAddress: '서울특별시 성동구 왕십리로 83-21 (성수동1가)',
    listingType: 'sale',
    propertyType: 'apartment',
    price: 980000, // 98억
    exclusivePyeong: 60,
    supplyPyeong: 77,
    exclusiveAreaM2: 198.21,
    supplyAreaM2: 254.6,
    rooms: 4,
    baths: 3,
    parking: 3,
    floor: 38,
    totalFloors: 49,
    direction: '남서향',
    builtYear: 2020,
    moveInDate: '2026년 하반기 즉시 입주 협의',
    maintenanceCost: 130,
    maintenanceCostDesc: '관리규약에 따른 실비 부과, 피트니스 및 발렛 포함',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '성수동의 랜드마크 아크로 서울포레스트 로열층 세대입니다. 서울숲 35만 평의 녹지와 한강을 한눈에 담아내는 270도 파노라마 코너 창호 설계를 자랑합니다. T자형 평면 구조로 채광과 통풍이 극대화되어 있으며, 3.3m의 웅장한 층고와 서브제로 냉장고, 가게나우 오븐 등 전 세계 최고급 프리미엄 자재로 시공되었습니다. 갤러리아포레, 트리마제와 함께 성수동 하이엔드 벨트의 대표작입니다.',
    features: [
      '서울숲 & 한강 270도 파노라마 뷰',
      '층고 3.3m 아트리움 개방감',
      '클럽하우스 & 프라이빗 게스트룸',
      '수인분당선 서울숲역 지하 직결',
      '전 세대 지하 개별 창고 제공',
      '서브제로/가게나우 명품 주방'
    ],
    schools: [
      { name: '경일초등학교', type: '초등', distance: '도보 6분', ratingNote: '안심 통학로' },
      { name: '경일중·고등학교', type: '고등', distance: '도보 8분', ratingNote: '도보 통학 우수' }
    ],
    subway: {
      station: '서울숲역 (수인분당선 단지 지하 직통) / 뚝섬역 (2호선)',
      walkMinutes: 1,
      lines: ['수인분당선', '2호선']
    },
    isVipExclusive: false,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 37.5441, lng: 127.0445 }
  },
  {
    id: 'addr-03',
    titleKo: 'PH129 더 펜트하우스 청담',
    subTitle: '전 세대 복층형 한강 파노라마 뷰 하이퍼엔드 레지던스',
    region: '서울시 강남구 청담동',
    district: '강남/청담',
    addressShort: '영동대로 740',
    roadAddress: '서울특별시 강남구 영동대로 740 (청담동)',
    listingType: 'sale',
    propertyType: 'luxury_villa',
    price: 1650000, // 165억
    exclusivePyeong: 82,
    supplyPyeong: 120,
    exclusiveAreaM2: 273.96,
    supplyAreaM2: 396.6,
    rooms: 5,
    baths: 4,
    parking: 5,
    floor: 16,
    totalFloors: 20,
    direction: '남동향',
    builtYear: 2020,
    moveInDate: '즉시 입주 (사전 예약 투어)',
    maintenanceCost: 220,
    maintenanceCostDesc: '최고급 보안 경비, 세대별 전용 엘리베이터 홀 관리비 포함',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '대한민국 공시가격 1위를 다투는 최상위 0.01%를 위한 하이퍼엔드 주거 PH129(더 펜트하우스 청담)입니다. 전 세대가 보이드(Void) 복층 구조로 설계되어 6.7m에 달하는 거실 층고를 통해 영동대교와 한강 수평선을 시원하게 조망할 수 있습니다. 각 세대 전용 프라이빗 엘리베이터 드롭오프 존 및 세대당 5대 이상의 여유로운 광폭 주차 공간을 제공합니다.',
    features: [
      '거실 보이드 층고 6.7m 복층 설계',
      '영구 한강 조망권 (영동대교 뷰)',
      '세대 전용 단독 엘리베이터 승강장',
      '지정 주차 5대 (슈퍼카 및 대형 SUV 여유)',
      '최고급 피트니스 & 스크린 골프',
      '철저한 보안 및 사생활 차단 설계'
    ],
    schools: [
      { name: '청담초등학교', type: '초등', distance: '도보 7분', ratingNote: '강남 명문 초등' },
      { name: '청담중·고등학교', type: '고등', distance: '도보 9분', ratingNote: '우수 진학 명문' }
    ],
    subway: {
      station: '청담역 (7호선) / 압구정로데오역 (수인분당선)',
      walkMinutes: 8,
      lines: ['7호선', '수인분당선']
    },
    isVipExclusive: true,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.luxury_team,
    coordinates: { lat: 37.5255, lng: 127.0543 }
  },
  {
    id: 'addr-04',
    titleKo: '한남더힐 테라스 하우스 전세',
    subTitle: '배산임수 명당의 정원 품은 저층 테라스형 프라이빗 주거',
    region: '서울시 용산구 한남동',
    district: '용산/한남',
    addressShort: '독서당로 111',
    roadAddress: '서울특별시 용산구 독서당로 111 (한남동)',
    listingType: 'jeonse',
    propertyType: 'luxury_villa',
    price: 450000, // 전세 45억
    deposit: 450000,
    exclusivePyeong: 70,
    supplyPyeong: 91,
    exclusiveAreaM2: 233.06,
    supplyAreaM2: 300.8,
    rooms: 4,
    baths: 3,
    parking: 3,
    floor: 2,
    totalFloors: 6,
    direction: '남동향',
    builtYear: 2011,
    moveInDate: '2026년 10월 입주 가능',
    maintenanceCost: 150,
    maintenanceCostDesc: '커뮤니티 및 단지 정원 조경 관리 포함',
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '도심 속 대저택 리조트 같은 정취를 자랑하는 한남더힐의 희소한 테라스 세대 전세 매물입니다. 거실과 마스터룸에서 바로 연결되는 단독 테라스 가든에서 계절의 변화를 감상할 수 있습니다. 단지 전체에 세계적인 예술가들의 조각품과 수령 수백 년의 수목이 어우러져 있으며, 쿠사마 야요이 등 미술관 수준의 갤러리 커뮤니티가 운영 중입니다.',
    features: [
      '단독 전용 가든 테라스 보유',
      '배산임수 전통 부촌 명당',
      '단지 내 수영장, 골프, 사우나, 스파',
      '동간 거리 극대화로 프라이버시 보장',
      '지하 창고 및 세대당 주차 3대'
    ],
    schools: [
      { name: '한남초등학교', type: '초등', distance: '도보 5분', ratingNote: '안심 통학' },
      { name: '독일국제학교', type: '국제학교', distance: '차량 4분', ratingNote: '주한 외국인 및 특례 학군' }
    ],
    subway: {
      station: '옥수역 (3호선, 경의중앙선) / 한남역',
      walkMinutes: 10,
      lines: ['3호선', '경의중앙선']
    },
    isVipExclusive: false,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 37.5369, lng: 127.0118 }
  },
  {
    id: 'addr-05',
    titleKo: '래미안 원베일리 로열동 한강뷰 랜드마크',
    subTitle: '반포 대장주 신축 한강변 파노라마 조망 전세',
    region: '서울시 서초구 반포동',
    district: '서초/반포',
    addressShort: '반포대로 333',
    roadAddress: '서울특별시 서초구 반포대로 333 (반포동)',
    listingType: 'jeonse',
    propertyType: 'apartment',
    price: 230000, // 전세 23억
    deposit: 230000,
    exclusivePyeong: 35,
    supplyPyeong: 46,
    exclusiveAreaM2: 116.8,
    supplyAreaM2: 152.0,
    rooms: 4,
    baths: 2,
    parking: 2,
    floor: 28,
    totalFloors: 35,
    direction: '북한강뷰',
    builtYear: 2023,
    moveInDate: '즉시 입주 협의',
    maintenanceCost: 45,
    maintenanceCostDesc: '일반관리비 및 커뮤니티 이용료 포함',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '신반포 랜드마크 래미안 원베일리 최상급 한강 조망 로열층 전세 매물입니다. 거실에서 한강 물결과 남산타워가 정면으로 바라보이며, 신반포역(9호선)과 고속터미널역(3, 7, 9호선)을 도보로 이용 가능한 트리플 역세권입니다. 스카이라운지, 수영장, 사우나, 북카페 등 하이엔드 어메니티와 반포한강공원 전용 나들목이 연결되어 있습니다.',
    features: [
      '정면 한강 & 남산타워 파노라마 뷰',
      '신반포역 도보 3분 초역세권',
      '반포한강공원 직통 보행 나들목',
      '스카이브릿지 라운지 & 인피니티풀',
      '신세계백화점 강남점 슬세권'
    ],
    schools: [
      { name: '잠원초등학교', type: '초등', distance: '도보 3분', ratingNote: '단지 초품아 안심 통학' },
      { name: '세화여중·세화여고·세화고', type: '고등', distance: '도보 10분', ratingNote: '강남 서초 최고의 명문 자사고 학군' }
    ],
    subway: {
      station: '신반포역 (9호선) / 고속터미널역 (3·7·9호선)',
      walkMinutes: 3,
      lines: ['9호선', '3호선', '7호선']
    },
    isVipExclusive: false,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 37.5052, lng: 127.0016 }
  },
  {
    id: 'addr-06',
    titleKo: '성수 트리마제 호텔식 컨시어지 럭셔리 월세',
    subTitle: '호텔식 조식 서비스와 한강 조망 풀옵션 월세',
    region: '서울시 성동구 성수동1가',
    district: '성동/성수',
    addressShort: '왕십리로 16',
    roadAddress: '서울특별시 성동구 왕십리로 16 (성수동1가)',
    listingType: 'rent',
    propertyType: 'apartment',
    price: 30000, // 보증금 3억 / 월 950만
    deposit: 30000,
    monthlyRent: 950,
    exclusivePyeong: 41,
    supplyPyeong: 56,
    exclusiveAreaM2: 136.56,
    supplyAreaM2: 185.1,
    rooms: 3,
    baths: 2,
    parking: 2,
    floor: 32,
    totalFloors: 47,
    direction: '남향',
    builtYear: 2017,
    moveInDate: '2026년 11월 초 입주 협의',
    maintenanceCost: 65,
    maintenanceCostDesc: '기본 관리비 (조식, 세탁 딜리버리, 발렛 이용료 별도정산)',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '성수동의 시그니처 랜드마크 트리마제의 고층 한강 조망 세대입니다. 남향으로 막힘없는 영구 한강 조망을 만끽할 수 있으며, 조식 뷔페, 하우스키핑, 세탁 딜리버리, 발렛파킹 등 최고급 호텔식 서비스를 일상에서 누릴 수 있습니다. 대형 인도어 골프연습장과 사우나, 스파가 완비되어 연예인과 크리에이터들이 가장 선호하는 단지입니다.',
    features: [
      '호텔식 조식 서비스 & 발렛파킹',
      '파노라마 남향 한강 조망권',
      '대형 실내 골프연습장 & 사우나',
      '강변북로, 올림픽대로 즉각 진입',
      '풀옵션 시스템에어컨 & 빌트인'
    ],
    schools: [
      { name: '경수초·경수중', type: '초등', distance: '도보 5분', ratingNote: '도보 통학' }
    ],
    subway: {
      station: '서울숲역 (수인분당선)',
      walkMinutes: 5,
      lines: ['수인분당선']
    },
    isVipExclusive: false,
    isHot: false,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 37.5388, lng: 127.0422 }
  },
  {
    id: 'addr-07',
    titleKo: '압구정 현대 7차 재건축 핵심 로열동',
    subTitle: '대한민국 재건축 대장 압구정 특별계획구역 알짜 지분',
    region: '서울시 강남구 압구정동',
    district: '강남/청담',
    addressShort: '압구정로 201',
    roadAddress: '서울특별시 강남구 압구정로 201 (압구정동)',
    listingType: 'sale',
    propertyType: 'apartment',
    price: 820000, // 82억
    exclusivePyeong: 59,
    supplyPyeong: 65,
    exclusiveAreaM2: 196.2,
    supplyAreaM2: 214.8,
    rooms: 5,
    baths: 2,
    parking: 2,
    floor: 8,
    totalFloors: 14,
    direction: '남향',
    builtYear: 1978,
    moveInDate: '전세 안고 매매 or 실입주 협의',
    maintenanceCost: 55,
    maintenanceCostDesc: '중앙난방 및 일반관리비 포함',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '대한민국 부의 상징이자 신속통합기획 70층 재건축이 본격화되고 있는 압구정 3구역 현대 7차 59평형 매물입니다. 압구정역 도보 5분 거리의 로열동으로 대지지분이 넓어 향후 신축 시 최고급 한강변 펜트하우스 배정이 유력합니다. 현대백화점 본점, 갤러리아백화점, 압구정 로데오가 바로 인접하여 최상의 인프라를 누릴 수 있습니다.',
    features: [
      '압구정 3구역 신속통합 재건축 추진',
      '압구정역(3호선) 도보 5분 초역세권',
      '넓은 대지지분 보유 (투자가치 극대화)',
      '현대백화점 압구정본점 슬세권',
      '남향 판상형 5베이 구조'
    ],
    schools: [
      { name: '압구정초등학교', type: '초등', distance: '도보 3분', ratingNote: '단지 내 초등학교' },
      { name: '압구정중·고등학교', type: '고등', distance: '도보 5분', ratingNote: '전통의 강남 최고 명문' }
    ],
    subway: {
      station: '압구정역 (3호선)',
      walkMinutes: 5,
      lines: ['3호선']
    },
    isVipExclusive: true,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.luxury_team,
    coordinates: { lat: 37.5284, lng: 127.0305 }
  },
  {
    id: 'addr-08',
    titleKo: '롯데월드타워 시그니엘 레지던스 구름 위의 궁전',
    subTitle: '지상 68층 스카이 뷰와 6성급 호텔 어메니티 라이프',
    region: '서울시 송파구 신천동',
    district: '송파/잠실',
    addressShort: '올림픽로 300',
    roadAddress: '서울특별시 송파구 올림픽로 300 (신천동)',
    listingType: 'sale',
    propertyType: 'officetel',
    price: 880000, // 88억
    exclusivePyeong: 62,
    supplyPyeong: 88,
    exclusiveAreaM2: 205.3,
    supplyAreaM2: 290.9,
    rooms: 3,
    baths: 3,
    parking: 3,
    floor: 68,
    totalFloors: 123,
    direction: '남동향',
    builtYear: 2017,
    moveInDate: '즉시 입주 가능',
    maintenanceCost: 250,
    maintenanceCostDesc: '호텔식 방재, 피트니스, 조식 라운지, 발렛 기본 제공',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '세계 5대 초고층 랜드마크 롯데월드타워 68층에 위치한 시그니엘 레지던스입니다. 서울 시내 전역과 석촌호수, 한강, 아차산까지 발아래로 내려다보이는 초현실적인 조망을 자랑합니다. 롯데호텔 시그니엘의 룸서비스, 하우스키핑, 발렛파킹, 42층 클럽 시그니엘(피트니스, 수영장, 와인셀러, 티하우스)을 평생 VIP 회원 자격으로 누릴 수 있습니다.',
    features: [
      '지상 68층 압도적 스카이라인 뷰',
      '석촌호수 & 한강 더블 조망',
      '6성급 시그니엘 호텔 버틀러 서비스',
      '입주민 전용 42층 클럽 어메니티',
      '외풍 및 지진 진도 9.0 견디는 내진설계',
      '잠실역 지하 직결 (2, 8호선)'
    ],
    schools: [
      { name: '잠동초등학교', type: '초등', distance: '도보 7분', ratingNote: '송파 우수 초등' },
      { name: '잠실중·잠실고', type: '고등', distance: '도보 10분', ratingNote: '학업성취도 최상위' }
    ],
    subway: {
      station: '잠실역 (2호선, 8호선 지하 직통 연결)',
      walkMinutes: 1,
      lines: ['2호선', '8호선']
    },
    isVipExclusive: true,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.luxury_team,
    coordinates: { lat: 37.5126, lng: 127.1026 }
  },
  {
    id: 'addr-09',
    titleKo: '광주 봉선동 한국아델리움 로얄스위트 테라스',
    subTitle: '호남 최고 학군 1번지 봉선동 프라이빗 대형 펜트',
    region: '광주광역시 남구 봉선동',
    district: '광주/봉선',
    addressShort: '봉선중앙로 45',
    roadAddress: '광주광역시 남구 봉선중앙로 45 (봉선동)',
    listingType: 'sale',
    propertyType: 'apartment',
    price: 185000, // 18억 5,000만원
    exclusivePyeong: 55,
    supplyPyeong: 68,
    exclusiveAreaM2: 182.4,
    supplyAreaM2: 224.7,
    rooms: 4,
    baths: 3,
    parking: 3,
    floor: 15,
    totalFloors: 15,
    direction: '남향',
    builtYear: 2021,
    moveInDate: '2026년 가을 협의 입주',
    maintenanceCost: 38,
    maintenanceCostDesc: '일반관리비 및 단지 보안 포함',
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '광주의 대치동으로 불리는 봉선동 명문 학원가 중심에 자리잡은 한국아델리움 최상층 루프탑 테라스 세대입니다. 남향의 우수한 채광과 제석산 영구 숲 조망권을 누릴 수 있습니다. 문성고, 대성여고, 동아여고 등 의치한 진학률 최상위 학군에 도보 통학이 가능하며, 대형 55평형으로 3대 거주가 가능한 넉넉한 공간 구성을 제공합니다.',
    features: [
      '봉선동 명문 학원가 도보 2분',
      '제석산 영구 녹지 마운틴 뷰',
      '최상층 단독 테라스 가든',
      '세대당 광폭 주차 3대 보장',
      '광주 지하철 2호선(예정) 호재'
    ],
    schools: [
      { name: '조봉초등학교', type: '초등', distance: '도보 4분', ratingNote: '봉선동 최고 인기 초등' },
      { name: '문성중·문성고등학교', type: '고등', distance: '도보 7분', ratingNote: '전국 의대 진학률 명문 사립' }
    ],
    subway: {
      station: '광주 도시철도 2호선 봉선역(공사중, 도보 4분)',
      walkMinutes: 4,
      lines: ['광주2호선(예정)']
    },
    isVipExclusive: false,
    isHot: true,
    isFeatured: false,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 35.1278, lng: 126.9112 }
  },
  {
    id: 'addr-10',
    titleKo: '강남 테헤란로 역세권 신축 메디컬·사옥 빌딩',
    subTitle: '지하 1층~지상 8층, 전층 근생 완비 우량 임차 사옥',
    region: '서울시 강남구 역삼동',
    district: '강남/청담',
    addressShort: '테헤란로 152',
    roadAddress: '서울특별시 강남구 테헤란로 152길 (역삼동)',
    listingType: 'commercial',
    propertyType: 'commercial',
    price: 2900000, // 290억
    exclusivePyeong: 480,
    supplyPyeong: 680,
    exclusiveAreaM2: 1586.7,
    supplyAreaM2: 2247.9,
    rooms: 12,
    baths: 16,
    parking: 14,
    floor: 8,
    totalFloors: 8,
    direction: '남향',
    builtYear: 2024,
    moveInDate: '명도 완료 / 즉시 입주 및 임대승계 가능',
    maintenanceCost: 350,
    maintenanceCostDesc: '승강기 유지보수 및 기계식·자주식 주차 관리비',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '역삼역과 선릉역 사이 테헤란로 이면 코너에 2024년 신축된 하이엔드 사옥 및 메디컬 빌딩입니다. 대지면적 130평, 연면적 680평 규모로 현대적인 커튼월 외관과 옥상 하늘정원을 갖추고 있습니다. 전 층 층고 4.2m의 개방감과 14대 주차가 가능한 자주식/기계식 주차 시스템을 겸비하여 병의원, 바이오, IT 스타트업 본사 사옥으로 최적화되어 있습니다.',
    features: [
      '2024 준공 테헤란로 신축 코너 빌딩',
      '연면적 680평, 지하 1층~지상 8층',
      '전 층 층고 4.2m 시원한 개방감',
      '자주식 + 최신 기계식 주차 총 14대',
      '예상 연 임대수익률 4.2% 안정적 수익',
      '루프탑 스카이 가든 및 테라스'
    ],
    schools: [],
    subway: {
      station: '역삼역 (2호선) / 선릉역 (2호선, 수인분당선)',
      walkMinutes: 4,
      lines: ['2호선', '수인분당선']
    },
    isVipExclusive: true,
    isHot: true,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.commercial_lead,
    coordinates: { lat: 37.5008, lng: 127.0366 }
  },
  {
    id: 'addr-11',
    titleKo: '여의도 브라이튼 럭셔리 하이라이즈',
    subTitle: '더현대 서울 슬세권과 여의도 한강공원 파노라마 뷰',
    region: '서울시 영등포구 여의도동',
    district: '여의도/마포',
    addressShort: '국제금융로 39',
    roadAddress: '서울특별시 영등포구 국제금융로 39 (여의도동)',
    listingType: 'sale',
    propertyType: 'apartment',
    price: 420000, // 42억
    exclusivePyeong: 43,
    supplyPyeong: 58,
    exclusiveAreaM2: 142.1,
    supplyAreaM2: 191.7,
    rooms: 4,
    baths: 2,
    parking: 2,
    floor: 41,
    totalFloors: 49,
    direction: '남서향',
    builtYear: 2023,
    moveInDate: '2026년 10월 입주 협의',
    maintenanceCost: 50,
    maintenanceCostDesc: '일반관리비 및 조식 서비스, 피트니스 이용료',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '여의도의 새로운 스카이라인을 창조한 브라이튼 여의도 41층 초고층 세대입니다. 거실 전면에서 한강과 샛강 생태공원이 시원하게 펼쳐지며, 더현대 서울과 IFC몰이 바로 길 건너에 위치하여 쇼핑, 다이닝, 문화생활을 집 앞에서 모두 누릴 수 있습니다. 신라호텔 수준의 조식 서비스와 호텔식 게스트하우스가 운영 중입니다.',
    features: [
      '더현대 서울 & IFC몰 도보 1분 슬세권',
      '41층 초고층 한강 & 도심 시티뷰',
      '조식 딜리버리 및 케이터링 서비스',
      '여의도역(5, 9호선) & 여의나루역 더블 역세권',
      '유러피언 하이엔드 수입 주방가구'
    ],
    schools: [
      { name: '여의도초등학교', type: '초등', distance: '도보 6분', ratingNote: '여의도 중심 안심 통학' },
      { name: '여의도중·고등학교', type: '고등', distance: '도보 8분', ratingNote: '우수 학군' }
    ],
    subway: {
      station: '여의도역 (5호선, 9호선) / 여의나루역 (5호선)',
      walkMinutes: 4,
      lines: ['5호선', '9호선']
    },
    isVipExclusive: false,
    isHot: false,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.residential_lead,
    coordinates: { lat: 37.5251, lng: 126.9284 }
  },
  {
    id: 'addr-12',
    titleKo: '평창동 오운 갤러리 단독주택',
    subTitle: '북한산 자락 사계절 자연과 프라이빗 조각 정원의 대저택',
    region: '서울시 종로구 평창동',
    district: '용산/한남',
    addressShort: '평창문화로 120',
    roadAddress: '서울특별시 종로구 평창문화로 120 (평창동)',
    listingType: 'sale',
    propertyType: 'house',
    price: 680000, // 68억
    exclusivePyeong: 110,
    supplyPyeong: 180,
    exclusiveAreaM2: 363.6,
    supplyAreaM2: 595.0,
    rooms: 6,
    baths: 5,
    parking: 4,
    floor: 2,
    totalFloors: 2,
    direction: '남향',
    builtYear: 2022,
    moveInDate: '즉시 입주 협의',
    maintenanceCost: 90,
    maintenanceCostDesc: '개별 정원 조경 및 보안 무인경비 시스템',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '전통적인 부촌 평창동의 북한산 비봉을 마주하는 최고급 모던 갤러리 하우스입니다. 건축대상을 수상한 건축가의 작품으로 중정과 수공간, 150평 규모의 프라이빗 정원을 갖추고 있습니다. 지하에는 단독 갤러리 및 와인셀러, AV룸이 구비되어 있으며 실내 엘리베이터로 전 층이 연결됩니다. 기업 총수 및 문화예술계 거장을 위한 안식처입니다.',
    features: [
      '대지 210평, 연면적 180평 대저택',
      '북한산 비봉 마주하는 영구 자연조망',
      '지하 단독 프라이빗 갤러리 & 와인룸',
      '실내 개인 승강기 완비',
      '차고 4대 완비 및 경비 초소 연계'
    ],
    schools: [
      { name: '서울세검정초등학교', type: '초등', distance: '차량 5분', ratingNote: '종로 대표 공립초' },
      { name: '상명사대부속여고', type: '고등', distance: '차량 6분', ratingNote: '명문 사립고' }
    ],
    subway: {
      station: '광화문·시청 차량 15분 도심 접근',
      walkMinutes: 15,
      lines: ['3호선 경복궁역 연계']
    },
    isVipExclusive: true,
    isHot: false,
    isFeatured: true,
    agent: PRINCIPAL_BROKERS.luxury_team,
    coordinates: { lat: 37.6083, lng: 126.9691 }
  }
];

export const INITIAL_PROPERTIES = PROPERTIES_DATA;

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-sample-1',
    name: '김태원',
    phone: '010-8921-3310',
    type: 'tour' as const,
    propertyId: 'prop-hannam-hill',
    propertyTitle: '한남더힐 테라스하우스 로열동',
    preferredDate: '2026.03.20',
    preferredTime: '오후 2:00',
    notes: '주말 오후 1:1 프라이빗 현장 투어 희망',
    createdAt: '2026.03.15 14:30',
    status: 'pending' as const
  },
  {
    id: 'inq-sample-2',
    name: '이수진',
    phone: '010-5541-9022',
    type: 'consultation' as const,
    targetRegion: '강남/청담',
    budget: '100억 이상',
    notes: '에테르노 또는 PH129 복층 펜트하우스 매수 상담',
    createdAt: '2026.03.16 11:10',
    status: 'in_progress' as const
  }
];
