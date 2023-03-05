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
        <StDog key={id} style={{ backgroundImage: `url(${imageUrl})` }}>
          <CardlistPagination total={images.length} limit={limit} page={page} setPage={setPage} />
        </StDog>
      ))}
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5px;
`;

const StDog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10.5px;
  width: 340px;
  height: 500px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: row;
  margin-top: -100px;
  margin-left: 20px;
  color: beige;
  z-index: 2;
`;

const StDistance = styled.div`
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  width: 80px;
  height: 20px;
  font-size: 15px;
  font-weight: 700;
`;
const StNameSex = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px 10px 10px 10px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 700;
  width: 200px;
`;
const StDecs = styled.div`
  font-size: small;
  background-color: white;
  color: black;
  border-radius: 10px 10px 10px 10px;
  width: 300px;
  height: 30px;
`;
