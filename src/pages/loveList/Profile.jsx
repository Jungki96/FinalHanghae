import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import male from "../../assets/img/male.PNG";
import female from "../../assets/img/female.PNG";

const Profile = ({ setModalOpen, dogId, dogName, content, writer }) => {
  const Authorization = sessionStorage.getItem("accessToken");
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [images, setImages] = useState([]);

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/dogs/${id}`, {
      headers: {
        Authorization,
      },
    });
    setDog(data);
    setImages(data.images);
    console.log(dog);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <BackGround>
      <Container>
        <StBefore>
          <StBox>이름</StBox>
          <StName>{dog.dogName}</StName>
          <StBox>성별</StBox>
          {dog.dogSex === "male" ? <StImg src={male} /> : <StImg src={female} />}
          <StBox>사진</StBox>
          <div>
            {images.map((image) => (
              <div key={image.id}>
                <StPeople style={{ backgroundImage: `url(${image.imageUrl})` }} />
              </div>
            ))}
          </div>
          <StBox>설명</StBox>
          <StDesc>{dog.dogDetails}</StDesc>
          <StButton onClick={closeModal}>좀 더 볼게요.</StButton>
        </StBefore>
      </Container>
    </BackGround>
  );
};
export default Profile;
const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 모달창 크기 */
  width: 300px;
  height: 500px;
  /* 최상단 위치 */
  z-index: 999;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
`;
const StBefore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
  background: #ffffff;
  border: 1px solid #4269b4;
  border-radius: 20px;
`;

const StPeople = styled.div`
  position: relative;
  width: 60px;
  padding: 30px;
  height: 80px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  font-size: large;
  color: black;
  text-align: center;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  padding-bottom: 8px;
  width: 100px;
`;

const StDesc = styled.div`
  padding-top: 4px;
  font-size: 16px;
  color: black;
  text-align: center;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px 10px 10px 10px;
  width: 250px;
  height: 60px;
`;

const StImg = styled.img`
  width: 90px;
  height: 75px;
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #2f58ac;
    color: white;
  }
`;
