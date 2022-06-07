import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;
