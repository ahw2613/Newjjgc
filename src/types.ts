export type ListingType = 'sale' | 'jeonse' | 'rent' | 'commercial';
export type PropertyType = 'apartment' | 'luxury_villa' | 'officetel' | 'house' | 'commercial';
export interface SchoolInfo { name: string; type: '초등' | '중학' | '고등' | '국제학교'; distance: string; ratingNote: string; }
export interface SubwayInfo { station: string; walkMinutes: number; lines: string[]; }
export interface AgentInfo { name: string; title: string; phone: string; mobile: string; email: string; kakaoId: string; avatar: string; licenseNumber: string; experienceYears: number; }
export interface Property {
  id: string; titleKo: string; subTitle?: string; region: string; district: string; addressShort: string; roadAddress: string;
  listingType: ListingType; propertyType: PropertyType; price: number; deposit?: number; monthlyRent?: number;
  exclusivePyeong: number; supplyPyeong: number; exclusiveAreaM2: number; supplyAreaM2: number;
  rooms: number; baths: number; parking: number; floor: number; totalFloors: number;
  direction: '남향' | '남동향' | '남서향' | '동향' | '북한강뷰'; builtYear: number; moveInDate: string;
  maintenanceCost: number; maintenanceCostDesc?: string; images: string[]; descriptionKo: string; features: string[];
  schools: SchoolInfo[]; subway: SubwayInfo[] extends never[] ? SubwayInfo : SubwayInfo;
  isVipExclusive?: boolean; isHot?: boolean; isFeatured?: boolean; isNew?: boolean; agent: AgentInfo;
  coordinates: { lat: number; lng: number };
}
export interface DistrictGuide { id: string; name: string; subName: string; highlight: string; description: string; avgSalePyeongPrice: string; avgJeonsePyeongPrice: string; schoolGrade: string; lifestyle: string; image: string; tags: string[]; landmarkComplexes: string[]; }
export interface FilterState { searchQuery: string; district: string; listingType: 'all' | ListingType; propertyType: 'all' | PropertyType; minPrice: number; maxPrice: number; rooms: number; baths: number; minPyeong: number; maxPyeong: number; subwayWithin10Min: boolean; vipOnly: boolean; sortBy: 'newest' | 'price_asc' | 'price_desc' | 'pyeong_desc' | 'floor_desc'; }
export type UnitType = 'pyeong' | 'm2' | 'sqft';
export type CurrencyType = 'KRW' | 'USD';
export interface ConsultationInquiry { id: string; name: string; phone: string; email?: string; type: 'consultation' | 'tour' | 'sell_request' | 'vip_matching'; preferredDate?: string; preferredTime?: string; propertyId?: string; propertyTitle?: string; budget?: string; targetRegion?: string; notes?: string; status: 'pending' | 'in_progress' | 'completed'; createdAt: string; }
