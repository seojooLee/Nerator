import React from "react";
import styled from "styled-components";

const Button = (props) => {
  return (
    <Container
      backgroundColor={props.backgroundColor}
      outlined={props.outlined}
      borderColor={props.borderColor}
      fontColor={props.fontColor}
      width={props.width}
      onClick={props.onClick}
      id={props.id}
      align={props.align}
    >
      <Text>{props.text}</Text>
    </Container>
  );
};

Button.defaultProps = {
  text: "default ",
  borderColor: "",
  outlined: false,
  backgroundColor: "rgba(52,168,234,1)",
  fontColor: "white",
  width: "8rem",
  align: "right",
};

const Container = styled.div`
  height: 50px;
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.fontColor};
  outline: ${(props) => (props ? `white 1px solid` : false)};
  background: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props["borderColor"].length > 0
      ? `1px solid ${props.borderColor}`
      : "none"};
  word-break: break-all;
  box-shadow: 2px 2px 2px #c3c3c366;
  user-select: none;
  border-radius: 75px 75px 75px 75px / 67px 67px 67px 67px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    background-color: #ffee53;
    filter: brightness(100%);
  }
`;

const Text = styled.span``;

export default Button;
