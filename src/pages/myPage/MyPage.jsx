import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../shared/MainHeader";
import MyDogList from "./components/MyDogList";
import EditInfo from "./components/EditInfo";
import axios from "axios";
import Footer from "../../shared/Footer";

const EditUser = () => {
  const [user, setUser] = useState();
  const [dogs, setDogs] = useState([]);

  const Authorization = sessionStorage.getItem("accessToken");
  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/users/mypage`, {
      headers: {
        Authorization,
      },
    });
    console.log(data.myDogs);
    setUser(data);
    setDogs(data.myDogs);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <MainHeader>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>설정</div>
      </MainHeader>
      <Container>
        <br />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>안녕하세요 {user?.username}님!</div>
          <br />
          <div>주소:{user?.latitude}</div>
          <div style={{ fontSize: "15px" }}>{user?.email}</div>
        </div>
        <StImgGroup>
          {dogs.map((dog) => (
            <MyDogList key={dog.dogId} dog={dog} />
          ))}
        </StImgGroup>
        <Space />
        <EditInfo user={user} />
      </Container>
      <Footer />
    </>
  );
};

export default EditUser;

const Space = styled.div`
  height: 10vh;
`;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
`;

const StImgGroup = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
`;
