import React from "react";
import CardList from "./components/CardList";
import Footer from "../../shared/Footer";
import Logo from "../../assets/img/logo.png";
import styled from "styled-components";
import StartLayout from "../../components/StartLayout";

const Home = () => {
  return (
    <StartLayout>
      <Container>
        <StLogo src={Logo} />
        <CardList />
        <Footer />
      </Container>
    </StartLayout>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StLogo = styled.img`
  margin-top: 30px;
  width: 162px;
  height: 107px;
`;
