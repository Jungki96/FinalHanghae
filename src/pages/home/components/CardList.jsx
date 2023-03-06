import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "./Image";
import YES from "../../../assets/img/YES.png";
import NO from "../../../assets/img/NO.png";
import ModalBasic from "./ModalBasic";

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

  //좋아요 모달
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  // 수락하기
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
    window.location.reload();
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
    window.location.reload();
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Container>
      {modalOpen && (
        <ModalBasic dogId={dogs.dogId} dogName={dogs.dogName} setModalOpen={setModalOpen} />
      )}
      <Image key={dogs.dogId} images={mainImage} data={dogs} />
      <StBtnGroup>
        <StImg src={YES} onClick={showModal}></StImg>
        <StImg src={NO} onClick={() => handleHateClick()}></StImg>
      </StBtnGroup>
    </Container>
  );
};
export default CardList;

const Container = styled.div`
  height: 605px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
`;

const StBtnGroup = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StImg = styled.img`
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
`;
