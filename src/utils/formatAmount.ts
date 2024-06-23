export function formatAmount(amount: number): string {
  const dollars = amount / 100;
  const formattedAmount = dollars.toFixed(2);
  return `$${formattedAmount}`;
}
