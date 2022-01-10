import React, { useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Print from "./Print";
const Footer = (props) => {
  const [displayArea, setDisplayArea] = useState(false);

  const testPrint = () => {
    setDisplayArea(true);
    //const content = document.getElementById("printArea");
    //const iframe = document.getElementById("ifm").contentWindow;
    //console.log(content);
    //iframe.document.open();
    //iframe.document.write(content.innerHTML);
    //iframe.document.close();
    //iframe.focus();
    //iframe.print();
    //console.log("iframe active");
    // window.print();
  };

  return (
    <Container>
      <Print open={displayArea} id="printArea">
        test
      </Print>

      <Print id="printArea">test ok </Print>
      <iframe id="ifm" style={{ height: "0px", width: "0px" }}></iframe>

      <ButtonContainer>
        <Button
          text="TEST PRINT"
          onClick={(e) => testPrint(e)}
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
