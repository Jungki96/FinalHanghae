import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { subMessage } from "../../redux/modules/socketSlice";
import Stomp from "stompjs";
import { __getChatListThunk, __postChatopenThunk } from "../../redux/modules/chattingSlice";
import Layout from "../../components/Layout";

const ChattingDetail = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const dispatch = useDispatch();

  //이전채팅 불러오기 및 채팅필요데이터
  useEffect(() => {
    dispatch(__getChatListThunk(roomId));
  }, [roomId]);

  const chatRef = useRef("");

  // 소켓 백엔드 서버가져오기

  const socket = new SockJS(`${process.env.REACT_APP_DOG}/ws-stomp`);
  const client = Stomp.over(socket);

  //토큰 얻어오기
  const headers = {
    Authorization: sessionStorage.getItem("accessToken"),
  };

  const { chatcollect } = useSelector((state) => state.chatcollect);
  const Myname = chatcollect[0]?.informDto?.nickname;
  const MyEmail = chatcollect[0]?.informDto?.email;

  const { messages } = useSelector((state) => state.messages);

  // 채팅 엔터키/shif+enter 막기
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      window.scrollTo(0, 0);
      // sendMessage();
    }
  };

  useEffect(() => {
    let subscription;

    // 소켓 연결
    const socket = new SockJS(`${process.env.REACT_APP_DOG}/ws-stomp`);
    const client = Stomp.over(socket);

    const headers = {
      Authorization: sessionStorage.getItem("accessToken"),
    };
    try {
      client.connect({}, () => {
        console.log(roomId);
        // 채팅방 구독
        subscription = client.subscribe(`/sub/chat/rooms/${roomId}`, (res) => {
          const receive = JSON.parse(res.body);
          dispatch(subMessage(receive));
        });
      });
    } catch (e) {
      console.log(e);
    }

    return () => {
      // 소켓 연결 종료 및 구독해제
      if (subscription) {
        subscription.unsubscribe();
      }
      client.disconnect(() => {
        console.log(`Disconnected from WebSocket for room ${roomId}`);
      });
    };
  }, [roomId]);

  //메시지 보내기
  const myChat = () => {
    const message = chatRef.current.value;

    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: roomId,
        sender: MyEmail, // 보내는 사용자의 이름 설정
        message: message,
      })
    );
    chatRef.current.value = "";
  };

  const scrollRef = useRef();

  useEffect(() => {
    // 메시지 초기화시 스크롤 이동
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <Layout>
      <StyledChatWindow>
        <Header />
        <BeforeChatHistory>
          {chatcollect[0]?.chats?.map((list, index) =>
            list.userNickname === Myname ? (
              <div key={index}>
                <MessageList
                  messageLength={list.message.length}
                  isMine={true} // 내가 보내는 메시지
                >
                  <span>{list?.message}</span>
                </MessageList>
              </div>
            ) : (
              <ReceivedMessage>
                <h4>{list?.userNickname}님</h4>
                <MessageList
                  messageLength={list.message.length}
                  isMine={false} // 상대방이 보내는 메시지
                >
                  <span>{list?.message}</span>
                </MessageList>
              </ReceivedMessage>
            )
          )}
        </BeforeChatHistory>
        <ChatHistory>
          {roomId && (
            <div ref={scrollRef}>
              {messages.map((message) =>
                message.userNickname === Myname ? (
                  <MessageList
                    messageLength={message.message.length}
                    isMine={true} // 내가 보내는 메시지
                  >
                    <span>{message.message}</span>
                  </MessageList>
                ) : (
                  <ReceivedMessage>
                    <h4>{message.userNickname}님</h4>
                    <MessageList
                      messageLength={message.message.length}
                      isMine={false} // 상대방이 보내는 메시지
                    >
                      <span>{message.message}</span>
                    </MessageList>
                  </ReceivedMessage>
                )
              )}
            </div>
          )}
        </ChatHistory>

        <ChatInput>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input type="text" ref={chatRef} onKeyDown={handleEnterPress} />
            <button onClick={myChat}>전송</button>
          </form>
        </ChatInput>
      </StyledChatWindow>
    </Layout>
  );
};

export default ChattingDetail;

const StyledChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 370px;
  height: 629px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const MessageList = styled.div`
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  max-width: 40%;
  word-break: break-all;
  display: flex;
  text-align: left;

  /* 글자 수에 따라 스타일 조정 */
  ${({ messageLength }) =>
    messageLength > 10 &&
    `
    height: auto;
    padding: 10px;
    white-space: pre-wrap;
  `}

  /* 내가 보내는 메시지 스타일 */
  ${({ isMine }) =>
    isMine
      ? `
      align-self: flex-end;
      background-color: #b2d8ff;
      color: #333;
      margin-left: auto;
    `
      : `
      /* 상대방이 보내는 메시지 스타일 */
      align-self: flex-start;
      background-color: #f5f5f5;
      color: #333;
      margin-right: auto;
    `}
`;
const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const ChatHistory = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  height: calc(100% - 200px);
  overflow-y: scroll;
  padding: 10px;
`;
const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #333;
  margin-right: 10px;
  transition: height 0.2s;
`;

const ReceivedMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  div {
    display: flex;
  }
`;

const BeforeChatHistory = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: calc(100% - 200px);
  overflow-y: scroll;
  padding: 10px;
`;
