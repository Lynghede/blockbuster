import type { NextPage } from "next";
import Head from "next/head";
import { Stack, NewBox } from "../ui/EveryLayout";
import Carousel from "../components/Carousel";
import Genres from "../lib/Genres";
import { useState } from "react";
import GenreInfo from "../components/GenreInfo";

const Home: NextPage = () => {
  const [type, setType] = useState("movie");
  return (
    <>
      <Head>
        <title>Blockbuster</title>
        <meta name="description" content="Created by Morten Lynghede" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        {Genres.map((genre: string) => (
          <GenreInfo genre={genre} type={type} setType={setType} key={genre}>
            <Carousel genre={genre} type={type} />
          </GenreInfo>
        ))}
      </Stack>
    </>
  );
};

export default Home;
