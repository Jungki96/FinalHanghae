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
    console.log(dogs);
  };

  const handleFavoriteClick = () => {
    axios.post(
      `${process.env.REACT_APP_DOG}/match/love/${dogs.dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    alert("좋아요를 눌렀습니다.");
    console.log(dogs);
    console.log(Authorization);
    // window.location.reload();
  };
  //싫어요 클릭
  const handleHateClick = () => {
    axios.post(
      `${process.env.REACT_APP_DOG}/match/reject/${dogs.dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    alert("싫어요를 눌렀습니다.");
    // window.location.reload();
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Container>
      <Image key={dogs.dogId} images={mainImage} data={dogs} />
      <StBtnGroup>
        <STCircleBorder>
          <IconButton onClick={() => handleFavoriteClick()}>
            <FavoriteBorderIcon className="icon" />
          </IconButton>
        </STCircleBorder>
        <div className="circleBorder">
          <IconButton onClick={() => handleHateClick()}>
            <ClearIcon className="icon" />
          </IconButton>
        </div>
      </StBtnGroup>
    </Container>
  );
};
export default CardList;

const Container = styled.div`
  height: 605px;
`;

const StBtnGroup = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const STCircleBorder = styled.div`
  margin-right: 80px;
`;
