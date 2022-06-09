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
  Center,
} from "../../ui/EveryLayout";
import Genres from "../../lib/Genres";
import capitalizeFirstLetter from "../../lib/CapitalizeFirstLetter";
import GenreInfo from "../../components/GenreInfo";
import Button from "../../components/Button";

/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 10;

/** The Genre component recivies server side rendered genres.
 * It creates a page for each genre.
 * It fetches the movie/series genre based data on the client side.
 * Using pagination to fetch 10 movies at a time.
 */
const Genre: React.FC<IParams> = (props) => {
  const genre = props.id;
  const [type, setType] = useState("movie");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=${
        1 + index * 10
      }-${(index + 1) * 10}&byTags=genre:${genre}&byProgramType=${type}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;
  const pages = data;
  const isLoadingInitialData = !data && !error;
  /** Determines whether there is more issues (movies/series) to load */
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.entries.length < PAGE_SIZE);

  /** Avoid nested arrays */
  const entries = pages.map((page) => page.entries).flat();

  return (
    <>
      <Head>
        <title>Genre - {capitalizeFirstLetter(genre)} </title>
      </Head>
      <Stack>
        <GenreInfo genre={genre} type={type} setType={setType}>
          <Stack>
            <Grid minimum="20ch" gap="var(--s3)">
              {entries.map((entry: any) => (
                <div key={entry.id}>
                  <Card data={entry} />
                </div>
              ))}
            </Grid>
            <Button
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? "Loading..."
                : isReachingEnd
                ? "No more issues"
                : "Load more"}
            </Button>
          </Stack>
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

  return {
    props: {
      id,
    },
  };
};

export default Genre;
