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
    // setVisibleImg(true);
    const content = document.getElementById("printArea");
    const iframe = document.getElementById("ifm").contentWindow;
    console.log(content);
    iframe.document.open();
    iframe.document.write(content.innerHTML);
    iframe.document.close();
    iframe.focus();
    iframe.print();
    console.log("testPrint");
    console.log(locData);
    console.log(filesInfo);

    const excel = filesInfo.findIndex((e) => e.id === "list");
    console.log(filesInfo[excel]["data"]);

    // window.print();
  };

  return (
    <Container>
      {visibleImg && <Print id="printArea">test</Print>}
      <Print id="printArea">test ok </Print>
      <iframe id="ifm" style={{ height: "0px", width: "0px" }}></iframe>

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
