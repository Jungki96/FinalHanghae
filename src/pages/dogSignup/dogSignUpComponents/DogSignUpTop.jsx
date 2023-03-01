import React from "react";
import styled from "styled-components";

function DogSignUpTop() {
  return (
    <StDiv>
      <StP1>간편하게 가입하고</StP1>
      <StP2>투개더를 이용해보세요.</StP2>
    </StDiv>
  );
}

export default DogSignUpTop;

const StDiv = styled.div`
  margin-top: 92px;
  width: 250px;
  height: 58px;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`;
const StP1 = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StP2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
