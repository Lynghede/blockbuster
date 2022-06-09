import styled from "styled-components";

export const Paragraph = styled.p<{
  size?: string;
  height?: string;
  space?: string;
  color?: string;
}>`
  letter-spacing: ${(p) => (p.space ? p.space : "0.1ch")};
  line-height: ${(p) => (p.height ? p.height : "")};
  font-size: ${(p) => (p.size ? p.size : "")};
  color: ${(p) => (p.color ? p.color : "var(--color-green)")};
`;
