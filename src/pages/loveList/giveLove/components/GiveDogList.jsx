import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import Profile from "../../Profile";

const GiveDogList = () => {
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const Authorization = sessionStorage.getItem("accessToken");

  const fetchList = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/loves/sent`, {
      headers: {
        Authorization,
      },
    });
    setDogs(data);
    console.log(data);
    setLoading(false);
    setHasMore(data.length !== 0);
    if (data.length !== 0) {
      setPage((num) => num + 1);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchList();
  }, [loading, fetchList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //좋아요 모달
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <Container>
      <StOnePage>
        <OneDog>
          {dogs.map(({ userId, dogName, dogSex, imageUrl }) => (
            <Stgroup key={userId}>
              <StDog style={{ backgroundImage: `url(${imageUrl})` }} />
              {dogSex === "female" ? <StName> {dogName}</StName> : <StName> {dogName}</StName>}
              <StProfile onClick={showModal}>프로필</StProfile>
              {modalOpen && (
                <Profile dogId={dogs.dogId} dogName={dogs.dogName} setModalOpen={setModalOpen} />
              )}
            </Stgroup>
          ))}
        </OneDog>
        <div ref={observer} />
      </StOnePage>
    </Container>
  );
};
export default GiveDogList;

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
  width: 180px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

const StProfile = styled.button`
  width: 80px;
  height: 30px;
  font-weight: 700;
  background-color: transparent;
  /* border-radius: 4px; */
  border: 2px solid gray;
  cursor: pointer;
  &:hover {
    background-color: #eea400;
    transition: 0.2s;
    color: white;
  }
`;
