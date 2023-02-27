import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import welecome from "../../assets/img/welecome.jpg";
import whitetogather from "../../assets/img/whitetogather.png";
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <StContainer>
        <StP1>
          우리 강아지의 <span>산책 매칭</span>
        </StP1>
        <StImg src={whitetogather} />
        <StH1>
          인근의 <span>강아지 친구와 매칭</span>되어
          <br /> <br />
          <span>산책도, 교류도</span> 해요!
        </StH1>
        <StBtn onClick={() => navigate("/login")}>시작하기</StBtn>
      </StContainer>
    </Layout>
  );
}
export default WelcomePage;

const StContainer = styled.div`
  width: 100%;
  max-width: 375px;
  background-color: transparent;
  border: 1px solid #ecf3ff;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  background-image: url(${welecome});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StP1 = styled.p`
  width: 100%;
  max-width: 375px;
  height: 23px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;

  span {
    font-size: 16px;
    font-weight: 600;
  }

  @media (min-height: 813px) {
    margin-top: 20%;
  }

  @media (max-height: 812px) {
    margin-top: 7%;
  }

  &::first-child {
    font-weight: 100;
  }
`;
const StImg = styled.img`
  width: 196.65px;
  height: 107.16px;
  @media (min-height: 900px) {
    margin-bottom: 110%;
  }

  @media (max-height: 812px) {
    margin-bottom: 85%;
  }
`;

const StH1 = styled.h1`
  width: 100%;
  max-width: 375px;
  height: 23px;
  font-size: 24px;
  color: #ffffff;
  font-weight: 400;
  text-align: center;

  @media (min-height: 813px) {
    margin-bottom: 63%;
  }

  @media (max-height: 812px) {
    margin-bottom: 53%;
  }
  span {
    font-size: 24px;
    font-weight: 600;
  }
`;
const StBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;

  width: 260px;
  height: 46px;
  left: 56px;
  top: 700px;

  background: #2f58ac;
  border-radius: 60px;
  color: #ffffff;
`;
