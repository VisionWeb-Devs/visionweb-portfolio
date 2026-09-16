/**
 * Formats a package price range for display.
 *
 * Prices arrive from Strapi as integers plus an ISO currency code rather than
 * pre-rendered strings, so grouping and separators follow the reader's locale:
 * English renders "15,000 – 50,000 DZD", French "15 000 – 50 000 DZD" with a
 * narrow no-break space. A missing range means the tier is quoted rather than
 * listed.
 */
export function formatPriceRange(
  min: number | null,
  max: number | null,
  currency: string,
  locale: string,
  quotedLabel: string,
): string {
  const format = (value: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);

  if (min === null && max === null) return quotedLabel;
  if (min !== null && max !== null && min !== max) {
    return `${format(min)} – ${format(max)} ${currency}`;
  }

  const single = (min ?? max) as number;
  return `${format(single)} ${currency}`;
}
