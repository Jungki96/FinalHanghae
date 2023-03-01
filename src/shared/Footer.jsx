import React from "react";
import styled from "styled-components";
import DogHome from "../assets/img/DogHome.png";
import MessageIcon from "../assets/img/MessageIcon.png";
import FootIcon from "../assets/img/FootIcon.png";
import UserIcon from "../assets/img/UserIcon.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <StButtons>
      <StImg
        src={DogHome}
        onClick={() => {
          navigate("/");
        }}
      />

      <StImg
        src={MessageIcon}
        onClick={() => {
          navigate("/chattingList");
        }}
      />

      <StImg
        src={FootIcon}
        onClick={() => {
          navigate("/giveLove");
        }}
      />

      <StImg
        src={UserIcon}
        onClick={() => {
          navigate("/mypage");
        }}
      />
    </StButtons>
  );
}
export default Footer;

const StButtons = styled.div`
  width: 375px;
  height: 83px;
  bottom: 0;
  box-shadow: 0px -1px 0px 0px #000000; /* box-shadow 속성을 사용해 그림자를 만듭니다 */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StImg = styled.img`
  width: 30px;
  height: 30px;
  left: 38px;
  top: 18px;
`;
