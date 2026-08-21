const MONTH_YEAR: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
};

export function parseYearMonth(dateStr: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{1,2})$/.exec(dateStr);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;

  return { year, month };
}

/** Format `YYYY-MM` in local time so month values are not shifted by UTC parsing. */
export function formatMonthYear(dateStr?: string): string {
  if (!dateStr) return '';
  const parsed = parseYearMonth(dateStr);
  if (!parsed) return dateStr;
  return new Date(parsed.year, parsed.month - 1, 1).toLocaleDateString(
    'en-US',
    MONTH_YEAR,
  );
}

export function yearMonthSortValue(dateStr: string): number {
  const parsed = parseYearMonth(dateStr);
  if (!parsed) return 0;
  return parsed.year * 100 + parsed.month;
}
