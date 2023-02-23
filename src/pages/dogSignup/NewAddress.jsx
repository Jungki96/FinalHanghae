import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { __patchAddress } from "../../redux/modules/addessSlice";
import { useDispatch } from "react-redux";
import DogSignUpTop from "./dogSignUpComponents/DogSignUpTop";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Congra from "../../assets/img/congra.png";

const NewAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  //위도,경도,주소
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("37.537187");
  const [longitude, setLongitude] = useState("127.005476");

  //모달테스트
  const [modalState, setModalState] = useState(true);

  // 조건부 렌더링을 위한 상태관리
  const [signNumber, setSignNumber] = useState(0);

  // 위도 경도 주소값 서버로 전송

  const handleComplete = (data) => {
    setModalState(false);
    let newAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      newAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // Daum API 사용
    const geocoder = new window.daum.maps.services.Geocoder();
    geocoder.addressSearch(newAddress, function (result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        const lat = result[0]?.y; // 위도
        const lng = result[0]?.x; // 경도
        console.log("위도", lat);
        console.log("경도", lng);
        setLatitude(lat);
        setLongitude(lng);
      }
    });
    setAddress(newAddress);
  };
  dispatch(__patchAddress({ latitude, longitude, address }));

  // next 회원가입 완료로 가는 버튼
  const next = (e) => {
    if (signNumber === 0) {
    }
    e.preventDefault();
    setSignNumber((prevNumber) => prevNumber + 1);
  };

  // 얼른가자 멍 이후 메인페이지로
  const submitLogin = () => {
    navigate("/home");
  };

  return (
    <div>
      <BgBox>
        <AddForm>
          {signNumber === 0 && (
            <Wrapper>
              <AddForm>
                <DogSignUpTop></DogSignUpTop>
                <br></br>
                <br></br>
                <StNum>(마지막이에요!)</StNum>
                <span> 회원님의 주소를 설정해 주세요 </span>
                <span> 도로명 주소를 입력해 주세요!</span>
                <span> 예)강남대로(O),강남동(X)</span>
                <br></br>
                {<DaumPostCode onComplete={handleComplete} />}
                {!modalState && (
                  <div>
                    <AddressInput
                      onClick={() => setIsOpen(true)}
                      value={address}
                    />
                    <StBtn type="submit" onClick={next}>
                      다음
                    </StBtn>
                    <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
                      뒤로
                    </StBackBtn>
                  </div>
                )}
              </AddForm>
            </Wrapper>
          )}
          {signNumber === 1 && (
            <Container>
              <Wrapper>
                <StLogo src={Logo} />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>
                  가입을 축하드려요! <br /> 이제부터 본격적으로 <br /> 투개더🐶
                  할까요?
                </div>
                <StLogo src={Congra} />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <StBtn onClick={submitLogin}>{`얼른 가자멍!`}</StBtn>
              </Wrapper>
            </Container>
          )}
        </AddForm>
      </BgBox>
    </div>
  );
};

export default NewAddress;

const BgBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  padding: 0 26px;
  box-sizing: border-box;

  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;

  position: absolute;
  top: 0;
  left: 0;
`;
const StNum = styled.div`
  margin-top: -13%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 23%;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const AddressInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const AddForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
`;

const StBackBtn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 15px;
  background-color: #aeaeb2;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-size: 15px;
  margin-left: 5%;
  width: 90%;
  height: 45px;
  opacity: gray;
`;
const StBtn = styled.button`
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

const StLogo = styled.img`
  width: 162px;
  height: 115px;
  left: 106px;
  top: 57px;
  margin-top: 30%;
  margin-left: 25%;
`;
const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;
// const TopBox = styled(WhiteBox)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   padding: 35px 40px 25px 40px;
//   margin-bottom: 10px;

//   h1 {
//     color: #333333;
//   }
//   button {
//     border: none;
//     width: 130px;
//     height: 30px;
//     border-radius: 10px;
//     background-color: gray;
//     color: white;
//     font-weight: 800;
//     font-size: 15px;
//     cursor: pointer;
//   }
// `;
