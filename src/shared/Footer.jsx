import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AndroidIcon from "@mui/icons-material/Android";
import PetsIcon from "@mui/icons-material/Pets";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <StButtons>
      <IconButton
        onClick={() => {
          navigate("/differntaddress");
        }}
      >
        <AndroidIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate("/chattingList");
        }}
      >
        <ChatBubbleIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate("/giveLove");
        }}
      >
        <PetsIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <PersonIcon fontSize="large" />
      </IconButton>
    </StButtons>
  );
}
export default Footer;

const StButtons = styled.div`
  background-color: #ffffff;
  border-top-style: 1px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
