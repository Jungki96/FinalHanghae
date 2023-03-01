import React from "react";
import styled from "styled-components";

function DogSignUpImage() {
  return (
    <div>
      <StDiv3>
        <StP2>메인 강아지 사진을 추가해주세요.</StP2>
      </StDiv3>
    </div>
  );
}

export default DogSignUpImage;

const StDiv3 = styled.div`
  margin-bottom: 52px;
`;

const StP2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
