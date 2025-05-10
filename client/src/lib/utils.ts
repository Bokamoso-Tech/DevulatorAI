import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  if (typeof amount === 'string') {
    // If it's already a formatted string, return it
    if (amount.includes('R')) return amount;
    
    // Try to parse it as a number
    const parsed = parseFloat(amount);
    if (isNaN(parsed)) return amount;
    amount = parsed;
  }
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/ZAR/g, 'R');
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function getScoreColorClass(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-blue-100 text-blue-800';
  if (score >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'government', label: 'Government' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'mining', label: 'Mining' },
  { value: 'construction', label: 'Construction' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'other', label: 'Other' }
];

export const budgetRangeOptions = [
  { value: 'R100,000 - R250,000', label: 'R100,000 - R250,000' },
  { value: 'R250,000 - R500,000', label: 'R250,000 - R500,000' },
  { value: 'R500,000 - R1,000,000', label: 'R500,000 - R1,000,000' },
  { value: 'R1,000,000 - R2,500,000', label: 'R1,000,000 - R2,500,000' },
  { value: 'R2,500,000 - R5,000,000', label: 'R2,500,000 - R5,000,000' },
  { value: 'R5,000,000+', label: 'R5,000,000+' }
];

export const timelineOptions = [
  { value: '1-3 months', label: '1-3 months' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-9 months', label: '6-9 months' },
  { value: '9-12 months', label: '9-12 months' },
  { value: '12-18 months', label: '12-18 months' },
  { value: '18+ months', label: '18+ months' }
];
