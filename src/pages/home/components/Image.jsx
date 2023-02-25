import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CardlistPagination from "./CardlistPagination";

const Image = ({ images }) => {
  const [dogs, setDogs] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  console.log(images);
  return (
    <Container>
      {images.slice(offset, offset + limit).map(({ imageUrl, dogId }) => (
        <OneDog key={dogId}>
          <StDog style={{ backgroundImage: `url(${imageUrl})` }}></StDog>
        </OneDog>
      ))}
      <Space>
        <CardlistPagination total={images.length} limit={limit} page={page} setPage={setPage} />
      </Space>
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
