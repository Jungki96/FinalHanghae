import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import male from "../../../assets/img/male.PNG";
import female from "../../../assets/img/female.PNG";

const EditDog = ({ dog, images, onChangeTrue }) => {
  const Authorization = sessionStorage.getItem("accessToken");
  const { id } = useParams();
  const [editData, setEditData] = useState({});

  const onEditData = async (e) => {
    await axios.patch(`${process.env.REACT_APP_DOG}/dogs/${id}`, e, {
      headers: {
        Authorization,
      },
    });
    alert("수정이 완료되었습니다.");
    window.location.reload();
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
            {dog.dogSex === "male" ? (
              <>
                <StDiv5>
                  <input
                    type="radio"
                    name="dogSex"
                    value="male"
                    onChange={(ev) =>
                      setEditData({
                        ...editData,
                        dogSex: ev.target.value,
                      })
                    }
                    defaultChecked
                  />
                </StDiv5>
                <StDiv6>
                  <input
                    type="radio"
                    name="dogSex"
                    value="female"
                    onChange={(ev) =>
                      setEditData({
                        ...editData,
                        dogSex: ev.target.value,
                      })
                    }
                  />
                </StDiv6>
              </>
            ) : (
              <>
                <StDiv5>
                  <input
                    type="radio"
                    name="dogSex"
                    value="male"
                    onChange={(ev) =>
                      setEditData({
                        ...editData,
                        dogSex: ev.target.value,
                      })
                    }
                  />
                </StDiv5>
                <StDiv6>
                  <input
                    type="radio"
                    name="dogSex"
                    value="female"
                    onChange={(ev) =>
                      setEditData({
                        ...editData,
                        dogSex: ev.target.value,
                      })
                    }
                    defaultChecked
                  />
                </StDiv6>
              </>
            )}
          </StDiv4>
        </div>
        <StBox>사진</StBox>
        <br />
        <div>
          {images.map((image) => (
            <div key={image.id}>
              <StPeople style={{ backgroundImage: `url(${image.imageUrl})` }} />
            </div>
          ))}
        </div>
        <StBox>설명</StBox>
        <StDesc
          type="text"
          placeholder={dog.dogDetails}
          onChange={(ev) => {
            setEditData({
              ...editData,
              dogDetails: ev.target.value,
            });
          }}
        />
        {/* <Space /> */}
        <StBtnGroup>
          <StButton2 className="cancel" onClick={onChangeTrue}>
            취소하기
          </StButton2>
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
  color: #2f58ac;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 80px;
  height: 25px;
  margin-top: 10px;
  margin-bottom: 7px;
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
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.input`
  font-size: large;
  color: #2f58ac;
  text-align: center;
  margin-bottom: 10px;
  border: 2px solid #2f58ac;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  width: 100px;
`;
const StDesc = styled.input`
  font-size: 16px;
  color: #2f58ac;
  text-align: center;
  margin-bottom: 10px;
  border: 2px solid #2f58ac;
  border-radius: 10px 10px 10px 10px;
  width: 250px;
  height: 60px;
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
const StButton2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 5px;
  color: white;
  background: #8e8e93;
  border: 1px solid white;
  border-radius: 20px;
  cursor: pointer;
`;

const Space = styled.div`
  height: 20px;
`;

const StBtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
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
