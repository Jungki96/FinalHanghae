import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "./Image";

const CardList = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  const [dogs, setDogs] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [mainImage, setMainImage] = useState([]);
  const offset = (page - 1) * limit;

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/match`, {
      headers: {
        Authorization,
      },
    });
    setDogs(data);
    setMainImage(data.images);
  };
  const handleFavoriteClick = () => {
    axios.get(`${process.env.REACT_APP_DOG}/match/love/${dogs.dogId}`, {
      headers: {
        Authorization,
      },
    });
    alert("좋아요를 눌렀습니다.");
    // window.location.reload();
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Container>
        <Image key={dogs.dogId} images={mainImage}>
          <StName>{dogs.dogName}</StName>
          <StName>{dogs.distance}</StName>
          <StName>{dogs.dogSex}</StName>
          <StName>{dogs.dogDetails}</StName>
        </Image>
        <Space />
        <div className="btnGruop">
          <STCircleBorder>
            <IconButton onClick={() => handleFavoriteClick()}>
              <FavoriteBorderIcon className="icon" />
            </IconButton>
          </STCircleBorder>
          <div className="circleBorder">
            <IconButton>
              <ClearIcon className="icon" />
            </IconButton>
          </div>
        </div>
      </Container>
    </>
  );
};
export default CardList;

const Container = styled.div`
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

const StName = styled.h3`
  position: absolute;
  font-size: medium;
  bottom: 30px;
  color: beige;
  z-index: 2;
`;

const Space = styled.div`
  margin-top: 1vh;
  display: flex;
  z-index: 1;
`;

const STCircleBorder = styled.div`
  margin-right: 6vh;
`;
