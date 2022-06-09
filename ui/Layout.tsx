import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Center } from "./EveryLayout";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1280px;
  padding: var(--s0);
`;

const Content = styled.div`
  flex: 1;
`;
