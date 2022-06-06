import styled from "styled-components";
import { Stack } from "../../ui/EveryLayout";

const Watchlist: React.FC = () => {
  return (
    <>
      <div>WATCHLIST</div>
      <Stack>
        <Wrapper>HEJSA</Wrapper>
        <Wrapper>HEJSA</Wrapper>
        <Wrapper>HEJSA</Wrapper>
        <Wrapper>HEJSA</Wrapper>
      </Stack>
    </>
  );
};

export default Watchlist;

const Wrapper = styled.div`
  display: flex;
  background-color: purple;
`;
