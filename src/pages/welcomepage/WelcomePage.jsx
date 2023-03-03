import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import StartLayout from "../../components/StartLayout";
import welecome from "../../assets/img/welecome.jpg";
import whitetogather from "../../assets/img/whitetogather.png";
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <StartLayout>
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
        <Fade>
          <StBtn onClick={() => navigate("/login")}>시작하기</StBtn>
        </Fade>
      </StContainer>
    </StartLayout>
  );
}
export default WelcomePage;

const StContainer = styled.div`
  position: fixed;
  width: 375px;
  background-color: transparent;
  border: 1px solid #ecf3ff;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 812px;
  background-image: url(${welecome});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 30px;
`;
const StP1 = styled.p`
  width: 200px;
  height: 23px;
  max-width: 375px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin-top: 58px;
  span {
    font-size: 16px;
    font-weight: 600;
  }

  &::first-child {
    font-weight: 100;
  }
`;
const StImg = styled.img`
  width: 196.65px;
  height: 107.16px;

  margin-bottom: 308px;
`;

const StH1 = styled.h1`
  width: 100%;
  max-width: 375px;
  height: 23px;
  font-size: 24px;
  color: #ffffff;
  font-weight: 400;
  text-align: center;
  margin-bottom: 185px;
`;
const StBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;
  width: 267px;
  height: 46px;
  background: #2f58ac;
  color: #ffffff;
  border-radius: 60px;
  border-color: black;
`;

//fade in
const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    /* transform: scale(1); */
    opacity: 1;
  }

  to {
    /* transform: scale(.25); */
    opacity: 0;
  }
`;
const Fade = styled.div`
  ${(props) => (props.out ? `display: inline-block;` : `display: inline-block;`)}
  animation: ${(props) => (props.out ? fadeOut : fadeIn)} 3s linear;
`;
