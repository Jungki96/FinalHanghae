import React from "react";
import styled from "styled-components";

function DogModalDetail() {
  const handleBack = () => {};

  return (
    <div>
      <St1>"뒤로가기"를 누르셨군요!</St1>
      <br></br>
      <St2>강아지 등록을 안하시면</St2>
      <St2>투개더 이용이 어렵답니다.😂 </St2>
      <br></br>
      <Separator>
        <div></div>
      </Separator>
      <St3>
        <St4>네,알겠습니다</St4>
      </St3>
    </div>
  );
}

export default DogModalDetail;

const St1 = styled.div`
  font-size: 16px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const St2 = styled.div`
  margin: 5px 0px 5px 0px;
  font-size: 12px;
  font-weight: 400;
`;

const Separator = styled.div`
  width: 100%;
  margin: 1px 0px 13px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(100, 99, 99);
  }
`;

const St3 = styled.div`
  color: #2f58ac;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const St4 = styled.div`
  color: #2f58ac;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
