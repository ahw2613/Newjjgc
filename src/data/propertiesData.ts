import { Property } from '../types';

export const DUMMY_AGENT = {
  name: '김사이먼 (Simon Kim)',
  title: 'NJ 최고 실적 공인중개사 / Broker Associate',
  phone: '201-555-0199',
  email: 'contact@njstreet-demo.com',
  kakaoId: 'njstreet_realestate',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
};

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'nj-prop-01',
    titleKo: '포트리 허드슨강 맨해튼 파노라마 뷰 럭셔리 하이라이즈 콘도',
    titleEn: 'Fort Lee Luxury High-Rise Condo with Panoramic Manhattan River Views',
    address: '100 Central Rd, Unit 18B',
    town: '포트리 (Fort Lee)',
    county: 'Bergen County',
    zipCode: '07024',
    listingType: 'sale',
    propertyType: 'condo_townhouse',
    price: 895000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    yearBuilt: 2018,
    propertyTaxAnnual: 9800,
    hoaFeeMonthly: 780,
    mlsNumber: 'NJMLS-2401892',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '조지워싱턴브릿지(GWB) 차량 3분 거리의 포트리 중심 럭셔리 하이라이즈 콘도입니다. 18층 고층에서 허드슨 강과 맨해튼 스카이라인을 감상할 수 있는 남동향 유닛입니다. 최신 서브제로 및 울프 가전, 대리석 카운터탑, 24시간 도어맨, 인피니티 온수풀, 피트니스 센터 완비. 맨해튼 직통 셔틀 및 버스 정류장이 바로 앞에 위치합니다.',
    descriptionEn: 'Luxury high-rise condo in prime Fort Lee with spectacular southeast Hudson River and NYC skyline views. Features high-end Sub-Zero and Wolf appliances, marble countertops, 24/7 concierge, fitness center, outdoor pool, and covered deeded parking.',
    features: ['맨해튼 리버뷰', '24시간 도어맨', '실내 피트니스 & 풀', '서브제로/울프 가전', '실내 지정 주차 1대', '발코니', '초고속 엘리베이터'],
    schools: [
      { name: 'School No. 1 Elementary', rating: 9, distance: '0.4 mi', type: 'Elementary' },
      { name: 'Lewis F. Cole Middle School', rating: 8, distance: '0.9 mi', type: 'Middle' },
      { name: 'Fort Lee High School', rating: 9, distance: '1.1 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 3,
      busToPortAuthorityMinutes: 18,
      busLines: ['NJ Transit 158', 'NJ Transit 156', 'GWB Jitney Shuttle'],
      ferryOrTrain: '에지워터 페리 7분 거리'
    },
    openHouse: {
      date: '2026. 9. 20 (토)',
      time: '오후 1:00 ~ 4:00'
    },
    isHot: true,
    isFeatured: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8509, lng: -73.9701 }
  },
  {
    id: 'nj-prop-02',
    titleKo: '팰리세이즈 파크 브로드애비뉴 도보권 신축 럭셔리 듀플렉스',
    titleEn: 'Palisades Park Brand New Luxury Modern Duplex near Broad Ave',
    address: '245 4th Street',
    town: '팰리세이즈 파크 (Palisades Park)',
    county: 'Bergen County',
    zipCode: '07650',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 1380000,
    beds: 4,
    baths: 4.5,
    sqft: 3200,
    lotSizeSqft: 4500,
    yearBuilt: 2025,
    propertyTaxAnnual: 14200,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2402105',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '2025년 완공된 팰팍 중심가의 최신형 모던 듀플렉스입니다. 1층부터 3층까지 높은 천장과 오픈 플로어 플랜, 디자이너 이탈리안 주방, 마스터 스위트룸에 대형 워크인 클로젯과 스파 욕조가 갖추어져 있습니다. 지하는 독립 출입구가 있는 풀 피니시 베이스먼트(게스트룸 및 엔터테인먼트룸). 브로드 애비뉴 한인 상가 및 버스 정류장 도보 3분!',
    descriptionEn: 'Stunning 2025 newly constructed luxury duplex in heart of Palisades Park. 4 levels of living space, custom European designer kitchen, quartz waterfall island, fully finished ground level with private entrance, 2-car garage and private fenced backyard.',
    features: ['2025 신축', '완전 마감 지하(독립출입)', '차고 2대 + 드라이브웨이', '스마트홈 오토메이션', '쿼츠 폭포 아일랜드', '도보 3분 한인상권', '프라이빗 백야드'],
    schools: [
      { name: 'Charles Lindbergh Elementary', rating: 7, distance: '0.3 mi', type: 'Elementary' },
      { name: 'Palisades Park Jr/Sr High', rating: 7, distance: '0.6 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 7,
      busToPortAuthorityMinutes: 25,
      busLines: ['NJ Transit 166 Express', 'NJ Transit 165'],
      ferryOrTrain: 'GWB 익스프레스 버스'
    },
    openHouse: {
      date: '2026. 9. 21 (일)',
      time: '오후 2:00 ~ 5:00'
    },
    isHot: true,
    isFeatured: true,
    isNew: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8482, lng: -73.9968 }
  },
  {
    id: 'nj-prop-03',
    titleKo: '테너플라이 명문 학군 울창한 프라이빗 수영장 장착 최고급 단독주택',
    titleEn: 'Tenafly Executive Colonial Home on Quiet Cul-de-sac with In-ground Pool',
    address: '38 Woodland Park Dr',
    town: '테너플라이 (Tenafly)',
    county: 'Bergen County',
    zipCode: '07670',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 1980000,
    beds: 5,
    baths: 5,
    sqft: 4600,
    lotSizeSqft: 18500,
    yearBuilt: 2016,
    propertyTaxAnnual: 23500,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2401773',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '뉴저지 1위 공립학교인 테너플라이 하이스쿨 도보권의 프라이빗 컬드색 단독주택입니다. 약 0.42에이커(약 520평)의 넓은 대지에 온수 인그라운드 수영장과 야외 키친 파티오가 조성되어 있습니다. 5개 침실 전용 욕실, 2층 세탁실, 홈 시어터와 와인 셀러가 완비된 럭셔리 주택입니다.',
    descriptionEn: 'Prestigious Tenafly East Hill classic colonial residence situated on half an acre manicured property with heated gunite swimming pool and outdoor kitchen. Within walking distance to Blue Ribbon schools and NYC commuter bus.',
    features: ['테너플라이 10점 만점 학군', '온수 수영장', '홈 시어터', '와인 셀러', '3대 실내 차고', '0.42에이커 프라이빗 랏', '야외 바베큐 파티오'],
    schools: [
      { name: 'Smith Elementary School', rating: 10, distance: '0.5 mi', type: 'Elementary' },
      { name: 'Tenafly Middle School', rating: 10, distance: '0.8 mi', type: 'Middle' },
      { name: 'Tenafly High School', rating: 10, distance: '1.0 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 12,
      busToPortAuthorityMinutes: 35,
      busLines: ['NJ Transit 166', 'Rockland Coaches 9T'],
      ferryOrTrain: 'GWB 차량 12분'
    },
    isFeatured: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.9254, lng: -73.9615 }
  },
  {
    id: 'nj-prop-04',
    titleKo: '클로스터 노던밸리 명문 학군 2026 신축 모던 콜로니얼',
    titleEn: 'Closter Brand New Custom Built Luxury Home with High Ceilings',
    address: '88 Hickory Lane',
    town: '클로스터 (Closter)',
    county: 'Bergen County',
    zipCode: '07624',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 2280000,
    beds: 6,
    baths: 6.5,
    sqft: 5200,
    lotSizeSqft: 15000,
    yearBuilt: 2026,
    propertyTaxAnnual: 24000,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2403310',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752734-2a0cd6666754?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '클로스터 플라자 도보 7분, 노던밸리 리저널 데마레스트(NVRHS Demarest) 학군의 2026년 신축 맞춤형 대저택입니다. 10피트 높은 천장과 전면 통유리창, 테슬라 충전기가 설치된 2대 차고, 최상급 마감재로 시공되었습니다.',
    descriptionEn: 'Architectural masterpiece brand new construction in desirable Closter. Top-tier Northern Valley High School district. Boasting 6 ensuite bedrooms, dual primary suites, chef kitchen with oversized island and radiant heated floors.',
    features: ['2026 완공 신축', '노던밸리 명문 학군', '바닥 난방 (Radiant Heat)', '클로스터 플라자 도보권', '테슬라 EV 충전기', '스마트홈 시스템'],
    schools: [
      { name: 'Hillside Elementary', rating: 9, distance: '0.4 mi', type: 'Elementary' },
      { name: 'Tenakill Middle School', rating: 9, distance: '0.7 mi', type: 'Middle' },
      { name: 'Northern Valley Regional HS at Demarest', rating: 10, distance: '1.2 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 18,
      busToPortAuthorityMinutes: 42,
      busLines: ['Rockland Coaches Red & Tan'],
      ferryOrTrain: 'GWB 18분 직통'
    },
    isHot: true,
    isNew: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.9732, lng: -73.9626 }
  },
  {
    id: 'nj-prop-05',
    titleKo: '에지워터 허드슨 강변 워터프론트 럭셔리 타운하우스 (렌트)',
    titleEn: 'Edgewater Waterfront Luxury Townhome with NYC Skyline Direct View (For Rent)',
    address: '42 Independence Way',
    town: '에지워터 (Edgewater)',
    county: 'Bergen County',
    zipCode: '07020',
    listingType: 'rent',
    propertyType: 'condo_townhouse',
    price: 4950,
    rentPeriod: 'month',
    beds: 3,
    baths: 3,
    sqft: 2100,
    yearBuilt: 2015,
    propertyTaxAnnual: 0,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2400982',
    images: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '에지워터 콜로니 인근의 워터프론트 타운하우스 렌트 매물입니다. 거실과 마스터 침실에서 맨해튼 미드타운 스카이라인이 한눈에 펼쳐집니다. NY Waterway 페리 선착장까지 도보 5분으로 미드타운 39번가까지 15분 만에 편안하게 출퇴근할 수 있습니다. 1대 실내 차고 및 드라이브웨이 포함.',
    descriptionEn: 'Direct NYC river view townhome rental in prime Edgewater. Walk to NY Waterway Ferry for 15-minute commute to Midtown Manhattan. Pristine hardwood floors, gas fireplace, private balcony overlooking Hudson River.',
    features: ['월 렌트 매물', '맨해튼 파노라마 뷰', 'NY Waterway 페리 도보 5분', '전용 발코니', '실내 차고 1대', '반려동물 협의 가능', '미츠와/홀푸드 인근'],
    schools: [
      { name: 'Eleanor Van Gelder Elementary', rating: 9, distance: '0.6 mi', type: 'Elementary' },
      { name: 'Leonia High School (Send/Receive)', rating: 8, distance: '2.5 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 8,
      busToPortAuthorityMinutes: 20,
      busLines: ['NJ Transit 158 (Front Door)', 'NY Waterway Ferry'],
      ferryOrTrain: '페리 선착장 도보 5분 (맨해튼 15분)'
    },
    isHot: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8270, lng: -73.9754 }
  },
  {
    id: 'nj-prop-06',
    titleKo: '포트리 중심가 올리노베이션 2베드 2배스 콘도 (초역세권 렌트)',
    titleEn: 'Fort Lee Fully Renovated 2-Bed 2-Bath Condo near Town Center (Rental)',
    address: '2050 Center Ave, Apt 6C',
    town: '포트리 (Fort Lee)',
    county: 'Bergen County',
    zipCode: '07024',
    listingType: 'rent',
    propertyType: 'condo_townhouse',
    price: 3300,
    rentPeriod: 'month',
    beds: 2,
    baths: 2,
    sqft: 1180,
    yearBuilt: 2012,
    propertyTaxAnnual: 0,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2401124',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '포트리 메인 스트리트와 H마트, 카페가 밀집한 중심부에 위치한 2베드 2배스 렌트 유닛입니다. 전체 원목 바닥 교체, 스테인리스 가전 및 인유닛 세탁기/건조기 설치 완료. GWB 버스터미널 행 짓니(Jitney) 및 뉴욕행 버스 정류장이 바로 코앞입니다.',
    descriptionEn: 'Sun-drenched, completely remodeled 2BR/2BA apartment in prime Fort Lee center. In-unit washer/dryer, updated kitchen with quartz countertops, hardwood floors throughout. Gas and water included.',
    features: ['올 리노베이션 완료', '유닛 내 세탁기/건조기', '난방/온수/가스 렌트비 포함', 'H마트 도보 4분', 'NYC 버스 정류장 앞'],
    schools: [
      { name: 'School No. 3 Elementary', rating: 8, distance: '0.3 mi', type: 'Elementary' },
      { name: 'Fort Lee High School', rating: 9, distance: '0.8 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 2,
      busToPortAuthorityMinutes: 17,
      busLines: ['NJ Transit 158', 'NJ Transit 156'],
      ferryOrTrain: 'GWB 셔틀 2분'
    },
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8525, lng: -73.9720 }
  },
  {
    id: 'nj-prop-07',
    titleKo: '릿지우드 기차역 도보권 전통 명문 학군 클래식 콜로니얼 단독주택',
    titleEn: 'Ridgewood Prestigious Colonial Walking Distance to Train Station & Village',
    address: '142 Franklin Ave',
    town: '릿지우드 (Ridgewood)',
    county: 'Bergen County',
    zipCode: '07450',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 1680000,
    beds: 5,
    baths: 4.5,
    sqft: 3850,
    lotSizeSqft: 12500,
    yearBuilt: 2010,
    propertyTaxAnnual: 21500,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2402941',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '버겐카운티 최고 명문 학군 중 하나인 릿지우드의 완벽한 패밀리 홈입니다. 활기 넘치는 다운타운 빌리지 상권과 통근 기차역(Ridgewood Station)을 도보 8분으로 이용할 수 있습니다. 웅장한 화강암 벽난로, 쉐프 주방, 마스터 스위트와 넓은 뒷마당 잔디밭.',
    descriptionEn: 'Timeless colonial charm meets contemporary luxury in downtown Ridgewood. 8-minute walk to NYC commuter train and premier village dining. Top-rated Ridgewood High School district.',
    features: ['릿지우드 역세권 도보 8분', '명문 고교 학군 10점', '벽난로 2개', '쉐프 주방', '잔디 정원 & 데크', '피니시 베이스먼트'],
    schools: [
      { name: 'Travell Elementary School', rating: 10, distance: '0.5 mi', type: 'Elementary' },
      { name: 'Benjamin Franklin Middle', rating: 9, distance: '0.7 mi', type: 'Middle' },
      { name: 'Ridgewood High School', rating: 10, distance: '0.9 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 22,
      busToPortAuthorityMinutes: 45,
      busLines: ['NJ Transit Main/Bergen County Line Train'],
      ferryOrTrain: '릿지우드 기차역 도보 8분'
    },
    openHouse: {
      date: '2026. 9. 27 (토)',
      time: '오후 1:00 ~ 3:30'
    },
    isFeatured: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.9793, lng: -74.1165 }
  },
  {
    id: 'nj-prop-08',
    titleKo: '잉글우드 클리프 초호화 메가 단독주택 (초저 재산세율 & 프라이빗)',
    titleEn: 'Englewood Cliffs Ultra-Luxury Custom Estate on 1 Acre with Lowest Taxes',
    address: '75 Floyd St',
    town: '잉글우드 클리프 (Englewood Cliffs)',
    county: 'Bergen County',
    zipCode: '07632',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 3250000,
    beds: 6,
    baths: 7.5,
    sqft: 6800,
    lotSizeSqft: 43560,
    yearBuilt: 2021,
    propertyTaxAnnual: 18500,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2404018',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '버겐카운티에서 가장 낮은 재산세율로 유명한 잉글우드 클리프의 1에이커(약 1,220평) 프라이빗 에스테이트입니다. GWB까지 차로 5분 거리이며, 실내 엘리베이터, 사우나, 테니스 코트 겸용 스포츠 코트, 온열 수영장, 4대 실내 차고가 갖춰진 최고급 저택입니다.',
    descriptionEn: 'Spectacular gated modern estate on full flat acre in ultra-low tax Englewood Cliffs. Only minutes to Manhattan. Features private residential elevator, home wellness spa with sauna, 4-car garage, and resort-style backyard.',
    features: ['1에이커 대형 부지', '버겐카운티 최저 수준 재산세', '실내 엘리베이터', '프라이빗 게이트', '사우나 & 스파', '차고 4대', 'GWB 차량 5분'],
    schools: [
      { name: 'North Cliff Elementary', rating: 9, distance: '0.7 mi', type: 'Elementary' },
      { name: 'Upper School', rating: 9, distance: '0.9 mi', type: 'Middle' },
      { name: 'Dwight Morrow High School', rating: 8, distance: '2.0 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 5,
      busToPortAuthorityMinutes: 22,
      busLines: ['Rockland Coaches', 'NJ Transit 156'],
      ferryOrTrain: 'GWB 5분 직통'
    },
    isHot: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8809, lng: -73.9535 }
  },
  {
    id: 'nj-prop-09',
    titleKo: '포트리 메인 스트리트 상가/오피스 건물 (임대수익률 7.2% 상업용 매물)',
    titleEn: 'Fort Lee Main Street Prime Mixed-Use Commercial Retail Building (For Sale)',
    address: '1628 Main Street',
    town: '포트리 (Fort Lee)',
    county: 'Bergen County',
    zipCode: '07024',
    listingType: 'commercial',
    propertyType: 'commercial',
    price: 1850000,
    beds: 0,
    baths: 4,
    sqft: 4800,
    lotSizeSqft: 5000,
    yearBuilt: 2008,
    propertyTaxAnnual: 19800,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2405001',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '포트리 핵심 상권인 메인 스트리트 코너변에 위치한 주상복합 상업용 건물입니다. 1층 2개 소매점포(베이커리/헤어살롱 우량 임차인 장기계약 중), 2층 전문직 사무실 2개 유닛으로 구성되어 공실 위험이 매우 낮으며 캡레이트(Cap Rate) 7.2%를 기록하고 있는 알짜배기 투자 매물입니다.',
    descriptionEn: 'Rare commercial mixed-use retail building in prime Fort Lee Main Street corridor. 100% occupied with reliable, long-term tenants. High foot-traffic location with designated customer parking in rear.',
    features: ['상업용 투자 매물', '캡레이트 7.2%', '전 유닛 100% 임대 완료', '포트리 메인 상권 코너', '후면 전용 주차장 8대', '개별 냉난방 분리'],
    schools: [
      { name: 'Fort Lee Commercial District', rating: 8, distance: '0.1 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 2,
      busToPortAuthorityMinutes: 16,
      busLines: ['NJ Transit 158', 'NJ Transit 156'],
      ferryOrTrain: 'GWB 2분'
    },
    isFeatured: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8515, lng: -73.9715 }
  },
  {
    id: 'nj-prop-10',
    titleKo: '저지시티 익스체인지 플레이스 허드슨강변 럭셔리 콘도 (PATH 7분)',
    titleEn: 'Jersey City Exchange Place Luxury Waterfront 1BR Condo (7 Min to WTC)',
    address: '150 Greene St, Unit 12A',
    town: '저지시티 (Jersey City)',
    county: 'Hudson County',
    zipCode: '07302',
    listingType: 'sale',
    propertyType: 'condo_townhouse',
    price: 749000,
    beds: 1,
    baths: 1,
    sqft: 860,
    yearBuilt: 2019,
    propertyTaxAnnual: 8200,
    hoaFeeMonthly: 590,
    mlsNumber: 'NJMLS-2401662',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '맨해튼 월스트리트(WTC)까지 PATH 전철로 정확히 1정거장 7분! 저지시티 익스체인지 플레이스 워터프론트의 1베드 콘도입니다. 높은 층고와 전면 통창으로 맨해튼 남부 및 프리덤타워 뷰가 아름답게 펼쳐집니다. 루프탑 수영장, 라운지, 바베큐 테라스 완비.',
    descriptionEn: 'Waterfront luxury 1BR condo at Exchange Place. Only 1 stop (7 mins) to World Trade Center via PATH. Jaw-dropping Downtown Manhattan views, rooftop pool, 24-hr concierge.',
    features: ['월스트리트 PATH 7분', '프리덤타워 뷰', '루프탑 수영장 & 라운지', '24시간 컨시어지', '택스 감면(Tax Abatement) 유효'],
    schools: [
      { name: 'Cornelia F. Bradford Elementary', rating: 9, distance: '0.2 mi', type: 'Elementary' },
      { name: 'McNair Academic High School', rating: 10, distance: '1.5 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 20,
      busToPortAuthorityMinutes: 15,
      busLines: ['PATH Train (Exchange Place)', 'NY Waterway Ferry'],
      ferryOrTrain: 'PATH 전철 7분 WTC 직통'
    },
    isHot: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.7178, lng: -74.0338 }
  },
  {
    id: 'nj-prop-11',
    titleKo: '팰리세이즈 파크 2-패밀리 다가구 주택 (임대수익형 투자 매물)',
    titleEn: 'Palisades Park Turnkey 2-Family Home with Great Rental Income (Sale)',
    address: '312 E Central Blvd',
    town: '팰리세이즈 파크 (Palisades Park)',
    county: 'Bergen County',
    zipCode: '07650',
    listingType: 'sale',
    propertyType: 'multi_family',
    price: 1490000,
    beds: 6,
    baths: 4,
    sqft: 3600,
    lotSizeSqft: 5000,
    yearBuilt: 2014,
    propertyTaxAnnual: 15200,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2402889',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '실거주와 임대 수익을 동시에 누릴 수 있는 팰팍의 합법 2-패밀리 주택입니다. 1층 유닛(3베드 2배스)과 2층 유닛(3베드 2배스)이 완전히 분리되어 있으며, 지하 및 차고 2대 공간이 별도로 마련되어 있습니다. 월 예상 임대 수입 $7,500으로 모기지 부담을 덜어줍니다.',
    descriptionEn: 'Legal 2-Family income property in top Palisades Park location. Two identical 3-bedroom 2-bath units with separate utilities. Full basement with high ceilings and 2-car garage. Projected $7,500/month rental income.',
    features: ['합법 2-패밀리 다가구', '월 예상 임대수입 $7,500', '완전 독립 유틸리티 분리', '차고 2대 + 드라이브웨이 4대', '브로드애비뉴 도보 5분'],
    schools: [
      { name: 'Charles Lindbergh Elementary', rating: 7, distance: '0.4 mi', type: 'Elementary' },
      { name: 'Palisades Park High School', rating: 7, distance: '0.7 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 8,
      busToPortAuthorityMinutes: 26,
      busLines: ['NJ Transit 166', 'NJ Transit 165'],
      ferryOrTrain: '뉴욕 직통버스 도보 3분'
    },
    isFeatured: true,
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.8495, lng: -73.9935 }
  },
  {
    id: 'nj-prop-12',
    titleKo: '크레스킬 명문 학군 턴키 단독주택 (남향, 프라이빗 백야드)',
    titleEn: 'Cresskill Beautiful Turnkey Colonial in Top School District',
    address: '54 Jefferson Ave',
    town: '크레스킬 (Cresskill)',
    county: 'Bergen County',
    zipCode: '07626',
    listingType: 'sale',
    propertyType: 'single_family',
    price: 1420000,
    beds: 4,
    baths: 3.5,
    sqft: 3100,
    lotSizeSqft: 10000,
    yearBuilt: 2017,
    propertyTaxAnnual: 17800,
    hoaFeeMonthly: 0,
    mlsNumber: 'NJMLS-2403190',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    descriptionKo: '크레스킬의 조용하고 안전한 주택가에 위치한 턴키 상태의 단독주택입니다. 따뜻한 햇살이 가득한 남향이며, 1층에 오픈 콘셉트 주방과 패밀리룸이 연결되어 있습니다. 잔디 마당과 바베큐 데크가 잘 조성되어 있어 아이들이 마음껏 뛰어놀 수 있습니다.',
    descriptionEn: 'Immaculate colonial home on a premier quiet tree-lined street in Cresskill. Open-concept layout, bright southern exposure, gourmet kitchen with marble island, and spacious fenced backyard.',
    features: ['크레스킬 우수 학군', '남향 채광 우수', '완전 울타리 백야드', '차고 2대', '마스터 스위트 스파 욕조'],
    schools: [
      { name: 'Edward H. Bryan School', rating: 9, distance: '0.4 mi', type: 'Elementary' },
      { name: 'Cresskill Middle School', rating: 9, distance: '0.8 mi', type: 'Middle' },
      { name: 'Cresskill High School', rating: 10, distance: '0.8 mi', type: 'High' }
    ],
    commute: {
      gwbDriveMinutes: 14,
      busToPortAuthorityMinutes: 38,
      busLines: ['Rockland Coaches Route 9'],
      ferryOrTrain: 'GWB 14분'
    },
    openHouse: {
      date: '2026. 9. 20 (토)',
      time: '오후 2:00 ~ 4:30'
    },
    agent: DUMMY_AGENT,
    coordinates: { lat: 40.9402, lng: -73.9602 }
  }
];
