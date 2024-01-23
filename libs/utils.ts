export const noop = () => {};

export const getImagePath = (imageUrl: string) => {
  const url = new URL(import.meta.env.VITE_FILE_SERVER_URL);
  url.pathname = imageUrl;
  return `${url.toString()}?cache=${imageUrl}`;
};
