import React, { useState } from 'react';
import { X, Calculator, Sparkles } from 'lucide-react';
import { calculateAcquisitionTax, calculateBrokerageFee, calculateMortgageMonthly, formatManwonToKorean } from '../utils/formatters';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [priceInEok, setPriceInEok] = useState<number>(50); // 50억
  const [houseCount, setHouseCount] = useState<1 | 2 | 3>(1);
  const [ltvPercent, setLtvPercent] = useState<number>(40);
  const [interestRate, setInterestRate] = useState<number>(4.2);
  const [loanYears, setLoanYears] = useState<number>(30);

  const priceInManwon = priceInEok * 10000;
  const loanPrincipal = Math.round(priceInManwon * (ltvPercent / 100));

  const taxResult = calculateAcquisitionTax(priceInManwon, houseCount);
  const feeResult = calculateBrokerageFee(priceInManwon, 'sale');
  const mortgageResult = calculateMortgageMonthly(loanPrincipal, interestRate, loanYears);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="mortgage-calculator-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">취득세 & 주택담보대출 정밀 계산기</h3>
              <p className="text-[11px] text-slate-400">현행 세법 기준 취득세, 법정 중개수수료 및 원리금 균등상환액 시뮬레이션</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800">
          {/* Inputs */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">매매 취득가액</label>
                <span className="text-sm font-black text-amber-700">{priceInEok}억원 ({formatManwonToKorean(priceInManwon)})</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={priceInEok}
                onChange={(e) => setPriceInEok(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10억원</span>
                <span>50억원</span>
                <span>100억원</span>
                <span>200억원</span>
              </div>
            </div>

            {/* House count selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">취득 시 세대 보유 주택수</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setHouseCount(1)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    houseCount === 1
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1주택자 (기본세율)
                </button>
                <button
                  onClick={() => setHouseCount(2)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    houseCount === 2
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2주택자 (중과 8%)
                </button>
                <button
                  onClick={() => setHouseCount(3)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    houseCount === 3
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3주택 이상 (중과 12%)
                </button>
              </div>
            </div>

            {/* Mortgage Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  대출비율 LTV ({ltvPercent}%)
                </label>
                <select
                  value={ltvPercent}
                  onChange={(e) => setLtvPercent(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-medium"
                >
                  <option value={20}>20% ({formatManwonToKorean(Math.round(priceInManwon * 0.2))})</option>
                  <option value={30}>30% ({formatManwonToKorean(Math.round(priceInManwon * 0.3))})</option>
                  <option value={40}>40% ({formatManwonToKorean(Math.round(priceInManwon * 0.4))})</option>
                  <option value={50}>50% ({formatManwonToKorean(Math.round(priceInManwon * 0.5))})</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  대출 금리 (연 {interestRate}%)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  상환 기간
                </label>
                <select
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-medium"
                >
                  <option value={10}>10년 만기</option>
                  <option value={20}>20년 만기</option>
                  <option value={30}>30년 만기</option>
                  <option value={40}>40년 만기</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">산출 결과 요약</h4>

            {/* Tax & Fee */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block">취득세 총 세액 (세율 {taxResult.taxRate}%)</span>
                <span className="text-lg font-black text-slate-900 mt-1 block">
                  {formatManwonToKorean(taxResult.totalTax)}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  지방교육세 및 농특세 포함
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block">법정 중개보수 한도 (상한 {feeResult.feeRate}%)</span>
                <span className="text-lg font-black text-slate-900 mt-1 block">
                  {formatManwonToKorean(feeResult.total)}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  부가세 10% 포함 상한액
                </span>
              </div>
            </div>

            {/* Monthly Mortgage Banner */}
            <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-400 font-bold block">
                  예상 월 원리금 상환액 (원금 {formatManwonToKorean(loanPrincipal)})
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  월 약 {formatManwonToKorean(mortgageResult.monthlyPayment)}
                </span>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>총 대출이자: {formatManwonToKorean(mortgageResult.totalInterest)}</p>
                <p>총 원리금 합계: {formatManwonToKorean(mortgageResult.totalPayment)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
