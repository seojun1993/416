export const noop = () => {};

export const getImagePath = (imageUrl: string) => {
  const url = new URL(import.meta.env.VITE_FILE_SERVER_URL);
  url.pathname = imageUrl;
  return `${url.toString()}?cache=${imageUrl}`;
};

export const numberWithinRange = (
  number: number,
  min: number,
  max: number
): number => Math.min(Math.max(number, min), max);
