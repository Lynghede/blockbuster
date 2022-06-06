import Head from "next/head";

const Genre: React.FC = () => {
  return (
    <>
      <Head>
        <title>Genre - Watchlist</title>
      </Head>
      <div>Some component</div>
    </>
  );
};

export async function getStaticPaths() {
  const genres = ["test", "lars", "allan"];

  return {
    props: {
      paths: genres.map((name) => ({ params: { name } })),
      fallback: false,
    },
  };
}

export async function getStaticProps({ params }) {
  const someData = { genre: "lars", year: "1993", params: params.id };
  return {
    props: {
      genreData: someData,
    },
  };
}

export default Genre;
