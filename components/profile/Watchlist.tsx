import styled from "styled-components";
import { Stack } from "../../ui/EveryLayout";
import { useWatchlist } from "../../utlities/WatchlistContext";
/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWR from "swr";

const Watchlist: React.FC = () => {
  const watchlist = useWatchlist();
  const id = watchlist.watchlist[0] || "";

  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${id}?form=json`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;
  return (
    <>
      <div>WATCHLIST</div>
      <Stack>
        <Wrapper>{data.title}</Wrapper>
        <Wrapper>{data.plprogram$year}</Wrapper>
        <Wrapper>HEJSA</Wrapper>
        <Wrapper>HEJSA</Wrapper>
      </Stack>
    </>
  );
};

export default Watchlist;

const Wrapper = styled.div`
  display: flex;
  background-color: purple;
`;
