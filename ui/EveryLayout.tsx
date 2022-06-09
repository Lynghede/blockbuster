import styled from "styled-components";

interface Props {
  backgroundColor?: string;
  space?: string;
  padding?: string;
  border?: string;
  textAlign?: string;
  gap?: string;
  justify?: string;
  align?: string;
  splitAfter?: string;
  threshold?: string;
}

export const ELEVATIONS = {
  small: `
    0.5px 1px 1px hsl(var(--shadow-color) / 0.7)
  `,
  medium: `
    1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333)
  `,
  large: `
    1px 2px 2px hsl(var(--shadow-color) / 0.2),
    2px 4px 4px hsl(var(--shadow-color) / 0.2),
    4px 8px 8px hsl(var(--shadow-color) / 0.2),
    8px 16px 16px hsl(var(--shadow-color) / 0.2),
    16px 32px 32px hsl(var(--shadow-color) / 0.2)
  `,
};

export const Stack = styled.div.attrs<Props, Props & { className: string }>({
  className: "Stack",
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: ${(props) => (props.space ? props.space : "1.5rem")};
  }

  ${({ splitAfter }) =>
    splitAfter
      ? `
      height: 100%;
      > :nth-child(${splitAfter}) {
    margin-bottom: auto;
  }`
      : ``}
`;

export const NewBox = styled.div.attrs<Props, Props & { className: string }>({
  className: "NewBox",
})`
  display: block;
  padding: ${(props) => (props.padding ? props.padding : "var(--s1)")};
  /* padding: var(--s1); */
  color: inherit;
  border: ${(props) => (props.border ? props.border : "0px")} solid;
`;

export const NoPaddingMobileNewBox = styled(NewBox)`
  @media screen and (max-width: 850px) {
    padding: 0;
  }
`;

interface CenterProps {
  boxType?: boolean;
  disabledMobile?: boolean;
}
export const Center = styled.div.attrs<
  CenterProps,
  CenterProps & { className: string }
>({
  className: "Center",
})`
  box-sizing: ${(props) => (props.boxType ? "" : "content-box")};
  max-width: 60ch;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--s1);
  padding-right: var(--s1);

  @media screen and (max-width: 800px) {
    ${({ disabledMobile }) => disabledMobile && `padding: 0`}
  }
`;

interface SidebarProps {
  reverse?: boolean;
  firstChildFlexBasis?: string;
  gap?: string;
}
export const SidebarWrapper = styled.div.attrs<
  SidebarProps,
  SidebarProps & { className: string }
>({ className: "SidebarWrapper" })`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => (p.gap ? p.gap : "var(--s1)")};
  > :first-child {
    flex-basis: ${(p) =>
      p.firstChildFlexBasis ? p.firstChildFlexBasis : "22rem"};
    flex-grow: 1;
  }

  > :last-child {
    flex-basis: 50ch;
    flex-grow: 999;
    min-width: 50%;
    /* max-width: 30ch; */
  }

  ${({ reverse }) =>
    reverse &&
    `  > :first-child {
    flex-basis: 25rem;
    flex-grow: 1;
  }

  > :last-child {
    flex-basis: 5rem;
    flex-grow: 1;
    min-width: 40%;
  }`}
`;

export const Label = styled.label.attrs({ className: "Label" })`
  color: var(--color-blue-500);
  font-weight: bold;
`;

export const Switcher = styled.div.attrs<Props, Props & { className: string }>({
  className: "Switcher",
})`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => (props.gap ? props.gap : "var(--s1)")};
  --threshold: ${(props) => (props.threshold ? props.threshold : "50rem")};
  /* border: 1px solid red; */
  > * {
    flex-grow: 1;
    flex-basis: calc((var(--threshold) - 100%) * 999);
  }

  > :nth-last-child(n + 6),
  :nth-last-child(n + 6) ~ * {
    flex-basis: 100%;
  }
`;

export const Cover = styled.div.attrs<Props, Props & { className: string }>({
  className: "Cover",
})`
  /* ↓ Establish a columnal flex context */
  display: flex;
  flex-direction: column;
  /* ↓ Set a minimum height to match the viewport height
(any minimum would be fine) */
  min-height: 50vh;
  /* Set a padding value */
  padding: ${(props) => (props.space ? props.space : "var(--s1)")};

  > * {
    /* ↓ Give each child a top and bottom margin */
    margin-top: var(--s1);
    margin-bottom: var(--s1);
  }
  > :first-child:not(h1) {
    /* ↓ Remove the top margin from the first-child
if it _doesn't_ match the centered element */
    margin-top: 0;
  }
  > :last-child:not(h1) {
    /* ↓ Remove the bottom margin from the last-child
if it _doesn't_ match the centered element */
    margin-bottom: 0;
  }
  > h1 {
    margin-bottom: auto;
  }
`;

export const Cluster = styled.div.attrs<Props, Props & { className: string }>({
  className: "Cluster",
})`
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  gap: ${(props) => (props.space ? props.space : "var(--s0)")};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  align-items: ${(props) => (props.align ? props.align : "flex-start")};
  /* border: 1px solid red; */
`;

interface PropsImposter {
  position?: string;
}
export const Imposter = styled.div<PropsImposter>`
  /* margin-right: auto;
  margin-left: auto; */
  @media screen and (min-width: 800px) {
    position: ${(p) => (p.position ? p.position : "absolute")};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: calc(100%);
    max-height: calc(100%);
    width: 100%;
  }
`;

interface FrameProps {
  ratio: number[];
}
export const Frame = styled.div<FrameProps>`
  padding-bottom: calc(${(p) => p.ratio[0]} / ${(p) => p.ratio[1]} * 100%);
  position: relative;

  > * {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > img,
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface GridProps {
  minimum: string | "20ch";
  gap?: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${(p) => (p.gap ? p.gap : "1rem")};
  @supports (width: min(${(p) => p.minimum}, 100%)) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(${(p) => p.minimum}, 100%), 1fr)
    );
  }
`;

interface IconProps {
  margin?: string;
  reverse?: boolean;
}
export const Icon = styled.div<IconProps>`
  align-items: baseline;
  display: inline-flex;

  ${({ reverse, margin = "var(--s1)" }) =>
    reverse
      ? `margin-inline-start: ${margin};`
      : `margin-inline-end: ${margin};`};

  svg,
  img {
    height: 1.5em;
    height: 1cap;
    width: 1.5em;
    width: 1cap;
  }
`;
