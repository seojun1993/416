import { Album } from "@/types/albums";
import { UseQueryOptionsFn } from "@/types/query";

export const getAlbums: UseQueryOptionsFn<Album[]> = (options) => ({
  ...options,
  queryKey: ["albums"],
  queryFn: () =>
    import("@/assets/mocks/album.json").then((res) => {
      res.data.sort((a, b) => {
        const sameClass = a.class === b.class;
        return sameClass ? a.order - b.order : a.class - b.class;
      });

      return res.data;
    }),
});
