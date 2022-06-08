import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
/** COMPONENTS */
import { NewBox, Stack } from "../ui/EveryLayout";
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
  // const [selected, setSelected] = useState()
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
        <NewBox>
          <Link href={`/genre/${genre.toLowerCase()}`} passHref>
            <a>
              <h1>{capitalizeFirstLetter(genre)}</h1>
              <h2>({count})</h2>
            </a>
          </Link>
          <div>
            <Button onClick={(e) => setType("movie")}>Movies</Button>
            <Button onClick={(e) => setType("series")}>Series</Button>
          </div>
          {!id && (
            <Link href={`/genre/${genre}`} passHref>
              <a>
                <button>See all</button>
              </a>
            </Link>
          )}
          {children}
        </NewBox>
      )}
    </>
  );
};

export default GenreInfo;

const Button = styled.button`
  font-size: 1em;
  font-weight: bold;
  color: var(--color-light-green);
  border: 1px solid var(--color-light-green);
  padding: 0.2rem 1rem;
  background-color: var(--color-purple)

  transition: transform 0.2s;
  :hover {
    transform: scale(1.2);
    color: var(--color-light-purple);
    background: var(--color-light-green);
  }
`;
