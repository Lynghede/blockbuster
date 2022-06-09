import React from "react";
import { useMedia } from "../utlities/useMediaQuery";
/** Components */
import { Stack, NewBox } from "../ui/EveryLayout";
import Card from "./Card";
/** SWIPER */
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/** SWR */
import fetcher from "../lib/Fetcher";
import useSWR from "swr";
interface Props {
  genre: string;
  type: string;
}

const Carousel: React.FC<Props> = (props) => {
  const isMobile = useMedia<boolean>(["(max-width: 768px)"], [true], false);
  const isTablet = useMedia<boolean>(["(max-width: 1000px)"], [true], false);
  const genre = props.genre;
  const type = props.type;

  /** Fetch movies/series by category, based on user selection */
  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${genre}&byProgramType=${type}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  const entries = data.entries;

  /** Used to make the imported swiper library responsive */
  function slidesPerView() {
    if (isMobile) return 2;
    if (isTablet) return 4;
    return 5;
  }

  return (
    <NewBox padding="0">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={slidesPerView()}
        spaceBetween={20}
        navigation
        pagination={true}
      >
        {entries.map((entry: any) => (
          <SwiperSlide key={entry.title}>
            <Card data={entry} />
          </SwiperSlide>
        ))}
      </Swiper>
    </NewBox>
  );
};

export default Carousel;
