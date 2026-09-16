import { ListingType } from '../types';

export function formatManwonToKorean(value: number): string { return `$${Math.round(value).toLocaleString()}`; }
export function formatPropertyPrice(listingType: ListingType, price: number, deposit?: number, monthlyRent?: number): string {
  if (listingType === 'rent') return `$${Math.round(price).toLocaleString()} / month`;
  if (listingType === 'jeonse') return `$${Math.round(price).toLocaleString()}`;
  if (listingType === 'commercial') return `$${Math.round(price).toLocaleString()}`;
  return `$${Math.round(price).toLocaleString()}`;
}
export function formatManwonToUSD(value: number): string { return `$${Math.round(value).toLocaleString()}`; }
export function formatArea(pyeong: number, m2: number, unit: 'pyeong' | 'm2' | 'sqft'): string { if (unit === 'sqft') return `${Math.round(m2 * 10.7639).toLocaleString()} sqft`; if (unit === 'pyeong') return `${Math.round(m2 / 3.3058)} pyeong`; return `${Math.round(m2).toLocaleString()} m²`; }
export function calculateAcquisitionTax(price: number, houseCount: 1 | 2 | 3 = 1) { const rate = houseCount === 1 ? 0.01 : houseCount === 2 ? 0.08 : 0.12; const tax = Math.round(price * rate); return { taxRate: rate * 100, totalTax: tax, acquisitionTax: tax, localEduTax: 0, ruralSpecialTax: 0 }; }
export function calculateBrokerageFee(price: number, listingType: ListingType) { const rate = listingType === 'commercial' ? 0.01 : 0.025; const maxFee = Math.round(price * rate); return { feeRate: rate * 100, maxFee, vat: 0, total: maxFee }; }
export function calculateMortgageMonthly(principal: number, annualInterestRate: number, years: number) { if (!principal) return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 }; const r = annualInterestRate / 100 / 12; const n = years * 12; const x = Math.pow(1 + r, n); const monthlyPayment = Math.round(principal * r * x / (x - 1)); return { monthlyPayment, totalInterest: monthlyPayment * n - principal, totalPayment: monthlyPayment * n }; }
