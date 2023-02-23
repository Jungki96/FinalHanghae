import React from "react";
import styled from "styled-components";

function DogSignUpImage() {
  return (
    <div>
      <StDiv3>
        <StP3> 강아지의</StP3>
        <br />
        <StP2>사진을 2장까지 추가 할 수있습니다.</StP2>
      </StDiv3>
    </div>
  );
}

export default DogSignUpImage;

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
