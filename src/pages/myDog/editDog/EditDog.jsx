import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import male from "../../../assets/img/male.PNG";
import female from "../../../assets/img/female.PNG";

const EditDog = ({ dog, images, onChangeTrue }) => {
  const Authorization = sessionStorage.getItem("accessToken");
  const { id } = useParams();
  const [editData, setEditData] = useState({
    dogName: "",
    dogSex: "",
    dogDetails: "",
  });

  const onEditData = async (e) => {
    await axios.patch(`${process.env.REACT_APP_DOG}/dogs/${id}`, e, {
      headers: {
        Authorization,
      },
    });
    alert("수정이 완료되었습니다.");
    window.location.reload();
    // console.log(e);
  };

  return (
    <>
      <Stform>
        <StBox>이름</StBox>
        <StName
          type="text"
          placeholder={dog.dogName}
          onChange={(ev) => {
            setEditData({
              ...editData,
              dogName: ev.target.value,
            });
          }}
        />
        <StBox>성별</StBox>
        <div>
          <StImg2 src={male} />
          <StImg src={female} />
          <StDiv4>
            <StDiv5>
              <input type="radio" name="dogSexRadio" value="Male" defaultChecked />
            </StDiv5>
            <StDiv6>
              <input type="radio" name="dogSexRadio" value="Female" />
            </StDiv6>
          </StDiv4>
        </div>
        <StBox>설명</StBox>
        <StName
          type="text"
          placeholder={dog.dogDetails}
          onChange={(ev) => {
            setEditData({
              ...editData,
              dogDetails: ev.target.value,
            });
          }}
        />
        <Space />
        <StBox>사진</StBox>
        <br />
        <div>
          {images.map((image) => (
            <div key={image.id}>
              <StPeople style={{ backgroundImage: `url(${image.imageUrl})` }} />
            </div>
          ))}
        </div>
        <br />
        <StBtnGroup>
          <StButton onClick={onChangeTrue}>취소하기</StButton>
          <StButton onClick={() => onEditData(editData)}>수정완료</StButton>
        </StBtnGroup>
      </Stform>
    </>
  );
};
export default EditDog;

const Stform = styled.form`
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
  margin-top: 20px;
  margin-bottom: 5px;
  background: #ffffff;
  border: 1px solid #4269b4;
  border-radius: 20px;
`;

const StPeople = styled.div`
  position: relative;
  width: 70px;
  padding: 30px;
  height: 100px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.input`
  font-size: large;
  color: black;
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
  cursor: pointer;
`;

const Space = styled.div`
  height: 20px;
`;

const StBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImg = styled.img`
  width: 90px;
  height: 75px;
  margin-left: 17px;
`;
const StImg2 = styled.img`
  width: 90px;
  height: 75px;
  margin-left: 17px;
`;

const StDiv4 = styled.div`
  display: flex;
  flex-direction: row;
`;
const StDiv5 = styled.div`
  margin-left: 52px;
`;
const StDiv6 = styled.div`
  margin-left: 83px;
`;
