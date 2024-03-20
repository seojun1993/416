import { UseQueryOptionsFn } from "@/types/query";

export interface AlbumJson {
  result: boolean;
  data: Album[];
}

export interface Album {
  id: string;
  class: number;
  url: string;
  order: number;
}

export const getAlbums: UseQueryOptionsFn<Album[]> = (options) => ({
  ...options,
  queryKey: ["albums"],
  queryFn: () =>
    fetch("/contents/galbum.json")
      .then((res) => res.json() as Promise<AlbumJson>)
      .then((res) => {
        res.data.sort((a, b) => {
          const sameClass = a.class === b.class;
          return sameClass ? a.order - b.order : a.class - b.class;
        });

        return res.data;
      }),
});
