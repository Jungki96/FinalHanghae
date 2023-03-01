import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import welecome from "../../assets/img/welecome.jpg";
import StartLayout from "../../components/StartLayout";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <StartLayout>
      <StContainer>
        <Space />
        <SignUpBtn onClick={() => navigate("/dogsignup")}>첫 반려견 추가</SignUpBtn>
        <SignUpBtn
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          산책 메이트 만들기
        </SignUpBtn>
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

const SignUpBtn = styled.button`
  border: none;
  border-radius: 50px;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-size: 15px;
  margin-top: 25%;
  margin-left: 5%;
  width: 90%;
  height: 45px;
  opacity: gray;
`;

const Space = styled.div`
  height: 400px;
`;
