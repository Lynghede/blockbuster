import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {
  Cluster,
  NewBox,
  Switcher,
  NoPaddingMobileNewBox,
} from "../ui/EveryLayout";
import Genres from "../lib/Genres";
import Profileperson from "../public/svg/profileperson.svg";
import { Paragraph } from "./Paragraph";

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Switcher>
        <NewBox padding="0" style={{ width: "10%" }}>
          <Link href="/" passHref>
            <a>
              <NavLogo>
                <svg
                  id="blockbuster-logo"
                  width="151px"
                  height="28px"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 934.2 172.1"
                  xmlSpace="preserve"
                >
                  <path
                    fill="var(--color-light-green)"
                    d="M916.1,15.8v-4.7h2.3v4.7H916.1z M911.4,26.6h4.7v-6.9h2.3v6.9h4.9v-5.7c0-1.6-1-2.6-2.8-3.1 c1.7-0.9,2.4-1.9,2.4-3.8v-3.1c0-2.1-1.4-3.3-3.5-3.3h-8V26.6z M916.8,30.7c-8.2,0-13.4-5.4-13.4-13.5c0-8.3,5.4-13.9,13.4-13.9 c8.3,0,13.7,5.6,13.7,13.9C930.5,25.4,925.1,30.7,916.8,30.7z M916.8,34c10.2,0,17.4-6.8,17.4-16.8c0-10.2-7.1-17.2-17.4-17.2 c-10.1,0-17,6.9-17,17.2C899.8,27.3,906.7,34,916.8,34z M855.7,89.5V58.9h15.3v30.6H855.7z M827.3,172.1h28.1l0.2-57.7h15.3v57.7 h29.2v-49.3c0-10.4-6.1-17.4-16.8-21.5c10.4-6.1,15.5-12,15.5-25.2V55.8c0-13.9-8.7-22.6-22.6-22.6h-48.6L827.3,172.1z M755.6,172.1 h56.1v-25.7h-27.3v-32h21.7v-25h-22.2V58.9h27.8V33.2h-56.3L755.6,172.1z M696.2,172.1H725V58.9h17.7V33.2h-64.3v25.7h17.7V172.1z M622.4,172.1h24.8c13.9,0,22.6-8.7,22.6-22.6v-35.8c0-13.5-6.9-21.2-20.5-22.4l-21.7-1.9V58.9h14.2v18.2h27.8V55.8 c0-13.9-8.7-22.6-22.6-22.6h-24.8c-13.9,0-22.6,8.7-22.6,22.6v36.8c0,13.5,6.9,21,20.5,22.2l21.7,1.9v29.7h-14.2v-17.4h-27.8v20.5 C599.8,163.5,608.5,172.1,622.4,172.1z M532.6,172.1h27.8c13.9,0,22.6-8.7,22.6-22.6l-0.2-116.4h-29v113.3h-15.3V33.2H510v116.4 C510,163.5,518.7,172.1,532.6,172.1z M449.5,89.5V58.9h15.3v30.6H449.5z M421.8,172.1h49.7c13.9,0,22.6-8.7,22.6-22.6v-26.8 c0-10.4-6.1-17.4-16.8-21.5c10.4-6.1,15.5-12,15.5-25.2V55.8c0-13.9-8.7-22.6-22.6-22.6h-48.3V172.1z M449.5,146.4v-32h15.3v32 H449.5z M265.8,172.1h25.7c13.9,0,22.6-8.7,22.6-22.6v-35.1h-27.8v32H272V58.9h14.2v26.8h27.8V55.8c0-13.9-8.7-22.6-22.6-22.6h-25.7 c-13.9,0-22.6,8.7-22.6,22.6v93.8C243.2,163.5,251.9,172.1,265.8,172.1z M182.4,146.4V58.9h15.3v87.5H182.4z M176,172.1h28 c13.9,0,22.8-8.7,22.8-22.6V55.8c0-13.9-8.7-22.6-22.6-22.6H176c-13.9,0-22.6,8.7-22.6,22.6v93.8C153.4,163.5,162.1,172.1,176,172.1 z M88.9,172.1h55.2v-25.7h-26.6V33.2H88.9V172.1z M27.8,89.5V58.9h15.3v30.6H27.8z M0,172.1h49.7c13.9,0,22.6-8.7,22.6-22.6v-26.8 c0-10.4-6.1-17.4-16.8-21.5c10.4-6.1,15.5-12,15.5-25.2V55.8c0-13.9-8.7-22.6-22.6-22.6H0V172.1z M27.8,146.4v-32h15.3v32H27.8z M330.2,172.1h28.1v-62l21.4,62h30.9l-27.3-73.8l25.5-65.1h-28.8l-21.7,58.4V33.2h-28.1V172.1z"
                  ></path>
                </svg>
              </NavLogo>
            </a>
          </Link>
        </NewBox>
        <Cluster>
          {Genres.map((genre) => (
            <NewBox key={genre} padding="0">
              <Link href={`/genre/${genre.toLowerCase()}`} passHref>
                <a>
                  <NavItem>{genre}</NavItem>
                </a>
              </Link>
            </NewBox>
          ))}
        </Cluster>
        <NewBox padding="0" style={{ marginTop: "2px" }}>
          <Link href="/profile">
            <a>
              <NavItem>
                <Image
                  alt="profile"
                  src={Profileperson}
                  layout="fixed"
                  height={25}
                  width={25}
                />
                Watchlist
              </NavItem>
            </a>
          </Link>
          <div>
            <Paragraph color="var(--color-light-green)">
              © 2022, Morten Lynghede, København, Danmark
              <br />
              Blockbuster Assignment
            </Paragraph>
          </div>
        </NewBox>
      </Switcher>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled(NoPaddingMobileNewBox)`
  display: flex;
  justify-content: space-between;
  margin-top: var(--s1);
`;

export const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: thin;
  color: var(--color-light-green);
  border: 1px solid var(--color-light-green);
  border-radius: 1rem;
  padding: 0.2rem 1rem;

  transition: transform 0.2s;
  :hover {
    transform: scale(1.1);
    color: var(--color-light-purple);
    background: var(--color-light-green);
  }
`;

const NavLogo = styled.div`
  transition: transform 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;
