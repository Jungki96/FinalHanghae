import React from "react";
import CardList from "./components/CardList";
import Footer from "../../shared/Footer";
import Logo from "../../assets/img/logo.png";
import styled from "styled-components";

const Home = () => {
  return (
    <div>
      <Container>
        <StLogo src={Logo} />
        <CardList />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

const Container = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StLogo = styled.img`
  width: 30vw;
  height: 10vh;
`;
