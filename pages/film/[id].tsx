import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
/** COMPONENTS */
import Genres from "../../lib/Genres";
import Card, { Paragraph, H4 } from "../../components/Card";
import ActorCard from "../../components/ActorCard";
import { Stack, NewBox, Cover, Frame, Grid } from "../../ui/EveryLayout";
import capitalizeFirstLetter from "../../lib/CapitalizeFirstLetter";
/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWR from "swr";
import { release } from "os";

const Film: React.FC = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${id}?form=json`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;
  const src =
    data.plprogram$thumbnails["orig-1080x1920"]?.plprogram$url ||
    "/images/molle.jpeg";
  const title = data.title;
  const description =
    data.description === ""
      ? data.plprogram$descriptionLocalized.da
      : data.description;
  const releaseYear = data.plprogram$year;
  const type = data.plprogram$programType;
  const genres = data.plprogram$tags
    .filter((item: any) => item.plprogram$scheme === "genre")
    .map((item: any) => item.plprogram$title);
  const credits = data.plprogram$credits;
  console.log("credits", credits);

  return (
    <>
      <Head>
        <title>Film - </title>
      </Head>
      <Stack>
        <Cover style={{ position: "relative", opacity: "0.8" }}>
          <Image src={src} alt="molle" layout="fill" objectFit="cover" />
          <NewBox
            style={{
              backgroundColor: " 	hsl(295, 100%, 12%, 0.8)",
              position: "absolute",
            }}
          >
            <h1>{title}</h1>
            <h2 style={{ color: "var(--color-green)" }}>
              {releaseYear}, {capitalizeFirstLetter(type)} -{" "}
              {genres.length === 1
                ? genres
                : genres.map((genre: any) => genre + ", ")}{" "}
            </h2>
            <p>{description}</p>
          </NewBox>
        </Cover>
        <NewBox
          className="contributing"
          style={{ backgroundColor: "var(--color-purple" }}
        >
          <h2>Contributes</h2>
          <Grid minimum="20ch" gap="var(--s2)">
            {credits.map((person: any) => (
              <ActorCard
                key={person.plprogram$personName}
                header={`${person.plprogram$personName}`}
                text={`${person.plprogram$creditType}`}
              >
                <NewBox
                  padding="0rem"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    maxWidth: "350px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Frame ratio={[1, 1]} style={{ borderRadius: "50%" }}>
                    <Image
                      src="/images/person-placeholder.jpg"
                      alt="molle"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="25% 100%"
                    />
                  </Frame>
                </NewBox>
              </ActorCard>
            ))}
          </Grid>
        </NewBox>
      </Stack>
    </>
  );
};

// interface IParams extends ParsedUrlQuery {
//   id: string;
// }
// export const getStaticPaths: GetStaticPaths = async () => {
//   const genres: string[] = Genres;

//   const paths = genres.map((id) => {
//     const lowerId = id.toLowerCase();
//     return {
//       params: { id: lowerId },
//     };
//   });
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as IParams;
//   const res = await fetch(
//     `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${id}&byYear=2017&byProgramType=movie`
//   );
//   const film = await res.json();

//   return {
//     props: {
//       film,
//     },
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as IParams;
//   console.log("id", id);
//   //   const props = fetch(`http://localhost:3000/api/${id}`); // TODO: Remove hardcoded url
// //   //   console.log("promise:", props);
//   //   const test = await props;
//   //   console.log("test", test);
//   //   const lars = JSON.parse(JSON.stringify(test));
//   //   console.log("lars:", lars);

//   return { props: id };
// };

export default Film;
