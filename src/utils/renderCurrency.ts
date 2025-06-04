export function renderCurrency({
  price,
  showCurrency = true,
}: {
  price: number;
  showCurrency?: boolean;
}) {
  // Convert to string and add thousand separators (dots)
  const formattedNumber = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Add Rp prefix
  return showCurrency ? `Rp${formattedNumber}` : `${formattedNumber}`;
}
