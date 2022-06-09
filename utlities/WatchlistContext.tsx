import { createContext, useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

interface Watchlist {}

interface WatchlistContext {
  watchlist: any[];
  addToList(x: any): any;
  removeFromList(x: any): any;
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
  const [watchlist, setWatchlist] = useLocalStorage<string[]>("list", []);
  const addToList = (item: any) => {
    setWatchlist([...watchlist, item]);
  };
  const removeFromList = (id: any) => {
    setWatchlist(watchlist.filter((item) => item !== id));
  };

  const value = { watchlist, addToList, removeFromList };
  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
