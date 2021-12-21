import React from "react";
import styled from "styled-components";
import Button from "../component/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Footer = (props) => {
  // const { excelData, filesInfo } = useSelector((state) => ({
  //   excelData: state.nameTag.excelData,
  //   filesInfo: state.nameTag.filesInfo,
  // }));

  const dispatch = useDispatch();

  const testPrint = () => {
    console.log("testPrint");
  };

  return (
    <Container>
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
