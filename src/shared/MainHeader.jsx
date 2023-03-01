import React from "react";
import styled from "styled-components";
import ArrowIcon from "../assets/img/ArrowIcon.png";
import { useNavigate } from "react-router";

function Header({ title }) {
  const navigate = useNavigate();

  const handleHistory = () => {
    navigate(-1);
  };

  return (
    <StHeader>
      <StImg src={ArrowIcon} onClick={handleHistory} />
      <StDiv style={{ fontSize: "20px", fontWeight: "bold" }}>{title}</StDiv>
      <StEmpty />
    </StHeader>
  );
}

export default Header;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 371px;
  height: 60px;
  margin-left: 20px;
  margin-top: 24px;
`;
const StImg = styled.img`
  width: 24px;
  height: 24px;
`;
const StEmpty = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;

const StDiv = styled.div``;
