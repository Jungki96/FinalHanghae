import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  addMessage,
  getMessage,
  memberInfo,
  getChatRoom,
} from "../../redux/modules/chatSlice";

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  // const [chatname, setchatname] = useState(users.nickName);

  const headers = {
    Authorization: localStorage.getItem("authorization"),
    "Refresh-Token": localStorage.getItem("refresh-Token"),
  };

  const socket = new SockJS("https://midcon.shop/ws-stomp");
  const client = Stomp.over(socket);

  const chatList = useSelector((state) => state.chat.chat);
  const users = useSelector((state) => state.chat.users);
  const chatRoom = useSelector((state) => state.chat.chatRoom);

  console.log(chatList);

  useEffect(() => {
    onConneted();
    return () => {
      onConneted();
    };
  }, []);

  // 방정보 가져오기
  useEffect(() => {
    dispatch(getChatRoom());
  }, []);

  //이전 채팅 내용 가져오기
  useEffect(() => {
    dispatch(getMessage(id));
  }, []);

  //멤버 상세
  useEffect(() => {
    dispatch(memberInfo());
  }, []);

  // 채팅 엔터키/shif+enter 막기
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      window.scrollTo(0, 0);
      sendMessage();
    }
  };

  // 채팅방 이름
  const room = chatRoom.filter((x) => x.id === id);

  //시간
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();
  const createdAt = `${hours}-${minutes}-${seconds}-${milliseconds}`;
  // console.log(createdAt)

  // useEffect(() => {
  //   sendMessage
  // },[])

  //연결&구독 // 방입장
  function onConneted() {
    //useEffect가 실행되면 onConneted가 호출되고
    try {
      // sock이라면 url에대해 구독을 해야만 상대방에게 메시지를 보낼 수 있고,
      // 우리가 사용하는 socketjs에서는 채팅의 ip를 파악해서 ip가 맞으면 채팅방 입장이 가능하다.
      client.connect(headers, () => {
        // 소켓서버를 호출하고 header에 토큰을 확인한다

        client.subscribe(
          `/sub/chat/room`,
          (data) => {
            const newMessage = JSON.parse(data.body); //JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
            dispatch(addMessage(newMessage));
            //console.log(newMessage, '<<<<<<<<');
          },
          headers
        );
      });
    } catch (error) {}
  }
  //메시지 보내기
  const sendMessage = () => {
    client.send(
      "/pub/chat/message",
      headers,
      JSON.stringify({
        type: "TALK",
        memberId: users.memberId,
        roomId: id,
        name: room[0]?.name,
        message: message,
        sender: users.nickName,
        createdAt: createdAt,
      })
    );
    setMessage("");
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <HeaderBox>
          <IoChevronBackSharp
            onClick={() => {
              navigate("/chatList");
            }}
          />
          <ChatName>{room[0]?.name}</ChatName>
        </HeaderBox>

        {/* 나의 채팅 */}
        {chatList.map((chat, idx) => {
          if (chat.memberId === users.memberId) {
            return (
              <ChatsBox2 key={idx}>
                <div>
                  <MyChat>{chat.message}</MyChat>
                </div>
              </ChatsBox2>
            );
          }
          if (chat.memberId != users.memberId) {
            return (
              <ChatsBox>
                <ProBox>
                  <PorImg src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg" />
                </ProBox>
                <div>
                  <UserName>나는 상대방</UserName>
                  <UserChat>{chat.message}</UserChat>
                </div>
              </ChatsBox>
            );
          }
        })}
      </ContentWrapper>

      <Footer>
        <Textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Butdiv>
          <Button onClick={sendMessage}>전송</Button>
        </Butdiv>
      </Footer>
    </Wrapper>
  );

  // } else {
  //   return null;
  // }
};

export default ChatRoom;

const HeaderBox = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #a2b6c7;
`;

const ChatsBox = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const ChatsBox2 = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  width: 100%;
  height: 70px;
  justify-content: end;
`;

const ChatName = styled.h3`
  display: flex;
  margin: auto;
  margin-left: 15px;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 15px;
  display: flex;
  margin: auto;
  margin-left: 10px;
  align-items: center;
`;
const UserChat = styled.div`
  margin: 5px auto;
  border-radius: 8px;
  display: inline-block;
  align-items: center;
  margin-left: 10px;
  font-size: 13px;
  padding: 7px;
  background-color: yellow;
`;

const MyChat = styled.div`
  margin: 5px auto;
  margin-right: 10px;
  border-radius: 8px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 7px;
  justify-content: right;
  background-color: yellow;
`;
const ProBox = styled.div`
  border-radius: 18px;
  width: 100%;
  max-width: 50px;
  height: 100%;
  max-height: 50px;
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 800;
  background-color: #b2c7d9;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 1800px;
  border: none;
  height: 80px;
  outline: none;
  resize: none;
  margin: 10px;
`;

const Butdiv = styled.div`
  width: 100%;
  max-width: 100px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 70px;
  height: 50px;
  margin: 10px;
  border: none;
  background-color: yellow;
`;
const PorImg = styled.img`
  width: 100%;
  max-width: 50px;
  height: 100%;
  max-height: 50px;
  border-radius: 18px;
`;
