import Head from "next/head";
import Watchlist from "../components/profile/Watchlist";

const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Profile - Watchlist</title>
      </Head>
      <Watchlist />
    </>
  );
};

export default IndexPage;
