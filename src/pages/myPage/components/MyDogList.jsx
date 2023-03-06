import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Award from "../../../assets/img/award.png";

const MyDogList = ({ dog }) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <StImg style={{ backgroundImage: `url(${dog.profileImages})` }} />
        {/* <Stdiv>
          <StEditBtn onClick={() => navigate(`/myDog/${dog.dogId}`)}>수정</StEditBtn>
        </Stdiv> */}
        <StName>
          <StImoticon src={Award} />
          {dog.dogName}
        </StName>
      </Container>
    </>
  );
};

export default MyDogList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImg = styled.div`
  position: relative;
  width: 330px;
  height: 180px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;

const Stdiv = styled.div`
  display: flex;
  align-items: center;
`;

const StEditBtn = styled.button`
  /* position: absolute; */
  position: relative;
  width: 80px;
  border-radius: 10px 10px 10px 10px;
`;

const StName = styled.div`
  font-size: 20px;
  color: black;
`;

const StImoticon = styled.img`
  margin-right: 5px;
  width: 20px;
  height: 20px;
`;
