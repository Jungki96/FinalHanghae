import React from "react";
import styled from "styled-components";
import background from "../assets/img/background.png";

const StartLayout = (props) => {
  return (
    <Container>
      <ContainerDiv>{props.children}</ContainerDiv>
    </Container>
  );
};

export default StartLayout;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  color: var(--color-main);
  width: 375px;
  height: 860px;
  border: 2px solid black;
  border-radius: 30px;
`;
