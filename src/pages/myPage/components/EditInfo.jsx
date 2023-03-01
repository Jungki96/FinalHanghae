import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const EditInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <StForm>
        <StOneInfoWhite onClick={() => navigate("/mypage/editnick")}>
          <EditIcon />
          닉네임 변경하기
        </StOneInfoWhite>
        <StOneInfoBlack onClick={() => navigate("/mypage/editpsw")}>
          <LockIcon />
          비밀번호 변경
        </StOneInfoBlack>
        <StOneInfoWhite onClick={() => navigate("/newaddress")}>
          <EditLocationIcon />
          주소변경하기
        </StOneInfoWhite>
        <StOneInfoBlack onClick={() => navigate("/mypage/adddog")}>
          <AddCircleIcon />
          강아지 추가하기
        </StOneInfoBlack>
      </StForm>
    </>
  );
};

export default EditInfo;

const StForm = styled.form`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  align-items: center;
`;

const StOneInfoWhite = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeef6;
`;

const StOneInfoBlack = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aabcdd;
`;
