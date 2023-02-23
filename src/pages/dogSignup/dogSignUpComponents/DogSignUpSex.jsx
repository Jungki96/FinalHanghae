import React from "react";
import styled from "styled-components";

function DogSignUpSex() {
  return (
    <div>
      <StDiv3>
        <StP3> 강아지의</StP3>
        <br />
        <StP2>강아지 성별은 어떻게 될까요?</StP2>
      </StDiv3>
    </div>
  );
}

export default DogSignUpSex;

const StDiv3 = styled.div`
  margin-bottom: 15%;
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
