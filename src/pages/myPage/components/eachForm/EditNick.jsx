import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Layout from "../../../../components/Layout";

const EditNick = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const initialState = {
    username: "",
  };
  //유저 스테이트 생성
  const [data, setData] = useState(initialState);

  const onSubmitHadler = async () => {
    await axios.patch(`${process.env.REACT_APP_DOG}/users/mypage`, data, {
      headers: {
        Authorization,
      },
    });
    alert("성공적으로 변경되었습니다!");
    navigate(-1);
  };

  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Layout title="설정">
      <Container>
        <StForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHadler();
          }}
        >
          <Space />
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>닉네임 변경</div>
          <br />
          <StInput
            placeholder="변경할 닉네임을 입력해주세요"
            required
            name="username"
            onChange={onChangeLoginHandler}
          />
          <Space />
          <StButton>변경하기</StButton>
        </StForm>
      </Container>
    </Layout>
  );
};

export default EditNick;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInput = styled.input`
  margin-top: 20px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  width: 300px;
`;

const StButton = styled.button`
  border-radius: 20px 20px 20px 20px;
  border-style: none;
  width: 200px;
  height: 40px;
  background-color: #2f58ac;
  color: white;
`;

const Space = styled.div`
  height: 70px;
`;
