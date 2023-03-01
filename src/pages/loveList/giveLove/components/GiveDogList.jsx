import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

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

  const sliceData = dogs.slice(0, page * 2);

  return (
    <Container>
      <StOnePage>
        {sliceData.map((notuse, id) => {
          if (id % 2 === 0) {
            const group = sliceData.slice(id, id + 2);
            return (
              <OneDog key={id}>
                {group.map(({ userId, dogName, dogSex, imageUrl }) => (
                  <Stgroup key={userId}>
                    <StDog style={{ backgroundImage: `url(${imageUrl})` }}>
                      {dogSex === "female" ? (
                        <StName> {dogName} (여)</StName>
                      ) : (
                        <StName> {dogName} (남)</StName>
                      )}
                    </StDog>
                    <Space />
                  </Stgroup>
                ))}
              </OneDog>
            );
          }
          return null;
        })}
        <div ref={observer} />
      </StOnePage>
    </Container>
  );
};
export default GiveDogList;

const Container = styled.div`
  margin-top: 30px;
`;

const Stgroup = styled.div`
  display: flex;
  align-items: center;
`;

const StOnePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const StDog = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: medium;
  bottom: 30px;
  color: beige;
`;

const OneDog = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 375px;
`;
const Space = styled.div`
  margin-top: -15vh;
  display: flex;
  z-index: 1;
`;
