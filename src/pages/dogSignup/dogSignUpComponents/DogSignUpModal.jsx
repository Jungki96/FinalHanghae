import React from "react";
import styled from "styled-components";

function DogSignUpModal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <ModalBg onClick={closeModal}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalCloseBtn onClick={closeModal}>✖</ModalCloseBtn>
        {props.children}
      </ModalBody>
    </ModalBg>
  );
}

export default DogSignUpModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  position: absolute;
  width: 190px;
  height: 100px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.721);
  background-color: transparent;
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
`;
