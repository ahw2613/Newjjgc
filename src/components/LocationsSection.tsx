import React from 'react';

interface LocationsSectionProps {
  onSelectDistrictFilter: (districtName: string) => void;
}

const AREAS = [
  { name: 'Fort Lee', region: 'Bergen County', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1400&q=82', copy: 'Hudson River views, convenient access to Manhattan, and a strong Korean-American community.' },
  { name: 'Edgewater', region: 'Hudson Waterfront', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=82', copy: 'Waterfront living along the Hudson with direct views across to Manhattan.' },
  { name: 'Englewood Cliffs', region: 'Bergen County', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82', copy: 'Private estates, mature neighborhoods, and one of Bergen County’s most sought-after addresses.' },
  { name: 'Tenafly', region: 'Northern Valley', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=82', copy: 'Quiet residential streets, highly regarded schools, and a suburban setting close to New York.' },
  { name: 'Palisades Park', region: 'Bergen County', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82', copy: 'A connected Bergen County community with local businesses, transit, and easy access to Fort Lee.' },
  { name: 'Closter', region: 'Northern Valley', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82', copy: 'A refined suburban market known for spacious homes, established neighborhoods, and local amenities.' },
];

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectDistrictFilter }) => {
  return (
    <section id="locations-section" className="bg-[#f5f5f2] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[9px] font-medium tracking-[0.25em] text-black/45">NORTH JERSEY</p>
            <h2 className="text-3xl font-light tracking-[-0.02em] sm:text-5xl">Explore the area</h2>
          </div>
          <p className="max-w-md text-[13px] leading-6 text-black/55">Local market knowledge matters. Explore the communities our team knows best across Bergen County and the Hudson waterfront.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(area => (
            <article key={area.name} className="group cursor-pointer" onClick={() => onSelectDistrictFilter(area.name)}>
              <div className="aspect-[1.2/1] overflow-hidden bg-[#e9e9e5]">
                <img src={area.image} alt={area.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              </div>
              <div className="pt-4">
                <p className="text-[9px] font-medium tracking-[0.18em] text-black/40">{area.region}</p>
                <h3 className="mt-1 text-[19px] font-medium tracking-[-0.01em]">{area.name}</h3>
                <p className="mt-2 max-w-sm text-[11px] leading-5 text-black/52">{area.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
