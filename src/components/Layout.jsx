import React from "react";
import styled from "styled-components";
import background from "../assets/img/background.png";

function Layout({ children }) {
  return (
    <StBackground>
      <StLayout>{children}</StLayout>
    </StBackground>
  );
}

export default Layout;

const StBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media screen and (max-width: 450px) {
    background: none;
  }
`;

const StLayout = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  background-color: transparent;
  border: 1px solid #ecf3ff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
/* 위 코드에서는 @media 미디어 쿼리를 사용해서 뷰포트 가로 길이가 450px 이하일 때, 배경 이미지를 none 처리하도록 스타일을 변경합니다. */
