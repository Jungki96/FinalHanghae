import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const Authorization = sessionStorage.getItem("accessToken");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_DOG}/loves/received`, {
      headers: {
        Authorization,
      },
    });
    // setData((prevData) => [...prevData, ...res.data]);
    setData(res.data);
    console.log(res.data);
    setLoading(false);
    setHasMore(res.data.length !== 0);
    if (res.data.length !== 0) {
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

  const sliceData = data.slice(0, page * 3);

  //chatroom 으로 가야하는지 좋아요로 가야하는지?
  const onSubmitHandler = (id) => {
    axios.post(`${process.env.REACT_APP_DOG}/chat/room`, id, {
      headers: {
        Authorization,
      },
    });
  };
  const onRejectHandler = (id) => {
    axios.post(`${process.env.REACT_APP_DOG}//match/reject/${id}`, {
      headers: {
        Authorization,
      },
    });
  };

  return (
    <>
      <Container>
        <StOnePage>
          {sliceData.map((why, id) => {
            if (id % 2 === 0) {
              const group = sliceData.slice(id, id + 2);
              return (
                <OneDog key={id}>
                  {group.map(({ imageUrl, dogName, userId, dogSex }) => (
                    <Stgroup>
                      <StDog style={{ backgroundImage: `url(${imageUrl})` }} key={userId}>
                        {dogSex === "female" ? (
                          <StName> {dogName} (여)</StName>
                        ) : (
                          <StName> {dogName} (남)</StName>
                        )}
                      </StDog>
                      <br />
                      <div>
                        <button
                          onClick={() => {
                            onSubmitHandler(id);
                          }}
                        >
                          수락
                        </button>
                        <button
                          onClick={() => {
                            onRejectHandler(id);
                          }}
                        >
                          거절
                        </button>
                      </div>
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
    </>
  );
};

export default InfiniteScroll;

const Container = styled.div`
  margin-top: 5vh;
`;

const StOnePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const Stgroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StDog = styled.div`
  position: relative;
  width: 14vh;
  height: 20vh;
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
  background-color: black;
  color: #ffffff;
`;

const OneDog = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80vh;
`;
