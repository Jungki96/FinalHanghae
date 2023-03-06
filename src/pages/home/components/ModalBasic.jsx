import styled from "styled-components";
import axios from "axios";

function ModalBasic({ setModalOpen, dogId, dogName, content, writer }) {
  const Authorization = sessionStorage.getItem("accessToken");
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFavoriteClick = () => {
    axios.post(
      `${process.env.REACT_APP_DOG}/match/love/${dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    // alert("좋아요를 눌렀습니다.");
    window.location.reload();
  };

  return (
    <BackGround>
      <Container>
        <Desc>
          <One>{dogName}와</One>
          <One>투게더 하시겠어요?</One>
        </Desc>
        <BtnGroup>
          <StButton onClick={() => handleFavoriteClick()}>네, 할래요!</StButton>
          <StButton onClick={closeModal}>좀 더 볼게요.</StButton>
        </BtnGroup>
      </Container>
    </BackGround>
  );
}
export default ModalBasic;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 모달창 크기 */
  width: 300px;
  height: 180px;
  /* 최상단 위치 */
  z-index: 999;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;

const BtnGroup = styled.div`
  display: flex;
  /* width: 200px; */
  justify-content: space-between;
  align-items: center;
`;

const One = styled.div`
  margin-bottom: 10px;
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #2f58ac;
    color: white;
  }
`;
