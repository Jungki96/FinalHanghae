import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import smlogo from "../../assets/img/smlogo.png";
import StartLayout from "../../components/StartLayout";

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

  return (
    <StartLayout>
      <Container>
        <StLogo src={smlogo} />
        <form>
          <StDiv>
            <StThinText>간편하게 로그인하고</StThinText>
            <br />
            <StBoldText>투개더를 이용해보세요</StBoldText>
          </StDiv>
          <div>
            <StEmBox>
              <StEmText>이메일</StEmText>
              <StInput
                required
                type="text"
                name="email"
                placeholder="이메일을 입력하세요"
                onChange={onChangeLoginHandler}
              ></StInput>
            </StEmBox>
            <StPwBox>
              <StEmText>비밀번호</StEmText>
              <StInput
                required
                type="password"
                name="password"
                placeholder="패스워드를 입력하세요"
                onChange={onChangeLoginHandler}
              ></StInput>
            </StPwBox>
          </div>
          <LogInBtn onClick={onSubmitLoginHandler}>로그인</LogInBtn>
        </form>

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
      </Container>
    </StartLayout>
  );
}

export default Login;

const Container = styled.div`
  width: 375px;
  height: 812px;
  border-radius: 30px;
`;
const StLogo = styled.img`
  width: 196.65px;
  height: 107.16px;
  margin-left: 83px;
  margin-top: 41px;
`;
const StDiv = styled.div`
  width: 260px;
  height: 70px;
  margin-left: 55px;
  margin-top: 23.84px;
  text-align: center;
`;
const StEmBox = styled.div`
  width: 259px;
  height: 52px;
  margin-left: 57px;
  margin-top: 66px;
`;

const StPwBox = styled.div`
  width: 259px;
  height: 52px;
  margin-left: 57px;
  margin-top: 22px;
  margin-bottom: 112px;
`;
const StEmText = styled.p`
  width: 100px;
  height: 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;
const StThinText = styled.p`
  font-weight: 300;
  font-size: 24px;
`;

const StBoldText = styled.p`
  font-weight: 600;
  font-size: 24px;
`;
const SignUpBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;

  height: 46px;
  width: 285px;
  margin-left: 48px;
  margin-top: 12px;
  background: #1c3467;
  border-radius: 60px;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 61.5px;
`;
const LogInBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;
  height: 46px;
  width: 285px;
  margin-left: 48px;

  /* Main/main */
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #ffffff;
  background: #2f58ac;
  border-radius: 60px;
`;
const KakaoSignIn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;
  height: 46px;
  width: 285px;
  margin-left: 48px;

  /* Main/main */
  font-weight: 700;
  font-size: 13px;
  line-height: 23px;
  text-align: center;

  background: #fee500;
  border-radius: 60px;
`;
const StInput = styled.input`
  margin-top: 6px;
  width: 259px;
  height: 26px;
  background-color: white;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  &::placeholder {
    width: 138px;
    height: 17px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
