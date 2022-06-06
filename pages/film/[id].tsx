import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

const Film: React.FC = (props) => {
  //   console.log(props);
  const entries = props.film.entries;
  const test = entries[0];
  console.log(test);
  return (
    <>
      <Head>
        <title>Film - </title>
      </Head>
      <div>
        {entries.map((entry: any) => (
          <div key={entry.id}>
            <h2>{entry.title}</h2>
            <p>Summary: {entry.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const genres: string[] = ["action", "scifi", "comedy"];

  const paths = genres.map((id) => {
    return {
      params: { id },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const res = await fetch(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${id}&byYear=2017&byProgramType=movie`
  );
  const film = await res.json();

  return {
    props: {
      film,
    },
  };
};

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
