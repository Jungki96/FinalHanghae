import React from "react";
import styled from "styled-components";
import { useState } from "react";

function DogSignUpName() {
  return (
    <div>
      <StDiv2>
        <StP3> 반가워요!</StP3>
        <br />
        <StP2>강아지 이름은 어떻게 되나요?</StP2>
      </StDiv2>
    </div>
  );
}

export default DogSignUpName;

const StDiv2 = styled.div`
  margin-bottom: 10%;
`;
const StP3 = styled.div`
  font-size: 20px;
`;
const StP2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
