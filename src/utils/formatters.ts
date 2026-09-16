import { ListingType } from '../types';

/**
 * 만원 단위 숫자를 한국 원화 형식(억, 만원)으로 변환
 * 예: 850000 -> "85억"
 * 예: 855000 -> "85억 5,000만"
 * 예: 45000 -> "4억 5,000만"
 * 예: 8000 -> "8,000만"
 */
export function formatManwonToKorean(manwon: number): string {
  if (!manwon || manwon <= 0) return '0원';
  
  const eok = Math.floor(manwon / 10000);
  const remainder = manwon % 10000;
  
  if (eok > 0 && remainder > 0) {
    return `${eok.toLocaleString()}억 ${remainder.toLocaleString()}만원`;
  } else if (eok > 0) {
    return `${eok.toLocaleString()}억원`;
  } else {
    return `${remainder.toLocaleString()}만원`;
  }
}

/**
 * 매물 전체 가격 라벨 표시 (매매, 전세, 월세 구분)
 */
export function formatPropertyPrice(
  listingType: ListingType,
  priceInManwon: number,
  deposit?: number,
  monthlyRent?: number
): string {
  if (listingType === 'jeonse') {
    const jeonseVal = deposit || priceInManwon;
    return `전세 ${formatManwonToKorean(jeonseVal)}`;
  }
  
  if (listingType === 'rent') {
    const dep = deposit || 10000;
    const rent = monthlyRent || 300;
    return `보증금 ${formatManwonToKorean(dep)} / 월 ${rent.toLocaleString()}만원`;
  }
  
  if (listingType === 'commercial') {
    return `매매 ${formatManwonToKorean(priceInManwon)}`;
  }
  
  return `매매 ${formatManwonToKorean(priceInManwon)}`;
}

/**
 * 원화(만원)를 미국 달러(USD)로 환산 (대략 1 USD = 1,380 KRW)
 */
export function formatManwonToUSD(manwon: number): string {
  const krw = manwon * 10000;
  const usd = Math.round(krw / 1380);
  return `$${usd.toLocaleString()}`;
}

/**
 * 평형 <-> ㎡ 단위 포맷
 */
export function formatArea(pyeong: number, m2: number, unit: 'pyeong' | 'm2'): string {
  if (unit === 'pyeong') {
    return `${pyeong}평`;
  }
  return `${m2}㎡`;
}

/**
 * 국내 주택 취득세 간이 계산 (2024~2026 현행 세법 기준 기본 주택수)
 * priceInManwon: 매매금액(만원)
 * houseCount: 1주택, 2주택(조정대상/비조정), 3주택 이상
 */
export function calculateAcquisitionTax(priceInManwon: number, houseCount: 1 | 2 | 3 = 1): {
  taxRate: number;
  totalTax: number; // 만원
  acquisitionTax: number;
  localEduTax: number;
  ruralSpecialTax: number;
} {
  const won = priceInManwon; // 단위: 만원
  let baseRate = 0.03; // 기본 9억 초과 3%
  
  if (houseCount === 1) {
    if (won <= 60000) {
      baseRate = 0.01;
    } else if (won <= 90000) {
      // 6억~9억 사이 누진공식: (취득가액 * 2/3억원 - 3) * 1%
      const eok = won / 10000;
      baseRate = ((eok * (2 / 3) - 3) * 0.01);
    } else {
      baseRate = 0.03;
    }
  } else if (houseCount === 2) {
    baseRate = 0.08; // 조정대상 2주택 기준 8%
  } else {
    baseRate = 0.12; // 3주택 이상 12%
  }

  const acquisitionTax = Math.round(won * baseRate);
  const localEduTax = Math.round(won * (baseRate * 0.1));
  const ruralSpecialTax = won > 8500 ? Math.round(won * 0.002) : 0; // 전용 85㎡ 초과 농특세
  
  const totalTax = acquisitionTax + localEduTax + ruralSpecialTax;
  const effectiveRate = ((totalTax / won) * 100);

  return {
    taxRate: Number(effectiveRate.toFixed(2)),
    totalTax,
    acquisitionTax,
    localEduTax,
    ruralSpecialTax
  };
}

/**
 * 법정 중개보수 한도 요율 계산 (공인중개사법 기준 상한요율)
 */
export function calculateBrokerageFee(priceInManwon: number, listingType: ListingType): {
  feeRate: number;
  maxFee: number; // 만원
  vat: number; // 부가세 10%
  total: number;
} {
  let rate = 0.007; // 매매 15억 이상 상한 0.7%
  
  if (listingType === 'sale' || listingType === 'commercial') {
    if (priceInManwon < 5000) rate = 0.006;
    else if (priceInManwon < 20000) rate = 0.005;
    else if (priceInManwon < 90000) rate = 0.004;
    else if (priceInManwon < 120000) rate = 0.005;
    else if (priceInManwon < 150000) rate = 0.006;
    else rate = 0.007;
  } else {
    // 임대차
    if (priceInManwon < 5000) rate = 0.005;
    else if (priceInManwon < 10000) rate = 0.004;
    else if (priceInManwon < 90000) rate = 0.003;
    else if (priceInManwon < 120000) rate = 0.004;
    else if (priceInManwon < 150000) rate = 0.005;
    else rate = 0.006;
  }
  
  const maxFee = Math.round(priceInManwon * rate);
  const vat = Math.round(maxFee * 0.1);
  return {
    feeRate: Number((rate * 100).toFixed(2)),
    maxFee,
    vat,
    total: maxFee + vat
  };
}

/**
 * 모기지 대출 원리금 균등상환 계산
 * principalManwon: 대출 원금(만원)
 * annualInterestRate: 연이율(%) 예: 4.2
 * years: 상환 기간(년) 예: 30
 */
export function calculateMortgageMonthly(
  principalManwon: number,
  annualInterestRate: number,
  years: number
): {
  monthlyPayment: number; // 만원
  totalInterest: number; // 만원
  totalPayment: number; // 만원
} {
  if (!principalManwon || principalManwon <= 0) {
    return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
  }
  
  const principal = principalManwon;
  const monthlyRate = (annualInterestRate / 100) / 12;
  const totalMonths = years * 12;
  
  if (monthlyRate === 0) {
    const monthly = Math.round(principal / totalMonths);
    return {
      monthlyPayment: monthly,
      totalInterest: 0,
      totalPayment: principal
    };
  }
  
  const x = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyPayment = Math.round((principal * (monthlyRate * x)) / (x - 1));
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyPayment,
    totalInterest,
    totalPayment
  };
}
