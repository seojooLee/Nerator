import React from "react";
import styled from "styled-components";

const Header = (props) => {
  return (
    <Container>
      <Logo>Nerator</Logo>
    </Container>
  );
};

const Container = styled.div`
  flex-shrink: 0;

  width: 100%;
  height: 56px;
  background-color: #ffee53;
  align-items: center;
  display: flex;
  position: sticky;
  top: 0px;
`;
const Logo = styled.span`
  padding: 1rem;
  font-size: 1.4rem;
  text-transform: capitalize;
  color: #288ec8;
  font-weight: bolder;
  -webkit-text-stroke: 1px black;
  user-select: none;
`;

export default Header;
