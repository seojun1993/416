import { EmblaCarouselType } from "embla-carousel-react";
import { CreatePluginType } from "embla-carousel/components/Plugins";

interface PrefetchOptions {
  onSelect?: (selectedIndex: number) => void;
}

export function Prefetch(options?: PrefetchOptions): CreatePluginType<
  {
    [key: string]: unknown;
  },
  {}
> {
  let emblaApi: EmblaCarouselType;
  let nodes: HTMLElement[];

  function onSlideInView() {
    const idxs = emblaApi.slidesInView();
    const idxList = [
      idxs[0] - 2,
      idxs[0] - 1,
      ...idxs,
      idxs[idxs.length - 1] + 1,
      idxs[idxs.length - 1] + 2,
    ];
    idxList.forEach((idx) => {
      const img = nodes?.[idx]?.querySelector("img");
      if (img) {
        if (img.getAttribute("loading") === "lazy") {
          img.removeAttribute("loading");
        }
      }
    });
  }

  function handleSelect() {
    options?.onSelect &&
      options?.onSelect(emblaApi.internalEngine().index.get());
  }

  return {
    init(embla, OptionsHandler) {
      emblaApi = embla;
      nodes = emblaApi.slideNodes();
      emblaApi.on("slidesInView", onSlideInView);
      emblaApi.on("select", handleSelect);
      emblaApi.on("slidesInView", handleSelect);
    },
    name: "virtual",
    options: {},
    destroy() {
      emblaApi.off("slidesInView", onSlideInView);
      emblaApi.off("select", handleSelect);
      emblaApi.off("slidesInView", handleSelect);
    },
  };
}
