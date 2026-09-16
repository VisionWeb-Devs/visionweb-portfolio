/**
 * Formats a package price for display.
 *
 * Price arrives from Strapi as a number plus an ISO currency code rather than a
 * pre-rendered string like "+20,000 DZD", so the presentation — grouping,
 * separator, currency placement — is decided here and can vary by locale once
 * the site is localised. A null price means the tier is quoted rather than
 * listed.
 */
export function formatPrice(
  price: number | null,
  currency: string,
  priceIsFrom: boolean,
  locale: string,
  quotedLabel: string,
): string {
  if (price === null) return quotedLabel;

  const amount = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(price);

  return `${priceIsFrom ? "+" : ""}${amount} ${currency}`;
}
