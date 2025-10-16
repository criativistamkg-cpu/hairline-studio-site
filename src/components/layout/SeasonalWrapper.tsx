"use client";

import { useEffect } from 'react';

const getSeason = (date: Date): 'winter' | 'spring' | 'summer' | 'autumn' => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'spring'; // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'summer'; // Jun, Jul, Aug
  if (month >= 8 && month <= 10) return 'autumn'; // Sep, Oct, Nov
  return 'winter'; // Dec, Jan, Feb
};

export function SeasonalWrapper() {
  useEffect(() => {
    const season = getSeason(new Date());
    document.body.classList.add(`theme-${season}`);
    
    return () => {
      document.body.classList.remove('theme-winter', 'theme-spring', 'theme-summer', 'theme-autumn');
    };
  }, []);

  return null;
}
