const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function formatMoney(cents: number | null) {
  if (cents === null) return "Unset";
  const dollars = cents / 100;
  return formatter.format(dollars);
}
