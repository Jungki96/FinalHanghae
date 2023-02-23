import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../shared/MainHeader";
import axios from "axios";
import EditDog from "./editDog/EditDog";

const MyDog = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const Authorization = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  //임시 작동 안됨
  const [dog, setDog] = useState({});
  const fetchList = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_DOG}/dogs/${id}`,
      {
        headers: {
          Authorization,
        },
      }
    );
    setDog(data);
    console.log(dog);
  };

  const onDeleteDog = () => {
    axios.delete(`${process.env.REACT_APP_DOG}/dogs/${id}`, {
      headers: {
        Authorization,
      },
    });
    alert("성공적으로 삭제되었습니다!");
    navigate(-1);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <MainHeader />
      <Container>
        {!edit ? (
          <StBefore>
            <StBox>이름</StBox>
            <br />
            <StName>{dog.dogName}</StName>
            <Space />
            <StBox>성별</StBox>
            <br />
            <StName>{dog.dogSex}</StName>
            <Space />
            <StBox>사진</StBox>
            <br />
            <div>
              {/* {dog.images.map((dog) => (
                <StPeople style={{ backgroundImage: `url(${dog.imageUrls})` }} />
              ))} */}
            </div>
            <button onClick={() => setEdit(true)}>변경</button>
            <button onClick={() => onDeleteDog()}>삭제</button>
          </StBefore>
        ) : (
          <div>
            <EditDog />
          </div>
        )}
      </Container>
    </div>
  );
};
export default MyDog;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
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
  width: 6vh;
  height: 3vh;
  margin-top: 2vh;
  margin-bottom: 1vh;
  background: #ffffff;
  border: 1px solid #4269b4;
  border-radius: 20px;
`;

const StPeople = styled.div`
  position: relative;
  width: 100px;
  padding: 30px;
  max-width: 85vw;
  height: 18vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  font-size: large;
  color: black;
`;

const Space = styled.div`
  height: 4vh;
`;
