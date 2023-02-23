import axios from "axios";
import React, { useState } from "react";
import MainHeader from "../../../../shared/MainHeader";
import styled from "styled-components";
import { useNavigate } from "react-router";

const EditNick = () => {
  const navigate = useNavigate();
  const Authorization = sessionStorage.getItem("accessToken");
  //기초 데이터 생성
  const initialState = {
    newPassword: "",
    password: "",
    check_password: "",
  };
  //유저 스테이트 생성
  const [psw, setPsw] = useState(initialState);
  //유저 스테이트 구조분해 할당
  const { password, check_password, newPassword } = psw;
  //상태관리 위해 초기값 세팅
  const [passInput, setPassInput] = useState("");
  const [checkpassInput, setcheckpassInput] = useState("");
  //정규식
  const regPassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,16}$/;
  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setPsw({ ...psw, [name]: value });
    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~16자의 영문 대소문자와 숫자로 입력해주세요.
                         특수문자(!@#$%^&*)도 사용 가능합니다.`
          )
        : setPassInput("");

    if (name === "check_password")
      newPassword !== value ? setcheckpassInput("비밀번호가 불일치합니다") : setcheckpassInput("");
  };

  const onSubmitHadler = async () => {
    await axios
      .patch(`${process.env.REACT_APP_DOG}/users/mypage`, psw, {
        headers: {
          Authorization,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      });
    alert("성공적으로 변경되었습니다!");
    // navigate(-1);
  };

  const onDeleteUserHandler = () => {};

  return (
    <>
      <MainHeader>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>비밀번호 변경</div>
      </MainHeader>
      <Container>
        <StForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHadler();
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>비밀번호 변경</div>
          <StInput
            placeholder="현재 비밀번호를 입력해주세요"
            required
            name="password"
            value={password}
            onChange={onChangeUserHandler}
          />
          <Space />
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>새 비밀번호</div>
          <StInput
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
            required
            name="newPassword"
            value={newPassword}
            onChange={onChangeUserHandler}
          />
          <p style={{ fontSize: "10px", fontWeight: "bold" }} id="help-password1" className="help">
            {passInput}
          </p>
          <br />
          <StInput
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            required
            name="check_password"
            value={check_password}
            onChange={onChangeUserHandler}
          />
          <p id="help-password2" className="help">
            {checkpassInput}
          </p>
          <Space />
          <StButton>변경하기</StButton>
        </StForm>
        <Space />
        <Space />
        <UnderLine />
        <Space />
        <StDeleteUser onClick={() => onDeleteUserHandler()}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>회원탈퇴</div>
          <br />
          <div style={{ fontSize: "15px", color: "#c6c6c6" }}>
            개인정보 및 설정이 모두 삭제됩니다.
          </div>
        </StDeleteUser>
      </Container>
    </>
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
  width: 40vh;
  height: 4vh;
  background-color: #2f58ac;
  color: white;
`;

const UnderLine = styled.div`
  display: flex;
  width: 45vh;
  height: 0.5vh;
  background-color: #c6c6c6;
`;

const StDeleteUser = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  margin-left: -10vh;
`;
const Space = styled.div`
  height: 8vh;
`;
