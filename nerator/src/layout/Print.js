import React from "react";
import styled from "styled-components";
const Print = (props) => {
  return <Container id={props.id}>{props.children}</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 30%;
  background-color: pink;
  position: absolute;
  top: 0;
  bottom: 0;
`;

export default Print;
