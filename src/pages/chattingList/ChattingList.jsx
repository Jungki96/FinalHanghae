import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getChatList } from "../../redux/modules/chatListSlice";
import { useNavigate, useParams } from "react-router";
import Layout from "../../components/Layout";
import styled from "styled-components";
const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chatList.chatList);
  console.log(12345, chatList);
  console.log(12345555555555, chatList[0]?.roomId);

  useEffect(() => {
    dispatch(__getChatList());
  }, []);

  return (
    <Layout>
      <StWrDiv>
        상대방이 부적절한 메시지를 전송하는 경우
        <br />
        아랫쪽 신고 버튼을 이용해주세요.
      </StWrDiv>
      {chatList?.map((list, index) => (
        <div key={list.roomId}>
          <div
            onClick={() => {
              navigate(`/chattingdetail/${list.roomId}`);
            }}
          >
            <StDiv isGray={index % 2 === 1} isLast={index === chatList.length - 1}>
              <StMsDiv>
                {list?.nickname}님 {list?.message}
              </StMsDiv>
            </StDiv>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default ChatList;

const StWrDiv = styled.div`
  width: 374px;
  height: 50px;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  display: flex;
  align-items: center;
  color: #868686;
  justify-content: center;
  background: #f2f2f2;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0px 12px 20px;
  gap: 10px;
  background: ${(props) => (props.isGray ? "#dbdbdb" : "#ffffff")};
  width: 355px;
  height: 72px;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #dbdbdb")};
`;

const StMsDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
  padding: 0px;
  gap: 19px;
  width: 310px;
  height: 48px;
`;
