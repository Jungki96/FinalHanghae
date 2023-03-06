import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { __patchAddress } from "../../redux/modules/addessSlice";
import { useDispatch } from "react-redux";
import DogSignUpTop from "./dogSignUpComponents/DogSignUpTop";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Cong from "../../assets/img/cong.png";
import Cong2 from "../../assets/img/cong2.png";
import StartLayout from "../../components/StartLayout";
import Layout from "../../components/Layout";

const NewAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  //위도,경도,주소
  const [address, setAddress] = useState(null);
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
    navigate("/");
    window.location.reload();
  };

  return (
    <Layout title="설정">
      <StContainer>
        {signNumber === 0 && (
          <Wrapper>
            <AddForm>
              <DogSignUpTop />
              <StNum>(마지막이에요!)</StNum>
              {/* <span> 회원님의 주소를 설정해 주세요 </span>
              <span> 도로명 주소를 입력해 주세요!</span>
              <span> 예)강남대로(O),강남동(X)</span> */}
              {<DaumPostCode onComplete={handleComplete} />}
              {!modalState && (
                <div>
                  <AddressInput onClick={() => setIsOpen(true)} value={address} />
                  <StBtnDiv>
                    <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>뒤로</StBackBtn>
                    <StBtn type="submit" onClick={next}>
                      다음
                    </StBtn>
                  </StBtnDiv>
                </div>
              )}
            </AddForm>
          </Wrapper>
        )}
        {signNumber === 1 && (
          <Container>
            <StLogo src={Logo} />
            {/* <div>가입을 축하드려요!</div> */}
            <StLogo2 src={Cong} />
            <StBtn2 onClick={submitLogin}>{`얼른 가자멍!`}</StBtn2>
          </Container>
        )}
      </StContainer>
    </Layout>
  );
};

export default NewAddress;

const StBtnDiv = styled.div`
  display: flex;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
`;

const StNum = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-top: -80px;
`;

const Wrapper = styled.div`
  width: 300px;
`;

const AddressInput = styled.input`
  border-radius: 50px;
  margin-top: 30px;
  background-color: white;
  color: black;
  text-align: center;
  padding: 8px 0px;
  font-size: 10px;
  width: 200px;
  height: 30px;
  opacity: gray;
  padding: 5px 15px 5px 15px;
`;
const AddForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  font-size: 15px;
  width: 200px;
  height: 45px;
  opacity: gray;
`;
const StBtn2 = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 50px;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  font-size: 15px;
  width: 200px;
  height: 45px;
  opacity: gray;
`;

const StLogo = styled.img`
  width: 170px;
  height: 107px;
  margin-bottom: 30px;
`;
const StLogo2 = styled.img`
  width: 132px;
  height: 125px;
  margin-bottom: 30px;
`;
const Container = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;
