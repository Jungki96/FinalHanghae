import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../../components/LoveLayout";
import GetDogList from "./components/GetDogList";

const GiveLove = () => {
  const navigate = useNavigate();

  return (
    <Layout title="좋아요 리스트">
      <StSelects>
        <StOther
          onClick={() => {
            navigate("/giveLove");
          }}
        >
          내가 보낸
        </StOther>
        <OneSelect>내가 받은</OneSelect>
      </StSelects>
      <GetDogList />
    </Layout>
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

const StOther = styled.div`
  text-decoration: transparent;
  text-underline-offset: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 10px;
    transition: 0.5s;
  }
`;
