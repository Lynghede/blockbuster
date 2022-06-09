import { createContext, useContext, useState } from "react";

interface Watchlist {}

interface WatchlistContext {
  watchlist: string[];
  addToList(x: string): any;
  removeFromList(x: string): any;
}

const defaultValue: WatchlistContext = {
  watchlist: [],
  addToList: () => {
    throw new Error("No watchlist context");
  },
  removeFromList: () => {
    throw new Error("No watchlist context");
  },
};

export const WatchlistContext = createContext(defaultValue);

export const useWatchlist = (): WatchlistContext =>
  useContext(WatchlistContext);

export const WatchlistProvider: React.FC<any> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const addToList = (id: string) => {
    setWatchlist([...watchlist, id]);
  };
  const removeFromList = (id: string) => {
    setWatchlist(watchlist.filter((itemID) => itemID !== id));
  };

  const value = { watchlist, addToList, removeFromList };
  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
