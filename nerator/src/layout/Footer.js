import React, { useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Print from "./Print";
const Footer = (props) => {
  const [visibleImg, setVisibleImg] = useState(false);
  const { locData, filesInfo } = useSelector((state) => ({
    locData: state.location.locData,
    filesInfo: state.nameTag,
  }));

  const testPrint = () => {
    console.log("testPrint");
    console.log(locData);
    console.log(filesInfo);
    setVisibleImg(true);
    window.print();
  };

  return (
    <Container>
      {visibleImg && <Print />}

      <ButtonContainer>
        <Button
          text="TEST PRINT"
          onClick={() => window.print()}
          background="#32BA3F"
          fontColor="black"
          onClick={testPrint}
        />
        <Button
          text="PRINT"
          onClick={() => window.print()}
          backgroundColor="#32BA3F"
          fontColor="black"
        />
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
