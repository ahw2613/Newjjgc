import React, { useState } from 'react';
import { X, Calculator, DollarSign, Percent, Calendar, Info, HelpCircle } from 'lucide-react';
import { calculateMortgage } from '../utils/formatters';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [homePrice, setHomePrice] = useState<number>(1200000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<15 | 30>(30);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(18000);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(0);

  if (!isOpen) return null;

  const result = calculateMortgage(
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    annualPropertyTax,
    monthlyHoa
  );

  // NJ Mansion Tax check (1% on purchases $1M and above)
  const isMansionTaxApplicable = homePrice >= 1000000;
  const estimatedMansionTax = isMansionTaxApplicable ? homePrice * 0.01 : 0;

  // Visual percentage for progress bars
  const piPct = Math.round((result.monthlyPrincipalInterest / result.monthlyTotal) * 100) || 0;
  const taxPct = Math.round((result.monthlyPropertyTax / result.monthlyTotal) * 100) || 0;
  const insPct = Math.round((result.monthlyInsurance / result.monthlyTotal) * 100) || 0;
  const hoaPct = Math.round((result.monthlyHoa / result.monthlyTotal) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">뉴저지 모기지 & 월 주거비용 계산기</h3>
              <p className="text-xs text-slate-400">원금, 이자, 재산세, 주택보험 및 뉴저지 세금 사전 점검</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Home Price */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>주택 구매 가격 (Home Price)</span>
                <span className="text-sm font-black text-blue-600">${homePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={300000}
                max={4000000}
                step={25000}
                value={homePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHomePrice(val);
                  // automatically adjust property tax estimate based on ~1.8% NJ average
                  setAnnualPropertyTax(Math.round(val * 0.018));
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$300K</span>
                <span>$1M</span>
                <span>$2M</span>
                <span>$4M</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>다운페이먼트 (Down Payment)</span>
                <span className="text-sm font-black text-blue-600">
                  {downPaymentPercent}% (${result.downPaymentAmount.toLocaleString()})
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5%</span>
                <span>20% (일반적)</span>
                <span>35%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>모기지 이자율 (Interest Rate)</span>
                <span className="text-sm font-black text-blue-600">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={4.0}
                max={8.5}
                step={0.125}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">상환 기간 (Loan Term)</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLoanTermYears(30)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    loanTermYears === 30
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  30년 고정금리
                </button>
                <button
                  type="button"
                  onClick={() => setLoanTermYears(15)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    loanTermYears === 15
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  15년 고정금리
                </button>
              </div>
            </div>

            {/* Annual Property Tax */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                연간 재산세 (NJ Property Tax/Year)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  value={annualPropertyTax}
                  onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>

            {/* Monthly HOA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                월 HOA 관리비 (콘도/타운하우스인 경우)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  value={monthlyHoa}
                  onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">총 월 예상 주거 비용</span>
                <p className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tight mt-1">
                  ${result.monthlyTotal.toLocaleString()}
                  <span className="text-sm font-normal text-slate-400"> /월</span>
                </p>
              </div>
              <div className="text-right text-xs text-slate-300">
                <p>대출 원금: <strong>${result.loanAmount.toLocaleString()}</strong></p>
                <p className="mt-0.5">다운페이먼트: <strong>${result.downPaymentAmount.toLocaleString()}</strong></p>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-4">
              <div className="h-3 rounded-full overflow-hidden flex bg-slate-800">
                <div style={{ width: `${piPct}%` }} className="bg-blue-500" title={`원리금: ${piPct}%`}></div>
                <div style={{ width: `${taxPct}%` }} className="bg-emerald-500" title={`재산세: ${taxPct}%`}></div>
                <div style={{ width: `${insPct}%` }} className="bg-amber-500" title={`주택보험: ${insPct}%`}></div>
                <div style={{ width: `${hoaPct}%` }} className="bg-purple-500" title={`HOA: ${hoaPct}%`}></div>
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                  <div>
                    <span className="text-slate-400 text-[11px] block">원금 & 이자</span>
                    <strong className="text-white">${result.monthlyPrincipalInterest.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <div>
                    <span className="text-slate-400 text-[11px] block">재산세 (월환산)</span>
                    <strong className="text-white">${result.monthlyPropertyTax.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <div>
                    <span className="text-slate-400 text-[11px] block">주택화재보험</span>
                    <strong className="text-white">${result.monthlyInsurance.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span>
                  <div>
                    <span className="text-slate-400 text-[11px] block">HOA 관리비</span>
                    <strong className="text-white">${result.monthlyHoa.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Jersey Special Closing Costs Note */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-950 mb-1">
              <Info className="w-4 h-4 text-amber-600" />
              뉴저지(NJ) 주택 매수 시 추가 클로징 비용 가이드
            </h4>
            <ul className="list-disc list-inside space-y-1 mt-1 text-amber-800">
              {isMansionTaxApplicable ? (
                <li className="font-bold text-rose-700">
                  ⚠️ 100만 불 이상 맨션택스(Mansion Tax 1%): 본 매매가 기준 약 ${estimatedMansionTax.toLocaleString()} 구매자 납부 대상
                </li>
              ) : (
                <li>100만 불 미만 주택은 뉴저지 맨션택스(1%)가 면제됩니다.</li>
              )}
              <li>변호사 수임료(Attorney Fee): 통상 약 $1,500 ~ $2,500 내외</li>
              <li>홈 인스펙션(Home Inspection): 라돈(Radon), 터마이트(Termite) 포함 약 $600 ~ $1,200</li>
              <li>소유권 보험(Title Insurance) 및 렌더 수수료: 매매가의 약 1~1.5% 수준</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            계산기 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
