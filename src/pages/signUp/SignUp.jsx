import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __postUser, __checkId } from "../../redux/modules/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    username: "",
    email: "",
    password: "",
    check_password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //유저 스테이트 구조분해 할당
  const { username, email, password, check_password } = user;

  //상태관리 위해 초기값 세팅

  const [usernameInput, setusernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [checkpassInput, setcheckpassInput] = useState("");

  //정규식
  const regusername = /^[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]{1,20}$/;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,15}$/;

  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "username")
      !regusername.test(value) ? setusernameInput("") : setusernameInput("");

    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("이메일 형식으로 입력해주세요.")
        : setEmailInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~15자의 영문 대소문자와 숫자 그리고
             특수문자(!@#$%^&*)를 입력해주세요.`
          )
        : setPassInput("");
    if (name === "check_password")
      password !== value
        ? setcheckpassInput("비밀번호가 불일치합니다")
        : setcheckpassInput("");
  };
  // 회원가입 POST요청 및 공백 존재 시 경고창 생성
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }
    if (password !== check_password) {
      return alert("다시 비번좀!");
    }

    dispatch(
      __postUser({
        username,
        email,
        password,
      })
    );
    navigate("/login");
  };
  const onSubmitUserCheckHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return alert("이메일 입력스!");
    }
    dispatch(
      __checkId({
        email,
      })
    );
  };

  return (
    <Container>
      <Wrapper>
        <SignUpBox onSubmit={onSubmitUserHandler}>
          <TopBox>
            <div>간편하게 가입하고</div>
            <br />
            <StP1>투개더를 이용해보세요</StP1>
          </TopBox>
          <div>
            <StP2>이름</StP2>
            <StInput
              type="text"
              name="username"
              value={username}
              placeholder="이름을 입력하세요(강아지 이름X)"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <StP3 id="help-password2" className="help">
            {usernameInput}
          </StP3>

          <StP2>이메일</StP2>

          <div>
            <StInput
              type="email"
              name="email"
              value={email}
              placeholder="이메일을 입력해주세요"
              onChange={onChangeUserHandler}
            />
          </div>
          <StP3 id="help-user" className="help">
            {emailInput}
          </StP3>
          <StButton onClick={onSubmitUserCheckHandler}>
            이메일 중복확인
          </StButton>
          <br />
          <br />
          <StP2>비밀번호</StP2>
          <div>
            <StInput
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <StP3 id="help-password1" className="help">
            {passInput}
          </StP3>
          <div>
            <StP2>비밀번호 확인</StP2>
            <StInput
              type="password"
              name="check_password"
              value={check_password}
              placeholder="비밀번호 확인해주세요"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <StP3 id="help-password2" className="help">
            {checkpassInput}
          </StP3>
          <br />
          <br />
          <StDogButton>강아지 설정하기</StDogButton>
        </SignUpBox>
      </Wrapper>
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  display: flex;
  margin-top: 15%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;
const StP1 = styled.div`
  font-size: 20px;
`;
const StP2 = styled.div`
  padding-left: 5px;
  font-weight: 600;
`;
const StP3 = styled.div`
  margin-top: 2%;
  max-width: 90%;
  margin-left: 5%;
  font-size: 12px;
  margin-bottom: 5%;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;

  h1 {
    color: #333333;
  }
  button {
    border: none;
    width: 130px;
    height: 30px;
    border-radius: 10px;
    background-color: #f56753;
    color: white;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const StButton = styled.button`
  background-color: #2f58ac;
  color: white;
  text-align: center;
  height: 34px;
  width: 300px;
  margin-left: 8%;
  font-size: 15px;
  border-radius: 18px;
  margin-bottom: 1%;
`;
const StDogButton = styled.button`
  position: relative;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  height: 40px;
  width: 300px;
  margin-left: 8%;
  font-size: 15px;
  border-radius: 20px;

  margin-top: 25%;
`;
const StInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  margin-bottom: 3%;
  background-color: #fafafa;
  border: 2px solid;
  margin-top: 10px;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  &::placeholder {
    font-size: 12px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const SignUpBox = styled.form``;
