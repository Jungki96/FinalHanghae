import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GiveDogList from "./components/GiveDogList";
import Layout from "../../../components/LoveLayout";

const GiveLove = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <StSelects>
        <OneSelect>내가 보낸</OneSelect>
        <div
          onClick={() => {
            navigate("/getLove");
          }}
        >
          내가 받은
        </div>
      </StSelects>
      <GiveDogList />
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
