import { describe, expect, test } from 'bun:test';
import { formatMonthYear, parseYearMonth, yearMonthSortValue } from './dates';

describe('parseYearMonth', () => {
  test('parses YYYY-MM and single-digit months', () => {
    expect(parseYearMonth('2025-04')).toEqual({ year: 2025, month: 4 });
    expect(parseYearMonth('2019-9')).toEqual({ year: 2019, month: 9 });
    expect(parseYearMonth('2020-12')).toEqual({ year: 2020, month: 12 });
  });

  test('rejects out-of-range months', () => {
    expect(parseYearMonth('2025-00')).toBeNull();
    expect(parseYearMonth('2025-13')).toBeNull();
  });

  test('rejects other formats', () => {
    for (const value of ['', '2025', '2025-04-01', '25-04', 'Apr 2025', ' 2025-04']) {
      expect(parseYearMonth(value)).toBeNull();
    }
  });
});

describe('formatMonthYear', () => {
  test('formats without shifting the month across time zones', () => {
    const originalTz = process.env.TZ;
    try {
      for (const tz of ['UTC', 'America/Los_Angeles', 'Pacific/Kiritimati']) {
        process.env.TZ = tz;
        expect(formatMonthYear('2025-01'), tz).toBe('Jan 2025');
        expect(formatMonthYear('2023-12'), tz).toBe('Dec 2023');
      }
    } finally {
      if (originalTz === undefined) delete process.env.TZ;
      else process.env.TZ = originalTz;
    }
  });

  test('returns an empty string for missing input', () => {
    expect(formatMonthYear()).toBe('');
    expect(formatMonthYear('')).toBe('');
  });

  test('passes unparseable values through unchanged', () => {
    expect(formatMonthYear('Present')).toBe('Present');
    expect(formatMonthYear('2025-13')).toBe('2025-13');
  });
});

describe('yearMonthSortValue', () => {
  test('orders dates chronologically', () => {
    expect(yearMonthSortValue('2024-12')).toBeLessThan(yearMonthSortValue('2025-01'));
    expect(yearMonthSortValue('2025-2')).toBeLessThan(yearMonthSortValue('2025-10'));
    expect(yearMonthSortValue('2025-04')).toBe(202504);
  });

  test('sorts invalid dates first', () => {
    expect(yearMonthSortValue('invalid')).toBe(0);
  });
});
