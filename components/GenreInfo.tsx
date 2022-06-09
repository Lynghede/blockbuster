import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
/** COMPONENTS */
import { NewBox, NoPaddingMobileNewBox } from "../ui/EveryLayout";
import { NavItem } from "../components/Header";
import Button from "./Button";
/** UTIL */
import capitalizeFirstLetter from "../lib/CapitalizeFirstLetter";
/** SWR */
import fetcher from "../lib/Fetcher";
import useSWR from "swr";

interface Props {
  genre: string;
  type: string;
  setType(x: string): any;
  children: any;
}

const GenreInfo: React.FC<Props> = ({ genre, type, setType, children }) => {
  const [, setSelected] = useState(type);

  function handleButtonClick(e: any) {
    e.preventDefault();
    setType(e.target.value);
    setSelected(e.target.value);
  }

  function isActive(active: string) {
    return active === type;
  }

  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<any>(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=0-10000&byTags=genre:${genre}&byProgramType=${type}&fields=id`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading..</div>;

  const count = data.entryCount;

  return (
    <>
      {count === 0 ? (
        <></>
      ) : (
        <NoPaddingMobileNewBox>
          <Link href={`/genre/${genre.toLowerCase()}`} passHref>
            <a>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h1>
                    {capitalizeFirstLetter(genre)} ({count})
                  </h1>
                </div>
                <NewBox padding="0" style={{ alignSelf: "center" }}>
                  {!id && <NavItem>See all</NavItem>}
                </NewBox>
              </div>
            </a>
          </Link>
          <div style={{ marginBottom: "var(--s0)" }}>
            <Button
              active={isActive("movie")}
              value="movie"
              onClick={handleButtonClick}
            >
              Movies
            </Button>
            <Button
              active={isActive("series")}
              value="series"
              onClick={handleButtonClick}
            >
              Series
            </Button>
          </div>
          {children}
        </NoPaddingMobileNewBox>
      )}
    </>
  );
};

export default GenreInfo;
