import { Stack, NewBox } from "../ui/EveryLayout";
import styled from "styled-components";
import capitalizeFirstLetter from "../lib/CapitalizeFirstLetter";
import { Paragraph } from "./Paragraph";

interface CardProps {
  header: string;
  text: string;
  fontSize?: string;
  children: any;
}

const ActorCard: React.FC<CardProps> = ({
  header,
  text,
  fontSize,
  children,
}) => {
  return (
    <NewBox padding="0">
      {children}
      <NewBox padding="0" style={{ marginTop: "var(--s0)" }}>
        <Stack
          textAlign="center"
          backgroundColor="var(--color-purple)"
          space="var(--s-5)"
        >
          <HeaderCard fontSize={fontSize}>{header}</HeaderCard>
          <Paragraph height="1.6" space="0.0ch" size="1.2em">
            {capitalizeFirstLetter(text)}
          </Paragraph>
        </Stack>
      </NewBox>
    </NewBox>
  );
};

export default ActorCard;

interface Props {
  color?: string;
  align?: string;
  spanColor?: string;
  fontSize?: string;
  fontSizeMobile?: string;
}

const HeaderCard = styled.h3<Props>`
  text-transform: uppercase;
  letter-spacing: 0.1ch;
  text-align: ${(p) => (p.align ? p.align : "")};
  font-weight: 900;
  font-size: ${(p) => (p.fontSize ? p.fontSize : "1.3rem")};
  line-height: 1.5;
  margin: 0;
  padding: 0;

  color: ${(props) => (props.color ? props.color : "var(--color-light-green)")};

  @media screen and (max-width: 800px) {
    font-size: ${(props) =>
      props.fontSizeMobile ? props.fontSizeMobile : "var(--s1)"};
    overflow-wrap: anywhere;
  }
`;
