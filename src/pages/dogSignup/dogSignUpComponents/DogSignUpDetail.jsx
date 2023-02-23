import React from "react";
import styled from "styled-components";

function DogSignUpDetail() {
  return (
    <div>
      <StDiv3>
        <StP3> 강아지의</StP3>
        <br />
        <StP2>성격을 20자 이하로 적어주세요.</StP2>
      </StDiv3>
    </div>
  );
}

export default DogSignUpDetail;

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
