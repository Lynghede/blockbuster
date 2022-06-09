import styled from "styled-components";

interface ButtonProps {
  active?: boolean;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  font-size: 1em;
  font-weight: thin;
  border: 1px solid var(--color-light-green);
  padding: 0.2rem 1rem;
  color: ${(p) =>
    p.active ? "var(--color-light-purple)" : "var(--color-light-green)"};
  background-color: ${(p) =>
    p.active ? "var(--color-light-green)" : "var(--color-purple)"};

  transition: 0.5s;
  :hover {
    color: var(--color-light-green);
    background: var(--color-light-purple);
  }
`;

export default Button;
