import React, { useEffect, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import refreshmessage from "../../lib/refreshmessages";
import { handleUserMessage } from "../../features/nobinslice";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";
import { useSnackbar } from "notistack";

function index() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const userChatList = useSelector((state) => state.nobin?.userMessage);
  const userDetails = useSelector((state) => state.nobin?.userDetails);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [activechat, setActivechat] = useState(null);

  console.log(activechat);
  useEffect(() => {
    const refresh = async () => {
      await refreshmessage(userDetails.id).then((res) =>
        dispatch(handleUserMessage(res.data))
      );
    };
    refresh();
  }, [sent]);

  const handleSendChat = async () => {
    const newmessage = {
      senderId: userDetails.id,
      recieverId: activechat.recieverId,
      text: text,
      image: null,
    };

    if (text == "") {
      null;
    } else {
      const latesActiveChat = activechat;
      let arg = [...latesActiveChat.chats, newmessage];
      setActivechat({ ...latesActiveChat, chats: arg });
      await axios
        .post(`/api/reply_message/${activechat.id}`, newmessage)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("message sent");
          setSent(!sent);
          setText("");
        });
    }
  };
  return (
    <>
      <div className="hidden md:flex space-x-5 p-5">
        <div
          className={
            userChatList.length == 0
              ? "rounded-lg border hidden mb-8 md:mb-0 shadow-lg w-full md:w-[30%] h-[400px] max-h-[350px] overflow-y-auto md:flex flex-col justify-center items-center p-3 md:p-5"
              : "rounded-lg border hidden md:flex mb-8 md:mb-0 shadow-lg w-full md:w-[30%] h-[400px] max-h-[350px] overflow-y-auto flex-col  p-3 md:p-5"
          }
        >
          {userChatList.length == 0 ? (
            <p>Your chatList will appear here</p>
          ) : (
            userChatList.map((mesg, idx) => (
              <div
                onClick={() => setActivechat(mesg)}
                key={idx}
                className=" p-1 rounded-md cursor-pointer flex justify-between space-x-2 w-full hover:bg-slate-200"
              >
                <div className="flex justify-center items-center ">
                  <FaUserCircle className=" text-2xl md:text-3xl" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between ">
                    <b className="text-xs md:text-sm">
                      {mesg.senderId == userDetails.id
                        ? mesg.recieverId
                        : mesg.User.username}
                    </b>
                    <small>--</small>
                  </div>
                  <div className="">
                    <i className="text-xs md:text-sm">
                      {mesg.chats[mesg.chats.length - 1].text}
                    </i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="rounded-lg hidden  border mb-8 md:mb-0 shadow-lg w-full md:w-[70%] md:flex flex-col justify-center items-center p-3 md:p-5">
          {activechat == null ? (
            <div className="space-y-3 flex justify-center items-center flex-col">
              <ImFilesEmpty className="text-4xl " />
              <p className="text-center">No Recent Messages yet</p>
            </div>
          ) : (
            <>
              <div className="h-[300px] max-h-[350px] w-full relative  flex-col  p-3 md:p-5">
                <b className="hover:underline flex md:hidden">Back</b>
                <div className="w-full h-[300px] overflow-y-auto pb-20">
                  {activechat.chats.map((mss, id) => (
                    <div
                      className={
                        mss.senderId == userDetails.id
                          ? "flex justify-end items-end "
                          : "flex justify-start items-start "
                      }
                    >
                      <div
                        className={
                          mss.senderId == userDetails.id
                            ? "rounded-md bg-slate-300 m-2 p-2"
                            : "rounded-md bg-NoBingreen/30 m-2 p-2"
                        }
                      >
                        <p>{mss.text}</p>
                        {mss.image !== null && (
                          <img
                            src={mss.image}
                            alt="attch"
                            className="w-32 rounded-md pt-1"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3 absolute left-0 bottom-0  w-full bg-white">
                  <input
                    onChange={(e) => setText(e.target.value)}
                    placeholder="reply messages"
                    className=" px-2 py-1 focus:outline-NoBingreen border-2 border-black/40 rounded-md w-4/5 "
                  />
                  <RiSendPlaneFill
                    onClick={handleSendChat}
                    className="text-4xl text-NoBingreen cursor-pointer hover:text-NoBingreen/30"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" block md:hidden p-5">
        {activechat == null ? (
          <div
            className={
              userChatList.length == 0
                ? "rounded-lg border mb-8 md:mb-0 shadow-lg w-full h-[400px] max-h-[350px] overflow-y-auto md:flex flex-col justify-center items-center p-3 md:p-5"
                : "rounded-lg border  mb-8 md:mb-0 shadow-lg w-full h-[400px] max-h-[350px] overflow-y-auto flex-col  p-3 md:p-5"
            }
          >
            {userChatList.length == 0 ? (
              <p>Your chatList will appear here</p>
            ) : (
              userChatList.map((mesg, idx) => (
                <div
                  onClick={() => setActivechat(mesg)}
                  key={idx}
                  className=" p-1 rounded-md my-3 cursor-pointer flex justify-between space-x-2 w-full hover:bg-slate-200"
                >
                  <div className="flex justify-center items-center ">
                    <FaUserCircle className=" text-2xl md:text-3xl" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between ">
                      <b className="text-xs md:text-sm">
                        {mesg.senderId == userDetails.id
                          ? mesg.recieverId
                          : mesg.User.username}
                      </b>
                      <small>--</small>
                    </div>
                    <div className="">
                      <i className="text-xs md:text-sm">
                        {mesg.chats[mesg.chats.length - 1].text}
                      </i>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="rounded-lg md:hidden  border mb-8 md:mb-0 shadow-lg w-full justify-center items-center ">
            {activechat == null ? (
              <div className="space-y-3 flex justify-center items-center flex-col">
                <ImFilesEmpty className="text-4xl " />
                <p className="text-center">No Recent Messages yet</p>
              </div>
            ) : (
              <>
                <div className="h-[350px] max-h-[350px] w-full relative  flex-col  p-3 md:p-5">
                  <b
                    onClick={() => setActivechat(null)}
                    className="hover:underline flex md:hidden"
                  >
                    Back
                  </b>
                  <div className="w-full h-[300px] overflow-y-auto pb-20">
                    {activechat.chats.map((mss, id) => (
                      <div
                        className={
                          mss.senderId == userDetails.id
                            ? "flex justify-end items-end "
                            : "flex justify-start items-start "
                        }
                      >
                        <div
                          className={
                            mss.senderId == userDetails.id
                              ? "rounded-md bg-slate-300 m-2 p-2"
                              : "rounded-md bg-NoBingreen/30 m-2 p-2"
                          }
                        >
                          <p>{mss.text}</p>
                          {mss.image !== null && (
                            <img
                              src={mss.image}
                              alt="attch"
                              className="w-32 rounded-md pt-1"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3 absolute left-0 bottom-0 p-2 w-full bg-white">
                    <input
                      onChange={(e) => setText(e.target.value)}
                      placeholder="reply messages"
                      className=" px-2 py-1 focus:outline-NoBingreen border-2 border-black/40 rounded-md w-4/5 "
                    />
                    <RiSendPlaneFill
                      onClick={handleSendChat}
                      className="text-4xl text-NoBingreen cursor-pointer hover:text-NoBingreen/30"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default index;
