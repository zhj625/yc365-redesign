import React from 'react';

export type Language = 'en' | 'zh';

export interface Market {
  id: string;
  title: string;
  iconUrl: string;
  percentage: number;
  volume: string; // e.g., "$ 14K Vol."
  category: string;
  endDate: string;
}

export interface Category {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterTag {
  id: string;
  label: string;
}