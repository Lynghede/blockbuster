import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
/** COMPONENTS */
import ActorCard from "../../components/ActorCard";
import { Stack, NewBox, Cover, Frame, Grid } from "../../ui/EveryLayout";
import capitalizeFirstLetter from "../../lib/CapitalizeFirstLetter";
/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWR from "swr";

/** The componenet is responsible for fetching a movie/series data based on its ID.
 * The ID is taken from the URL query
 */
const Film: React.FC = () => {
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

  return (
    <>
      <Head>
        <title>
          {capitalizeFirstLetter(type)} - {title}
        </title>
      </Head>
      <Stack>
        <Stack style={{ position: "relative" }}>
          <Backdrop url={src}>
            <BackdropGradient />
          </Backdrop>
          <Description>
            <h1>{title}</h1>
            <h2 style={{ color: "var(--color-green)" }}>
              {releaseYear}, {capitalizeFirstLetter(type)} -{" "}
              {genres.length === 1
                ? genres
                : genres.map((genre: any) => genre + ", ")}{" "}
            </h2>
            <p>{description}</p>
          </Description>
        </Stack>
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

export default Film;

interface Backdrop {
  url: string;
}
const Backdrop = styled.div<Backdrop>`
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(p) => (p.url ? `url(${p.url})` : "/images/morten.jpeg")};
  height: 700px;
  background-position: 50% 50% !important;
  overflow: hidden;
`;

const BackdropGradient = styled.div`
  background-image: linear-gradient(0deg, var(--color-purple) 5%, transparent);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Description = styled(NewBox)`
  left: 0;
  bottom: 0;
  margin-top: 0;
  position: absolute;
  width: 100%;
`;
