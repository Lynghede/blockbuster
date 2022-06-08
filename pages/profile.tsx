import Head from "next/head";
import Watchlist from "../components/profile/Watchlist";
/** SWR */
import fetcher from "../lib/Fetcher";
import useSWR from "swr";
const IndexPage: React.FC = () => {
  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/106608168011?form=json`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  console.log(data.id);
  const dataID = data.id;
  const tempArray = dataID.split("/");
  const id = tempArray[tempArray.length - 1];
  console.log(id);

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
