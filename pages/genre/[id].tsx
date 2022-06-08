import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
/** COMPONENTS */
import Card from "../../components/Card";
import {
  Stack,
  NewBox,
  Switcher,
  Grid,
  NoPaddingMobileNewBox,
} from "../../ui/EveryLayout";
import Genres from "../../lib/Genres";
import capitalizeFirstLetter from "../../lib/CapitalizeFirstLetter";
import GenreInfo from "../../components/GenreInfo";

/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 6;

const Genre: React.FC<IParams> = (props) => {
  const genre = props.id;
  const [type, setType] = useState("movie");

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=${
        1 + index * 10
      }-${(index + 1) * 10}&byTags=genre:${genre}&byProgramType=${type}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;
  // const pages = data ? [].concat(...data) : [];
  const pages = data;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const entries = pages.map((page) => page.entries).flat();

  return (
    <>
      <Head>
        <title>Genre - {capitalizeFirstLetter(genre)} </title>
      </Head>
      <Stack>
        <GenreInfo genre={genre} type={type} setType={setType}>
          <Grid minimum="25ch">
            {entries.map((entry: any) => (
              <NoPaddingMobileNewBox key={entry.id}>
                <Card data={entry} />
              </NoPaddingMobileNewBox>
            ))}
          </Grid>
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore
              ? "loading..."
              : isReachingEnd
              ? "no more issues"
              : "load more"}
          </button>
        </GenreInfo>
      </Stack>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const genres: string[] = Genres;

  const paths = genres.map((id) => {
    const lowerId = id.toLowerCase();
    return {
      params: { id: lowerId },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  // const res = await fetch(
  //   `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${id}&byYear=2017&byProgramType=movie`
  // );
  // const genre = await res.json();

  return {
    props: {
      id,
    },
  };
};

export default Genre;
