import { Stack, Grid, NoPaddingMobileNewBox } from "../../ui/EveryLayout";
import { useWatchlist } from "../../utlities/WatchlistContext";
import Card from "../Card";

const Watchlist: React.FC = () => {
  const watchlist = useWatchlist();
  const list = watchlist.watchlist || [];
  const count = list.length;

  return (
    <NoPaddingMobileNewBox>
      <Stack>
        <h1>WATCHLIST ({count})</h1>
        {list.length === 0 ? (
          <p>
            You currently have nothing on your watchlist. Go checkout a category
            and start adding!
          </p>
        ) : (
          <Grid minimum="20ch" gap="var(--s3)">
            {list.map((entry: any) => (
              <div key={entry.id}>
                <Card data={entry} />
              </div>
            ))}
          </Grid>
        )}
      </Stack>
    </NoPaddingMobileNewBox>
  );
};

export default Watchlist;
