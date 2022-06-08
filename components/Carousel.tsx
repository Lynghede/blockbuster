import React from "react";
import Image from "next/image";
import styled from "styled-components";
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
  const genre = props.genre;
  const type = props.type;
  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${genre}&byProgramType=${type}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  // console.log(`this is ${genre}: `, data.entries);
  const entries = data.entries;
  return (
    <NewBox>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onSwiper={(swiper) => console.log("lol")}
        slidesPerView={4}
        spaceBetween={50}
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
