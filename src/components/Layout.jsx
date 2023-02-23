import React from "react";
import styled from "styled-components";

function Layout({ children }) {
  return <StLayout>{children}</StLayout>;
}
export default Layout;

const StLayout = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: white;
  border: 3px solid #000000;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 45%;
`;
