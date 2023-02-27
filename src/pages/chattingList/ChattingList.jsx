import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getChatList } from "../../redux/modules/chatListSlice";
import { useNavigate } from "react-router";
import Layout from "../../components/Layout";
const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chatList.chatList);
  console.log(12345, chatList);

  useEffect(() => {
    dispatch(__getChatList());
  }, []);

  return (
    <Layout>
      <div>
        {chatList?.map((list) => (
          <div>
            <div
              key={list.roomId}
              onClick={() => {
                navigate(`/chattingDetail/${list.roomId}`);
              }}
            >
              <div>
                <div>{list.nickname}</div>
                <div>{list.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ChatList;
