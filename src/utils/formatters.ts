import { CurrencyType, UnitType } from '../types';

// Approximate USD to KRW exchange rate
export const USD_TO_KRW = 1350;

export function formatPrice(
  amountUsd: number,
  currency: CurrencyType = 'USD',
  listingType: 'sale' | 'rent' | 'commercial' = 'sale'
): string {
  if (currency === 'USD') {
    if (listingType === 'rent') {
      return `$${amountUsd.toLocaleString()}/월`;
    }
    if (amountUsd >= 1000000) {
      const millions = (amountUsd / 1000000).toFixed(2);
      return `$${millions.endsWith('.00') ? millions.slice(0, -3) : millions}M ($${amountUsd.toLocaleString()})`;
    }
    return `$${amountUsd.toLocaleString()}`;
  } else {
    // KRW
    const krwTotal = amountUsd * USD_TO_KRW;
    if (listingType === 'rent') {
      const monthlyManWon = Math.round(krwTotal / 10000);
      return `약 ${monthlyManWon.toLocaleString()}만 원/월 ($${amountUsd.toLocaleString()})`;
    }
    const eok = Math.floor(krwTotal / 100000000);
    const manWon = Math.round((krwTotal % 100000000) / 10000);

    if (eok > 0) {
      return manWon > 0 
        ? `약 ${eok}억 ${manWon.toLocaleString()}만 원` 
        : `약 ${eok}억 원`;
    }
    return `약 ${manWon.toLocaleString()}만 원`;
  }
}

export function formatArea(sqft: number, unit: UnitType = 'sqft'): string {
  if (unit === 'sqft') {
    return `${sqft.toLocaleString()} sqft`;
  } else {
    const pyeong = Math.round(sqft * 0.0281);
    return `약 ${pyeong}평 (${sqft.toLocaleString()} sqft)`;
  }
}

export interface MortgageResult {
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  monthlyTotal: number;
  loanAmount: number;
  downPaymentAmount: number;
}

export function calculateMortgage(
  homePrice: number,
  downPaymentPercent: number,
  interestRatePercent: number,
  loanTermYears: number = 30,
  annualPropertyTax: number = 0,
  monthlyHoa: number = 0
): MortgageResult {
  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  // Monthly interest rate
  const monthlyRate = interestRatePercent / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0 && numberOfPayments > 0 && loanAmount > 0) {
    monthlyPrincipalInterest = Math.round(
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  }

  const monthlyPropertyTax = Math.round((annualPropertyTax || (homePrice * 0.02)) / 12);
  // estimated home insurance ~ 0.35% of home price per year
  const monthlyInsurance = Math.round((homePrice * 0.0035) / 12);
  const monthlyTotal = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + (monthlyHoa || 0);

  return {
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    monthlyTotal,
    loanAmount,
    downPaymentAmount
  };
}
