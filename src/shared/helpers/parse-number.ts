export const parseNumber = (value: string): number | null => {
  const num = parseInt(value, 10);

  return Number.isNaN(num) ? null : num;
};
