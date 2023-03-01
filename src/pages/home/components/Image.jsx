import React, { useState } from "react";
import styled from "styled-components";
import CardlistPagination from "./CardlistPagination";

const Image = ({ images, data }) => {
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <Container>
      {images.slice(offset, offset + limit).map(({ imageUrl, id }) => (
        <OneDog key={id}>
          <StDog style={{ backgroundImage: `url(${imageUrl})` }}></StDog>
        </OneDog>
      ))}

      <Space>
        <CardlistPagination total={images.length} limit={limit} page={page} setPage={setPage} />
      </Space>
      <StName>
        <StDistance> 약 {data.distance} KM </StDistance>
        <br />
        {data.dogSex === "female" ? (
          <StNameSex> {data.dogName} (여)</StNameSex>
        ) : (
          <StNameSex>{data.dogName} (남)</StNameSex>
        )}
        <br />
        <StDecs>설명 : {data.dogDetails}</StDecs>
      </StName>
    </Container>
  );
};

export default Image;

const Container = styled.div`
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5vh;
  .btnGruop {
    display: flex;
    justify-content: flex-start;
    margin-top: 20vh;
  }
`;
const StDog = styled.div`
  position: relative;
  width: 37vh;
  height: 60vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const OneDog = styled.div`
  justify-content: flex-start;
`;
const Space = styled.div`
  margin-top: -30vh;
  display: flex;
  z-index: 1;
`;

const StName = styled.h3`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 8vh;
  margin-right: 13vh;
  width: 20vh;
  height: 10vh;
  color: beige;
  z-index: 2;
`;

const StDistance = styled.div`
  font-size: small;
  display: flex;
  justify-content: center;
  background-color: green;
  border-radius: 10px 10px 10px 10px;
  width: 20vw;
`;
const StNameSex = styled.div`
  display: flex;
  background-color: red;
  border-radius: 10px 10px 10px 10px;
  font-size: large;
  width: 50vw;
`;
const StDecs = styled.div`
  font-size: small;
  display: flex;
  background-color: blue;
  border-radius: 10px 10px 10px 10px;
  max-width: 50vw;
  max-height: 30vh;
`;
