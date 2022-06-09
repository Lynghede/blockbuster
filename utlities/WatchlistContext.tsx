import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [watchlist, setWatchlistDirect] = useState<any[]>([]);

  /** Wrapper for setWatlist, to also set localstorage */
  const setWatchlist = useCallback(
    (value: any) => {
      localStorage.setItem("list", JSON.stringify(value));
      setWatchlistDirect(value);
    },
    [setWatchlistDirect]
  );

  /** Wrapper for getting localstorage */
  useEffect(() => {
    const text = localStorage.getItem("list");
    if (!text) return;
    try {
      const list = JSON.parse(text);
      console.log("list: ", list);
      if (Array.isArray(list)) setWatchlist(list);
    } catch (error) {
      console.error(error);
    }
  }, [setWatchlist]);

  const addToList = (item: any) => {
    setWatchlist([...watchlist, item]);
  };
  const removeFromList = (movie: any) => {
    setWatchlist(watchlist.filter((item) => item.id !== movie.id));
  };

  const value = { watchlist, addToList, removeFromList };
  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
