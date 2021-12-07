import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Contents from "./Contents";
import NeratorContainer from "../containers/NeratorContainer";
const Layout = (props) => {
  return (
    <Container>
      <Header />
      <NeratorContainer />
      {/* <Contents /> */}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export default Layout;
