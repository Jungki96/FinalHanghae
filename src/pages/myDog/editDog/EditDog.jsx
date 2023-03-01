import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>미구현 기능입니다 ㅠㅠ</div>
    </>
  );
};
export default EditDog;
