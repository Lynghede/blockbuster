import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Stack, NewBox, ELEVATIONS } from "../ui/EveryLayout";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Props {
  data: any;
}

const Card: React.FC<Props> = (props) => {
  const { data } = props;
  console.log("inside card", data);
  const title = data.title;
  const description =
    data.description === ""
      ? data.plprogram$descriptionLocalized.da
      : data.description;
  const thumb =
    data.plprogram$thumbnails["orig-396x272"]?.plprogram$url ||
    "/images/molle.jpeg";
  console.log("thisi s thumb: ", thumb);
  const releaseYear = data.plprogram$year;
  const type = data.plprogram$programType;
  const genres = data.plprogram$tags
    .filter((item: any) => item.plprogram$scheme === "genre")
    .map((item: any) => item.plprogram$title);

  console.log("genre length: ", genres.length);
  return (
    <Container className="container" padding="0">
      <Stack space="var(--s-4)" backgroundColor="var(--color-purple)">
        <Link href="/" passHref>
          <NewBox padding="0" as="a" style={{ position: "relative" }}>
            <Image
              src={thumb}
              alt="molle"
              layout="responsive"
              objectFit="cover"
              width={67}
              height={100}
            />
            <Overlay>
              <OverlayInfo>
                <span style={{ height: "100%" }}>
                  <OverlayDescription>{description}</OverlayDescription>
                </span>
                <OverlayAction>
                  <button>Add</button>
                  <button>remove</button>
                </OverlayAction>
              </OverlayInfo>
            </Overlay>
          </NewBox>
        </Link>
        <NewBox padding="var(--s0)">
          <H4>{title}</H4>
          <Paragraph>
            {releaseYear}, {capitalizeFirstLetter(type)} -{" "}
            {genres.length === 1
              ? genres
              : genres.map((genre: any) => genre + ", ")}
          </Paragraph>
        </NewBox>
      </Stack>
    </Container>
  );
};

export default Card;

const Overlay = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s linear;
`;

const OverlayInfo = styled.div`
  background: rgba(16, 20, 38, 0.8);
  z-index: 2;

  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-color 0.2s;
`;

const OverlayDescription = styled.div`
  /* transition: outline-offset 0.15s; */
  bottom: 0;
  color: #cfdce7;
  font-size: 0.85rem;
  padding: 0 1rem;
  position: absolute;
  margin: 1rem 0;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
`;

const OverlayAction = styled.div`
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.75), transparent);
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.75rem 0;
  border-radius: 5px 5px 0 0;
`;

const H4 = styled.h4`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  word-wrap: break-all;
  overflow: hidden;
  margin: 0;
  color: var(--color-light-green);
`;

const Paragraph = styled.p`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  font-size: 0.85rem;
`;

const Container = styled(NewBox)`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  background: var(--color-green);
  overflow: hidden;
  position: relative;
  box-shadow: ${ELEVATIONS.medium};
  --shadow-color: 0deg 0% 30%;

  &:hover ${Overlay} {
    opacity: 1;
    pointer-events: all;
  }
`;
