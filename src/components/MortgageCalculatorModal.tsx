import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="mortgage-calculator-modal"
        className="relative w-full max-w-2xl bg-white text-[#111111] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-light tracking-wide uppercase">
              FINANCIAL &amp; TAX SIMULATOR
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              대한민국 현행 세법 기준 취득세 및 원리금 상환 시뮬레이션
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-60 transition"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <label className="uppercase tracking-wider text-neutral-500 font-medium">매매 예상가액</label>
                <span className="font-semibold text-sm">{priceInEok}억원</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={priceInEok}
                onChange={(e) => setPriceInEok(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">취득 주택수</label>
                <div className="flex border border-neutral-200">
                  {[1, 2, 3].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setHouseCount(cnt as any)}
                      className={`flex-1 py-2 text-xs font-medium transition ${
                        houseCount === cnt ? 'bg-[#111111] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {cnt === 1 ? '1주택' : `${cnt}주택 (중과)`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">LTV 담보대출 비율 ({ltvPercent}%)</label>
                <input
                  type="range"
                  min="0"
                  max="70"
                  step="10"
                  value={ltvPercent}
                  onChange={(e) => setLtvPercent(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block uppercase tracking-wider text-neutral-500 mb-1 font-medium">대출 연이율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2.5 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-neutral-500 mb-1 font-medium">대출 상환 만기 (년)</label>
                <select
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full p-2.5 border border-neutral-200 text-sm bg-white focus:outline-none focus:border-black"
                >
                  <option value={10}>10년 만기</option>
                  <option value={20}>20년 만기</option>
                  <option value={30}>30년 만기</option>
                  <option value={40}>40년 만기</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Breakdown */}
          <div className="pt-6 border-t border-neutral-100">
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
              ESTIMATED RESULTS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-50">
                <p className="text-neutral-500 text-[11px] uppercase tracking-wider mb-1">예상 취득세액</p>
                <p className="text-xl font-semibold text-[#111111]">{formatManwonToKorean(taxResult.totalTax)}</p>
                <p className="text-[11px] text-neutral-400 mt-1">실효세율 {taxResult.taxRate}%</p>
              </div>
              <div className="p-4 bg-neutral-50">
                <p className="text-neutral-500 text-[11px] uppercase tracking-wider mb-1">법정 중개보수</p>
                <p className="text-xl font-semibold text-[#111111]">{formatManwonToKorean(feeResult.total)}</p>
                <p className="text-[11px] text-neutral-400 mt-1">상한요율 {(feeResult.feeRate * 100).toFixed(2)}%</p>
              </div>
              <div className="p-4 bg-neutral-50">
                <p className="text-neutral-500 text-[11px] uppercase tracking-wider mb-1">월 원리금 상환액</p>
                <p className="text-xl font-semibold text-[#111111]">{mortgageResult.toLocaleString()}만원</p>
                <p className="text-[11px] text-neutral-400 mt-1">대출원금 {(loanPrincipal / 10000).toFixed(1)}억원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
