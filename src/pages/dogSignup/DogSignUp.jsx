import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postDog } from "../../redux/modules/signupSlice";
import male from "../../assets/img/male.PNG";
import female from "../../assets/img/female.PNG";
import plusbutton from "../../assets/img/plusbutton.PNG";

import DogSignUpModal from "./dogSignUpComponents/DogSignUpModal";
import DogModalDetail from "./dogSignUpComponents/DogModalDetail";
import DogSignUpTop from "./dogSignUpComponents/DogSignUpTop";
import DogSignUpName from "./dogSignUpComponents/DogSignUpName";
import DogSignUpSex from "./dogSignUpComponents/DogSignUpSex";
import DogSignUpImage from "./dogSignUpComponents/DogSignUpImage";
import DogSignUpDetail from "./dogSignUpComponents/DogSignUpDetail";
import StartLayout from "../../components/StartLayout";

// 회원가입 form 컴포넌트
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 버튼 활성화를 위한 상태관리
  const [formstate, setFormState] = useState(false);
  const [dogSexState, setDogSexState] = useState(false);
  const [dogImagesState, setDogImagesState] = useState(false);
  const [dogDetailsState, setDogDetailsState] = useState(false);

  // 보낼 데이터 상태관리
  const [signData, setSignData] = useState({
    dogName: "",
    dogSex: "",
    images: "",
    dogDetails: "",
  });

  // 조건부 렌더링을 위한 상태관리
  const [signNumber, setSignNumber] = useState(0);

  // 파일 업로드를 위한 상태관리
  const [imageSrcs, setImageSrcs] = useState([]);
  const [imageSrcsText, setImageSrcsText] = useState([]);
  const [imageSrcs2, setImageSrcs2] = useState([]);
  const [imageSrcsText2, setImageSrcsText2] = useState([]);

  //next 버튼 조건
  const next = (e) => {
    // e.preventDefault();
    if (signNumber === 0) {
      // e.preventDefault();
      if (signData.dogName.length === 0 || signData.dogName.length > 5) {
        return;
      }
    }

    if (signNumber === 1) {
      let dogSexRadio = document.getElementsByName("dogSexRadio");
      let dogSex = "";
      dogSexRadio.forEach((e) => {
        if (e.checked) dogSex = e.value;
      });
      if (!dogSex) {
        return;
      }
      setDogImagesState(true);
      setSignData({ ...signData, dogSex: dogSex });
    }

    if (signNumber === 2) {
      if (imageSrcs.length == 0) {
        return;
      }
      setDogDetailsState(true);
      setSignData({ ...signData, images: imageSrcs });
    }

    if (signNumber === 3) {
    }

    setSignNumber((prevNumber) => prevNumber + 1);
  };

  //이미지파일 업로드 핸들러
  const handleChangeFile = (event) => {
    let imageSrcTemp = imageSrcs;
    let readers = [];
    for (let i = 0; i < event.target.files.length; i++) {
      readers.push(readFileAsText(event.target.files[i]));
      imageSrcTemp.push(event.target.files[i]);
    }
    Promise.all(readers).then((values) => {
      let imageTemp = imageSrcsText;
      values.forEach((value) => {
        imageTemp = [...imageTemp, value];
      });
      setImageSrcsText(imageTemp.splice(0, 1));
    });
    setImageSrcs(imageSrcTemp.splice(0, 1));
  };

  const handleChangeFile1 = (event) => {
    let imageSrcTemp = imageSrcs;
    let readers = [];
    for (let i = 0; i < event.target.files.length; i++) {
      readers.push(readFileAsText(event.target.files[i]));
      imageSrcTemp.push(event.target.files[i]);
    }
    Promise.all(readers).then((values) => {
      let imageTemp = imageSrcsText2;
      values.forEach((value) => {
        imageTemp = [...imageTemp, value];
      });
      setImageSrcsText2(imageTemp.splice(0, 1));
    });
    setImageSrcs2(imageSrcTemp.splice(0, 1));
  };

  const readFileAsText = (fileBlob) => {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(fileBlob);
    });
  };

  //합치는 코드(address로가는온클릭, 서브밋코드)
  const combinedHandler = async (event) => {
    event.preventDefault();
    if (signNumber === 3) {
      if (signData.dogDetails.length === 0 || signData.dogDetails.length > 20) {
        return;
      }
    }
    const checkState = dispatch(__postDog(signData));
    navigate("/newaddress");
  };

  //모달창 띄우기
  const [signup, setSignup] = useState(false);

  return (
    <StForm>
      {signNumber === 0 && (
        <StartLayout>
          <DogSignUpTop />
          <div>
            <StNum> ({signNumber + 1}/5)</StNum>
            <DogSignUpName></DogSignUpName>
            <StInput
              autoComplete="off"
              id="dogName"
              required
              placeholder="5글자 이내로 입력해주세요."
              onChange={(e) => {
                setSignData({ ...signData, dogName: e.target.value });
                setDogSexState(true);
              }}
            />
            <StBtnDiv>
              <StBackBtn onClick={() => setSignup(!signup)}>뒤로</StBackBtn>
              <StBtn className="on" onClick={next}>
                다음
              </StBtn>
            </StBtnDiv>

            {signup && (
              <DogSignUpModal closeModal={() => setSignup(!signup)}>
                <DogModalDetail />
              </DogSignUpModal>
            )}
          </div>
        </StartLayout>
      )}

      {signNumber === 1 && (
        <StartLayout>
          <DogSignUpTop />
          <div>
            <StNum> ({signNumber + 1}/5)</StNum>
            <DogSignUpSex></DogSignUpSex>
            <div>
              <StImg src={male} />
              <StImg src={female} />
              <StDiv4>
                <StDiv5>
                  <input
                    type="radio"
                    name="dogSexRadio"
                    value="Male"
                    defaultChecked
                  />
                  <label>남</label>
                </StDiv5>
                <StDiv6>
                  <input type="radio" name="dogSexRadio" value="Female" />
                  <label>여</label>
                </StDiv6>
              </StDiv4>
            </div>
            <StBtn className="on" onClick={next} disabled={!dogSexState}>
              다음
            </StBtn>
            <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
              뒤로
            </StBackBtn>
          </div>
        </StartLayout>
      )}

      {signNumber === 2 && (
        <div>
          <Container>
            <StNum> ({signNumber + 1}/5)</StNum>
            <DogSignUpImage></DogSignUpImage>
            <StDiv4>
              <div>
                <ImagePreviewContainer>
                  {(imageSrcsText || []).map((url) => (
                    <ImagePreview src={url} alt="..." />
                  ))}
                </ImagePreviewContainer>
                <InputContainer hasImage={imageSrcs.length > 0}>
                  <input
                    required
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChangeFile}
                    multiple
                  />
                  <StImg1 src={plusbutton} />
                </InputContainer>
              </div>
              <div>
                <ImagePreviewContainer>
                  {(imageSrcsText2 || []).map((url) => (
                    <ImagePreview src={url} alt="..." />
                  ))}
                </ImagePreviewContainer>
                <InputContainer hasImage={imageSrcs2.length > 0}>
                  <input
                    required
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChangeFile1}
                    multiple
                  />
                  <StImg1 src={plusbutton} />
                </InputContainer>
              </div>
            </StDiv4>
            <StBtn onClick={next} disabled={!imageSrcs}>
              다음
            </StBtn>{" "}
            <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
              뒤로
            </StBackBtn>
          </Container>
        </div>
      )}

      {signNumber === 3 && (
        <div>
          <StNum> (거의 다 왔어요!) </StNum>
          <DogSignUpDetail></DogSignUpDetail>
          <StTextarea
            autoComplete="off"
            id="dogDetails"
            placeholder=" 친구를 사귀는데에 큰 도움이 되니 
            최대한 자세히 적어주세요 :)"
            onChange={(e) => {
              setSignData({ ...signData, dogDetails: e.target.value });
            }}
          />
          <StBtn
            className="on"
            onClick={combinedHandler}
            disabled={!dogDetailsState}
          >
            다음
          </StBtn>

          <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
            뒤로
          </StBackBtn>
        </div>
      )}
    </StForm>
  );
}

export default SignUpForm;

const StDiv4 = styled.div`
  display: flex;
  flex-direction: row;
`;
const StDiv5 = styled.div`
  margin-left: 18%;
`;
const StDiv6 = styled.div`
  margin-left: 31%;
  margin-bottom: 25%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
const ImagePreview = styled.img`
  width: 118px;
  height: 160px;
  margin-right: 18px;
  margin-bottom: 20%;
  border-radius: 25px;
  border: 3px solid black;
`;
const InputContainer = styled.div`
  position: relative;
  width: 118px;
  height: 160px;
  border: 3px solid black;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-right: 18px;
  border-radius: 25px;
  align-items: center;
  display: ${(props) => (props.hasImage ? "none" : "flex")};
  margin-bottom: 30%;
  &:hover {
    cursor: pointer;
  }

  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
const StNum = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 36px;
`;
const StImg = styled.img`
  width: 108px;
  height: 96px;
  margin-left: 5%;
`;
const StImg1 = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  margin-left: 80px;
  margin-top: 120px;
`;
const StInput = styled.input`
  margin-left: 15px;
  width: 257px;
  height: 52px;
  background-color: white;
  border: 2px solid;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  &::placeholder {
    font-size: 16px;
    padding-left: 3px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const StTextarea = styled.textarea`
  width: 100%;
  height: 140px;
  border: 2px solid #000000;
  border-radius: 20px;
  margin-bottom: 20%;
  padding-left: 10px;
  padding-top: 15px;
  margin-left: -2%;
  &::placeholder {
    font-size: 12px;
    padding-top: 15px;
    padding-left: 5px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const StBtn = styled.button`
  width: 121px;
  height: 50px;
  margin-left: 20px;

  font-size: 16px;
  line-height: 23px;
  font-weight: 700;

  color: #ffffff;
  background: #2f58ac;
  border-radius: 60px;
`;

const StBackBtn = styled.button`
  width: 121px;
  height: 50px;
  margin-left: 16px;
  font-size: 16px;
  line-height: 23px;
  font-weight: 700;

  color: #ffffff;
  background: #aeaeb2;
  border-radius: 60px;
`;
const StBtnDiv = styled.div`
  margin-top: 52px;
  margin-right: 15px;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  background-color: #fff;

  padding: 0 26px;
  box-sizing: border-box;

  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;

  top: 0;
  left: 0;
`;
