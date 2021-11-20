import React from "react";
import styled from "styled-components";
import Button from "../component/Button";
const Footer = (props) => {
  return (
    <Container>
      <ButtonContainer>
        <Button text="TEST PRINT" background="#32BA3F" fontColor="black" />
        <Button text="PRINT" backgroundColor="#32BA3F" fontColor="black" />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffee53;
  flex-shrink: 0;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: right;
  align-content: center;
  position: fixed;
  bottom: 0px;
`;

const ButtonContainer = styled.span`
  display: flex;
  padding: 1.5rem;
`;

export default Footer;
