import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../shared/MainHeader";
import axios from "axios";
import EditDog from "./editDog/EditDog";
import Layout from "../../components/Layout";
import male from "../../assets/img/male.PNG";
import female from "../../assets/img/female.PNG";

const MyDog = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const Authorization = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
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

  // props 끌어올리기 용!!!
  const onChangeTrue = () => {
    setEdit(false);
  };

  return (
    <Layout title="설정">
      <Container>
        {!edit ? (
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
            <StBtnGroup>
              <StButton onClick={() => setEdit(true)}>강아지 수정</StButton>
              {/* 보류 */}
              {/* <StButton onClick={() => onDeleteDog()}>강아지 삭제</StButton> */}
            </StBtnGroup>
          </StBefore>
        ) : (
          <StBefore>
            <EditDog dog={dog} images={images} edit={edit} onChangeTrue={onChangeTrue} />
          </StBefore>
        )}
      </Container>
    </Layout>
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
  font-size: large;
  color: black;
  text-align: center;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px 10px 10px 10px;
  width: 200px;
  height: 50px;
`;

const StButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 5px;
  color: white;
  background: #4269b4;
  border: 1px solid white;
  border-radius: 20px;
`;
const StImg = styled.img`
  width: 90px;
  height: 75px;
`;

const Space = styled.div`
  height: 20px;
`;

const StBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
