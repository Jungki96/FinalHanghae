import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDogList from "./components/MyDogList";
import EditInfo from "./components/EditInfo";
import axios from "axios";
import Layout from "../../components/Layout";

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
    setUser(data);
    console.log(data);
    setDogs(data.myDogs);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Layout title="설정">
      <Container>
        <br />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>안녕하세요 {user?.username}님!</div>
          <br />
          <div>주소:{user?.address.split(" ").slice(0, 3).join(" ")}</div>
          <div style={{ fontSize: "15px" }}>{user?.email}</div>
        </div>
        <StImgGroup>
          {dogs.map((dog) => (
            <MyDogList key={dog.dogId} dog={dog} />
          ))}
        </StImgGroup>
        <EditInfo user={user} />
      </Container>
    </Layout>
  );
};

export default EditUser;

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
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;
