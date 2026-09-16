export type ListingType = 'sale' | 'rent' | 'commercial';
export type PropertyType = 'single_family' | 'condo_townhouse' | 'multi_family' | 'commercial';

export interface SchoolInfo {
  name: string;
  rating: number; // 1 to 10
  distance: string;
  type: 'Elementary' | 'Middle' | 'High';
}

export interface CommuteInfo {
  gwbDriveMinutes: number; // to George Washington Bridge
  busToPortAuthorityMinutes: number; // NJ Transit to NYC PABT
  busLines: string[];
  ferryOrTrain?: string;
}

export interface AgentInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  kakaoId: string;
  avatar: string;
}

export interface Property {
  id: string;
  titleKo: string;
  titleEn: string;
  address: string;
  town: string;
  county: string;
  zipCode: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number; // USD
  rentPeriod?: 'month';
  beds: number;
  baths: number;
  sqft: number;
  lotSizeSqft?: number;
  yearBuilt: number;
  propertyTaxAnnual: number;
  hoaFeeMonthly: number;
  mlsNumber: string;
  images: string[];
  descriptionKo: string;
  descriptionEn: string;
  features: string[];
  schools: SchoolInfo[];
  commute: CommuteInfo;
  openHouse?: {
    date: string;
    time: string;
  };
  isHot?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  agent: AgentInfo;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TownGuide {
  id: string;
  nameKo: string;
  nameEn: string;
  county: string;
  highlight: string;
  descriptionKo: string;
  avgPrice: string;
  avgRent: string;
  schoolGrade: string;
  commuteTime: string;
  image: string;
  tags: string[];
}

export interface FilterState {
  searchQuery: string;
  listingType: 'all' | ListingType;
  town: string;
  propertyType: 'all' | PropertyType;
  minPrice: number;
  maxPrice: number;
  beds: number; // 0 = all
  baths: number; // 0 = all
  minSchoolRating: number;
  openHouseOnly: boolean;
  newConstructionOnly: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'school_desc' | 'sqft_desc';
}

export type UnitType = 'sqft' | 'pyeong';
export type CurrencyType = 'USD' | 'KRW';
