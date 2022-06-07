import fetcher from "../Fetcher";
import useSWR from "swr";

interface Props {
  genre: string;
}

const Movies: React.FC<Props> = (props) => {
  const { data, error } = useSWR(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10&byTags=genre:${genre}&byYear=2017&byProgramType=movie`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  return {};
};

export default Movies;
