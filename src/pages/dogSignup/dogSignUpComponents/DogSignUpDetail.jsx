import React from "react";
import styled from "styled-components";

function DogSignUpDetail() {
  return (
    <StDiv3>
      <StP3> 강아지의</StP3>
      <StP2>성격을 20자 이하로 적어주세요.</StP2>
    </StDiv3>
  );
}

export default DogSignUpDetail;

const StDiv3 = styled.div`
  margin-bottom: 24px;
  margin-left: 10px;
`;

const StP3 = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const StP2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;
