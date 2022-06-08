/** SWR */
import fetcher from "../Fetcher";
import useSWR from "swr";

interface Props {
  genre: string;
  type: string;
}

const GetCount: React.FC<Props> = ({ genre, type }) => {
  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=0-10000&byTags=genre:${genre}&byProgramType=${type}&fields=id`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  return data.entryCount;
};

export default GetCount;
