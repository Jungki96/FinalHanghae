import React from "react";
import styled from "styled-components";

function DogSignUpSex() {
  return (
    <div>
      <StDiv2>
        <StP3>강아지의</StP3>
        <StP2>성별은 어떻게 될까요?</StP2>
      </StDiv2>
    </div>
  );
}

export default DogSignUpSex;

const StDiv2 = styled.div`
  margin-bottom: 36px;
  margin-left: 22px;
  width: 247px;
  height: 52px;
`;
const StP3 = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const StP2 = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
