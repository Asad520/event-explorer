import { formatEventDate } from '@src/utils/date';

describe('Date Utility', () => {
  it('formats a standard ISO date correctly', () => {
    // 2024-09-05 T 09:00 AM UTC
    const input = '2024-09-05T09:00:00Z';
    const output = formatEventDate(input);

    // We check for key components because exact string depends on local timezone
    // e.g. "Thu, Sep 5"
    expect(output).toContain('Sep 5');
    expect(output).toContain('Thu');
  });

  it('handles invalid dates gracefully', () => {
    const input = 'invalid-date-string';
    const output = formatEventDate(input);
    expect(output).toBe('Date TBD');
  });
});
