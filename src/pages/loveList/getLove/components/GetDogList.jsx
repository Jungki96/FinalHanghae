import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Like from "../../../../assets/img/LoveLike.png";
import Reject from "../../../../assets/img/LoveReject.png";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const Authorization = sessionStorage.getItem("accessToken");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/loves/received`, {
      headers: {
        Authorization,
      },
    });
    // setData((prevData) => [...prevData, ...data]);
    setData(data);
    setLoading(false);
    setHasMore(data.length !== 0);
    if (data.length !== 0) {
      setPage((num) => num + 1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchData();
  }, [loading, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //chatroom 으로 가야하는지 좋아요로 가야하는지?
  const onSubmitHandler = (id) => {
    axios.post(
      `${process.env.REACT_APP_DOG}/chat/rooms`,
      //`${process.env.REACT_APP_DOGS}/chat/rooms`,
      { userId: id },
      {
        headers: {
          Authorization,
        },
      }
    );
  };
  const onLoveSubmitHandler = (id) => {
    axios.post(
      `${process.env.REACT_APP_DOG}/loves/accept/${id}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
  };

  function handleButtonClick(userId, dogId) {
    onSubmitHandler(dogId);
    onLoveSubmitHandler(userId);
  }

  const onRejectHandler = (dogId) => {
    axios.post(
      `${process.env.REACT_APP_DOG}/loves/reject/${dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    console.log(dogId);
  };

  const onWatchProfile = (userId) => {};
  return (
    <Container>
      <StOnePage>
        <OneDog>
          {data.map(({ imageUrl, dogName, userId, dogSex, dogId }) => (
            <Stgroup key={userId}>
              <StDog style={{ backgroundImage: `url(${imageUrl})` }}></StDog>
              {dogSex === "female" ? <StName> {dogName}</StName> : <StName> {dogName}</StName>}
              <StBtnGroup>
                <StProfile onClick={() => onWatchProfile(userId)}>프로필</StProfile>
                <StBtn
                  src={Like}
                  onClick={() => {
                    handleButtonClick(dogId, userId);
                  }}
                />
                <StBtn
                  src={Reject}
                  onClick={() => {
                    onRejectHandler(dogId);
                  }}
                />
              </StBtnGroup>
            </Stgroup>
          ))}
        </OneDog>

        <div ref={observer} />
      </StOnePage>
    </Container>
  );
};

export default InfiniteScroll;

const Container = styled.div`
  margin-top: 30px;
`;
const StOnePage = styled.div``;

const OneDog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;
const Stgroup = styled.div`
  display: flex;
  align-items: center;
`;

const StDog = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-radius: 30px;
  background-size: cover;
  background-position: center;
  /* box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3); */
`;

const StName = styled.h3`
  width: 100px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

const StBtnGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StProfile = styled.button`
  width: 80px;
  height: 30px;
  background-color: transparent;
  font-weight: 700;
  /* border-radius: 4px; */
  border: 2px solid gray;
  cursor: pointer;
  &:hover {
    background-color: #eea400;
    transition: 0.2s;
    color: white;
  }
`;
const StBtn = styled.img`
  width: 30px;
  height: 30px;
  font-weight: 700;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e1e1e1;
    transition: 0.2s;
    color: white;
  }
`;
