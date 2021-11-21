import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";

const PopUp = (props) => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
    props.close(false);
  };
  const handleOpenModal = () => {
    props.ok();
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open ]);

  return (
    <Container open={open}>
      <Modal width={props.width} height={props.height}>
        <Header display={props.title}>
          {props.title} <HR />
        </Header>
        <Contents>{props.contents}</Contents>
        <Footer>
          <Button
            width={"5rem"}
            text={"OK"}
            onClick={(e) => handleOpenModal(e)}
          />
          <Button
            width={"5rem"}
            text={"닫기"}
            backgroundColor={"rgba(215,39,100,1)"}
            onClick={(e) => handleCloseModal(e)}
          />
        </Footer>
      </Modal>
    </Container>
  );
};

PopUp.defaultProps = {
  open: false,
  width: "80%",
  height: "18rem",
  contents: "test",
  title: "",
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(21, 20, 20, 0.38);
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  display: ${(props) => (props.open ? `inherit` : `none`)};
  transition: 3s all;
`;

const Modal = styled.div`
  padding: 18px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  z-index: 1;
  background-color: white;
  margin: auto;
  box-shadow: 6px 0px 9px 3px rgb(173 169 169 / 38%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const HR = styled.hr`
  width: 60%;
  border: 1px solid #f4f4f4;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bolder;
  font-size: 1.2em;
  padding-top: 3px;
  padding-bottom: 3px;
  display: ${(props) => (props["display"].length > 0 ? "block" : "none")};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  padding-bottom: 8px;
`;

export default PopUp;
