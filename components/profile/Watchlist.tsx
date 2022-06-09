import styled from "styled-components";
import {
  Stack,
  Grid,
  NoPaddingMobileNewBox,
  NewBox,
} from "../../ui/EveryLayout";
import { useWatchlist } from "../../utlities/WatchlistContext";
import Card from "../Card";
/** SWR */
import fetcher from "../../lib/Fetcher";
import useSWR from "swr";

const Watchlist: React.FC = () => {
  const watchlist = useWatchlist();
  const list = watchlist.watchlist || [];
  console.log(list);

  return (
    <NewBox>
      <Stack>
        <h1>WATCHLIST</h1>
        {list.length === 0 ? (
          <p>
            You currently have nothing on your watchlist. Go checkout a category
            and start adding!
          </p>
        ) : (
          <Grid minimum="25ch">
            {list.map((entry: any) => (
              <NoPaddingMobileNewBox key={entry.id}>
                <Card data={entry} />
              </NoPaddingMobileNewBox>
            ))}
          </Grid>
        )}
      </Stack>
    </NewBox>
  );
};

export default Watchlist;

const Wrapper = styled.div`
  display: flex;
  background-color: purple;
`;
