import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <StContainer>
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
