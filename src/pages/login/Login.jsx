import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import Logo from "../../assets/img/logo.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    email: "",
    password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //로그인 체크 전역변수 불러오기
  const loginCheck = useSelector((state) => state.userList.isLogin);

  //로그인 핸들러
  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.email.trim() === "" || user.password.trim() === "") {
      alert("이메일/아이디를 입력하세요");
    }
    dispatch(__postLogin(user));
  };

  useEffect(() => {
    loginCheck && navigate("/selectpage");
  }, [loginCheck, navigate]);

  // const onCheckEnter = (e) => {
  //   if (e.key === "Enter") {
  //     onSubmitLoginHandler();
  //   }
  // };

  return (
    <Container>
      <Wrapper>
        <StLogo src={Logo} />
        <LoginBox>
          <TopBox>
            <div>간편하게 로그인하고</div>
            <br />
            <StP1>투개더를 이용해보세요</StP1>
          </TopBox>
          <div>
            <p>이메일</p>
            <StInput
              required
              type="text"
              name="email"
              placeholder="이메일을 입력하세요"
              onChange={onChangeLoginHandler}
            ></StInput>
            <br />
            <br />
            <br />
            <p>비밀번호</p>
            <StInput
              required
              type="password"
              name="password"
              placeholder="패스워드를 입력하세요"
              onChange={onChangeLoginHandler}
            ></StInput>
          </div>
          <LogInBtn onClick={onSubmitLoginHandler}>로그인</LogInBtn>
        </LoginBox>

        <SignUpBtn
          onClick={() => {
            navigate("/signup");
          }}
        >
          회 원 가 입
        </SignUpBtn>
        <KakaoSignIn>
          <a href={KAKAO_AUTH_URL}> 카카오로그인 </a>
        </KakaoSignIn>
      </Wrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;
const StLogo = styled.img`
  width: 162px;
  height: 115px;
  left: 106px;
  top: 57px;
  margin-top: 30%;
  margin-left: 25%;
`;
const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
`;
const StP1 = styled.div`
  font-size: 20px;
`;
const TopBox = styled(WhiteBox)`
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
    background-color: gray;
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

const SignUpBtn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 15px;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-size: 15px;
  margin-left: 5%;
  width: 90%;
  height: 45px;
  opacity: gray;
`;
const LogInBtn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 20%;
  background-color: #4269b4;
  color: white;
  text-align: center;
  font-size: 15px;
  margin-left: 5%;
  width: 90%;
  height: 45px;
  font-weight: 600;
  opacity: gray;
`;
const KakaoSignIn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 20%;
  margin-bottom: 10%;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  font-weight: 600;
  margin-left: 5%;
  width: 90%;
  height: 45px;
  font-size: 15px;
  opacity: gray;
`;
const StInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  box-sizing: border-box;
  margin-top: 20px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  &::placeholder {
    font-size: 12px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const LoginBox = styled.form``;
const Form = styled.form``;
