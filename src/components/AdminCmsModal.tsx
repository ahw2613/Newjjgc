import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Eye, 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Property, ConsultationInquiry, ListingType, PropertyType } from '../types';
import { formatManwonToKorean, formatPropertyPrice } from '../utils/formatters';
import { PRINCIPAL_BROKERS } from '../data/propertiesData';

interface AdminCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onAddProperty: (newProp: Property) => void;
  onDeleteProperty: (id: string) => void;
  onTogglePropertyFlag: (id: string, flag: 'isHot' | 'isFeatured' | 'isVipExclusive') => void;
  inquiries: ConsultationInquiry[];
  onUpdateInquiryStatus: (id: string, status: 'pending' | 'in_progress' | 'completed') => void;
}

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({
  isOpen,
  onClose,
  properties,
  onAddProperty,
  onDeleteProperty,
  onTogglePropertyFlag,
  inquiries,
  onUpdateInquiryStatus
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'add'>('properties');

  // 신규 매물 등록용 폼 상태
  const [newTitle, setNewTitle] = useState('');
  const [newDistrict, setNewDistrict] = useState('용산/한남');
  const [newListingType, setNewListingType] = useState<ListingType>('sale');
  const [newPropertyType, setNewPropertyType] = useState<PropertyType>('apartment');
  const [newPrice, setNewPrice] = useState<number>(500000); // 50억
  const [newPyeong, setNewPyeong] = useState<number>(55);
  const [newRooms, setNewRooms] = useState<number>(4);
  const [newBaths, setNewBaths] = useState<number>(2);
  const [newFloor, setNewFloor] = useState<number>(18);
  const [newTotalFloors, setNewTotalFloors] = useState<number>(35);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      alert('매물 제목을 입력해주세요.');
      return;
    }

    const m2 = Math.round(newPyeong * 3.30578);
    const supplyPyeong = Math.round(newPyeong * 1.3);
    const supplyM2 = Math.round(supplyPyeong * 3.30578);

    const created: Property = {
      id: `custom-${Date.now()}`,
      titleKo: newTitle,
      subTitle: '디 어드레스 관리자 실시간 신규 등록 매물',
      region: `서울시 ${newDistrict} 권역`,
      district: newDistrict,
      addressShort: '테헤란로 152 일원',
      roadAddress: `서울특별시 ${newDistrict} 중심가 일원`,
      listingType: newListingType,
      propertyType: newPropertyType,
      price: Number(newPrice),
      exclusivePyeong: Number(newPyeong),
      supplyPyeong,
      exclusiveAreaM2: m2,
      supplyAreaM2: supplyM2,
      rooms: Number(newRooms),
      baths: Number(newBaths),
      parking: 3,
      floor: Number(newFloor),
      totalFloors: Number(newTotalFloors),
      direction: '남향',
      builtYear: 2024,
      moveInDate: '즉시 입주 협의',
      maintenanceCost: 50,
      images: [
        newImage,
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ],
      descriptionKo: newDesc || '관리자 시스템에서 직접 검증 후 즉시 등록된 하이엔드 프리미엄 매물입니다. 로열층 파노라마 조망권과 최고급 수입 자재를 자랑합니다.',
      features: ['실시간 신규등록', '로열층 파노라마뷰', '단독 지정주차', '24시간 보안'],
      schools: [
        { name: '인근 초·중학교', type: '초등', distance: '도보 5분', ratingNote: '우수 학군' }
      ],
      subway: {
        station: '역세권 도보 5분',
        walkMinutes: 5,
        lines: ['지하철역 연계']
      },
      isHot: true,
      isFeatured: true,
      agent: PRINCIPAL_BROKERS.luxury_team,
      coordinates: { lat: 37.525, lng: 127.035 }
    };

    onAddProperty(created);
    alert('신규 매물이 등록되었습니다! 매물 목록 및 지도에서 즉시 확인하실 수 있습니다.');
    setActiveTab('properties');
  };

  const totalAssetValue = properties.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="admin-cms-modal"
        className="relative w-full max-w-5xl bg-[#111111] text-neutral-100 shadow-2xl border border-neutral-800 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#161616] border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-white uppercase tracking-widest">
              THE ADDRESS ADMIN CONSOLE
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              Portfolio &amp; Lead Management System
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:px-6 bg-[#141414] border-b border-neutral-800 text-xs">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">총 등록 매물</span>
            <span className="text-base font-semibold text-white mt-0.5 block">{properties.length} Units</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">총 포트폴리오 가액</span>
            <span className="text-base font-semibold text-white mt-0.5 block">{formatManwonToKorean(totalAssetValue)}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">상담 및 투어 문의</span>
            <span className="text-base font-semibold text-white mt-0.5 block">{inquiries.length} Inquiries</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">시스템 상태</span>
            <span className="text-base font-semibold text-neutral-300 mt-0.5 block">Active</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-6 px-6 pt-4 border-b border-neutral-800 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-3 transition-colors ${
              activeTab === 'properties' ? 'border-b-2 border-white text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            PROPERTIES ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 transition-colors ${
              activeTab === 'inquiries' ? 'border-b-2 border-white text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            INQUIRIES ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 transition-colors ${
              activeTab === 'add' ? 'border-b-2 border-white text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            + ADD PROPERTY
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: Properties List */}
          {activeTab === 'properties' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">등록된 매물을 실시간으로 수정 및 노출 플래그를 토글할 수 있습니다.</span>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>신규 매물 추가</span>
                </button>
              </div>

              <div className="space-y-2">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prop.images[0]}
                        alt={prop.titleKo}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                            {prop.district}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {prop.titleKo}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-amber-300 mt-1">
                          {formatPropertyPrice(prop.listingType, prop.price, prop.deposit, prop.monthlyRent)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          전용 {prop.exclusivePyeong}평 · 룸{prop.rooms}/욕{prop.baths} · {prop.floor}층
                        </p>
                      </div>
                    </div>

                    {/* Flags & Delete Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => onTogglePropertyFlag(prop.id, 'isVipExclusive')}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                          prop.isVipExclusive
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                        title="VIP 전속 매물 토글"
                      >
                        VIP
                      </button>
                      <button
                        onClick={() => onTogglePropertyFlag(prop.id, 'isHot')}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                          prop.isHot
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                        title="HOT 인기 매물 토글"
                      >
                        HOT
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`[${prop.titleKo}] 매물을 삭제하시겠습니까?`)) {
                            onDeleteProperty(prop.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/60 transition"
                        title="매물 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Inquiries Management */}
          {activeTab === 'inquiries' && (
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800">
                  <p className="text-sm text-slate-400">아직 접수된 상담/투어 신청 내역이 없습니다.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          inq.type === 'tour' ? 'bg-amber-500/20 text-amber-300' :
                          inq.type === 'sell_request' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {inq.type === 'tour' ? '방문투어 신청' : inq.type === 'sell_request' ? '내집내놓기 의뢰' : '1:1 자산상담'}
                        </span>
                        <h4 className="text-sm font-bold text-white">{inq.name} 고객님</h4>
                        <span className="text-xs text-slate-400">({inq.phone})</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {inq.notes || (inq.propertyTitle ? `대상: ${inq.propertyTitle}` : `관심권역: ${inq.targetRegion}`)}
                      </p>
                      {inq.preferredDate && (
                        <p className="text-[11px] text-amber-400 mt-1">
                          희망일정: {inq.preferredDate} ({inq.preferredTime})
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500 mt-1">접수일시: {inq.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold border focus:outline-none cursor-pointer ${
                          inq.status === 'completed'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : inq.status === 'in_progress'
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        <option value="pending">접수 대기중</option>
                        <option value="in_progress">상담 진행중</option>
                        <option value="completed">상담 완료</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Add New Property Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProperty} className="space-y-4 max-w-2xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">새로운 프리미엄 매물 등록</h4>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">매물명 (단지명 및 타이틀) *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 청담 에테르노 하이퍼엔드 펜트하우스"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">권역</label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="용산/한남">용산/한남</option>
                    <option value="강남/청담">강남/청담</option>
                    <option value="성동/성수">성동/성수</option>
                    <option value="서초/반포">서초/반포</option>
                    <option value="송파/잠실">송파/잠실</option>
                    <option value="광주/봉선">광주/봉선</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">거래 형태</label>
                  <select
                    value={newListingType}
                    onChange={(e) => setNewListingType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="sale">매매</option>
                    <option value="jeonse">전세</option>
                    <option value="rent">월세</option>
                    <option value="commercial">빌딩·상업용</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">가격 (만원 단위) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-amber-400 mt-0.5 block">{formatManwonToKorean(newPrice)}</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">전용면적 (평)</label>
                  <input
                    type="number"
                    value={newPyeong}
                    onChange={(e) => setNewPyeong(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">약 {Math.round(newPyeong * 3.3)}㎡</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">방/욕실</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      placeholder="방"
                      value={newRooms}
                      onChange={(e) => setNewRooms(Number(e.target.value))}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white text-center"
                    />
                    <input
                      type="number"
                      placeholder="욕실"
                      value={newBaths}
                      onChange={(e) => setNewBaths(Number(e.target.value))}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white text-center"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">대표 사진 이미지 URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">매물 설명 코멘트</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="특장점 및 브리핑 내용을 기재하세요."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
              >
                매물 데이터베이스에 즉시 등록
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
