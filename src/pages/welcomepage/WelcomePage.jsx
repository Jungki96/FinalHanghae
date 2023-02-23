import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <StContainer>
      <button onClick={() => navigate("/login")}>로그인 창으로</button>
    </StContainer>
  );
}

export default WelcomePage;

const StContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("welecome.png");
  /* background-position: center; */
  background-size: cover;
  p {
    font-size: 116px;
    font-weight: 800;
    color: white;
    margin: 0 0 20px 0;
    @media screen and (max-width: 985px) {
      font-size: 70px;
    }
    @media screen and (max-width: 595px) {
      font-size: 50px;
    }
  }
  button {
    font-size: 19px;
    font-weight: 700;
    border: none;
    width: 260px;
    height: 44px;
    margin-top: 30vh;
    border-radius: 30px;
    background: linear-gradient(to right, #eeeeee, #656463);
    opacity: 0.8;
    color: white;
    cursor: pointer;
  }
`;

/* function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <StImg src={Welecome} />
        <button onClick={() => navigate("/login")}>로그인 창으로</button>
      </div>
    </Layout>
  );
}

export default WelcomePage;

const StImg = styled.img`
  width: 100%;
  height: 100%;
`;
 */
