export type ListingType = 'sale' | 'jeonse' | 'rent' | 'commercial'; 
// sale = 매매, jeonse = 전세, rent = 월세, commercial = 상업용/빌딩

export type PropertyType = 
  | 'apartment'        // 아파트
  | 'luxury_villa'     // 고급빌라 / 펜트하우스
  | 'officetel'        // 주상복합 / 오피스텔
  | 'house'            // 단독주택 / 타운하우스
  | 'commercial';      // 상가 / 빌딩

export interface SchoolInfo {
  name: string;
  type: '초등' | '중학' | '고등' | '국제학교';
  distance: string; // 예: "도보 4분"
  ratingNote: string; // 예: "서울대 진학률 최상위 학군"
}

export interface SubwayInfo {
  station: string; // 예: "한남역 (경의중앙선)"
  walkMinutes: number; // 도보 n분
  lines: string[]; // ["경의중앙선", "3호선"]
}

export interface AgentInfo {
  name: string;
  title: string;
  phone: string;
  mobile: string;
  email: string;
  kakaoId: string;
  avatar: string;
  licenseNumber: string; // 공인중개사 자격번호
  experienceYears: number;
}

export interface Property {
  id: string;
  titleKo: string;
  subTitle?: string;
  region: string; // 예: "서울시 용산구 한남동"
  district: string; // 예: "용산/한남", "강남/청담", "성동/성수", "서초/반포", "송파/잠실", "광주/봉선"
  addressShort: string; // 예: "한남대로 91"
  roadAddress: string; // 도로명 상세
  listingType: ListingType;
  propertyType: PropertyType;
  
  // 가격 (단위: 만원 기준 정수, 예: 850000 = 85억)
  price: number; 
  deposit?: number; // 전세금 or 월세 보증금 (만원)
  monthlyRent?: number; // 월세 (만원)
  
  // 면적
  exclusivePyeong: number; // 전용면적 (평)
  supplyPyeong: number;    // 공급면적 (평)
  exclusiveAreaM2: number; // 전용면적 (㎡)
  supplyAreaM2: number;    // 공급면적 (㎡)
  
  // 공간 구조
  rooms: number; // 방 수
  baths: number; // 욕실 수
  parking: number; // 세대당 주차 가능 대수
  
  // 건물 스펙
  floor: number; // 해당층 (예: 18)
  totalFloors: number; // 총 층수 (예: 25)
  direction: '남향' | '남동향' | '남서향' | '동향' | '북한강뷰';
  builtYear: number; // 준공년도
  moveInDate: string; // 입주가능일 (예: "즉시입주 협의가능", "2026년 11월")
  maintenanceCost: number; // 월 평균 관리비 (만원)
  maintenanceCostDesc?: string; // 관리비 포함 항목
  
  images: string[];
  descriptionKo: string;
  features: string[]; // 태그: ["한강 파노라마뷰", "24시간 보안", "단독 테라스", "호텔식 발렛"]
  schools: SchoolInfo[];
  subway: SubwayInfo;
  
  // 추천 뱃지
  isVipExclusive?: boolean; // VIP 프라이빗 매칭 매물
  isHot?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  
  agent: AgentInfo;
  
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DistrictGuide {
  id: string;
  name: string;
  subName: string;
  highlight: string;
  description: string;
  avgSalePyeongPrice: string; // 예: "평당 1억 2,000만원"
  avgJeonsePyeongPrice: string;
  schoolGrade: string;
  lifestyle: string;
  image: string;
  tags: string[];
  landmarkComplexes: string[];
}

export interface FilterState {
  searchQuery: string;
  district: string; // 'all' or specific
  listingType: 'all' | ListingType;
  propertyType: 'all' | PropertyType;
  minPrice: number; // 0 ~ (만원)
  maxPrice: number; // 0 = unlimited
  rooms: number; // 0 = all
  baths: number; // 0 = all
  minPyeong: number; // 최소 전용 평수
  maxPyeong: number; // 최대 전용 평수
  subwayWithin10Min: boolean;
  vipOnly: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'pyeong_desc' | 'floor_desc';
}

export type UnitType = 'pyeong' | 'm2';
export type CurrencyType = 'KRW' | 'USD';

export interface ConsultationInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: 'consultation' | 'tour' | 'sell_request' | 'vip_matching';
  preferredDate?: string;
  preferredTime?: string;
  propertyId?: string;
  propertyTitle?: string;
  budget?: string;
  targetRegion?: string;
  notes?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}
