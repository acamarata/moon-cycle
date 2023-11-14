// index.d.ts
declare module 'moon-cycle' {
  export function cycleMonth(date: Date): MonthResult;
  export function cycleYear(date: Date): YearResult;

  interface MonthResult {
    result: string;
  }
  interface YearResult {
    result: string;
  }
}
