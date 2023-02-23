import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../../shared/MainHeader";
import GetDogList from "./components/GetDogList";

const GiveLove = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <br />
      <StSelects>
        <div
          onClick={() => {
            navigate("/giveLove");
          }}
        >
          내가 보낸
        </div>
        <OneSelect>내가 받은</OneSelect>
      </StSelects>
      <br />
      <GetDogList />
    </>
  );
};

export default GiveLove;

const StSelects = styled.div`
  display: flex;
  justify-content: space-around;
`;

const OneSelect = styled.div`
  text-decoration: underline;
  text-underline-offset: 10px;
`;
