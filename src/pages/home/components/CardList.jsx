import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CardlistPagination from "./CardlistPagination";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";

const CardList = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  const [dogs, setDogs] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const offset = (page - 1) * limit;

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/match`, {
      headers: {
        Authorization,
      },
    });
    setDogs(data);
    setMainImage(data.images[0].imageUrl);
    console.log(data.images[0].imageUrl);
  };
  const handleFavoriteClick = (person) => {
    alert("정말 매치하겠냐멍?");
    // setDogs(...dogs, person);
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Container>
        {/* {dogs
          .slice(offset, offset + limit)
          .map(({ images, dogName, dogSex, dogId, distance, dogDetails }) => (
            <OneDog key={dogId}>
              <StDog style={{ backgroundImage: `url(${mainImage})` }}>
                <StName>{dogName}</StName>
                <StName>{distance}</StName>
                <StName>{dogSex}</StName>
                <StName>{dogDetails}</StName>
              </StDog>
              <Space />
            </OneDog>
          ))} */}
        <Space>
          <CardlistPagination total={dogs.length} limit={limit} page={page} setPage={setPage} />
        </Space>
        <div className="btnGruop">
          <div className="circleBorder">
            <IconButton onClick={() => handleFavoriteClick()}>
              <FavoriteBorderIcon className="icon" />
            </IconButton>
          </div>
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
const StDog = styled.div`
  position: relative;
  width: 37vh;
  height: 60vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: medium;
  bottom: 30px;
  color: beige;
`;

const OneDog = styled.div`
  justify-content: flex-start;
`;
const Space = styled.div`
  margin-top: -15vh;
  display: flex;
  z-index: 1;
`;
