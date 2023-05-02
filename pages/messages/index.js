import React from "react";
import { ImFilesEmpty } from "react-icons/im";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

function index() {
  const userChatList = useSelector((state) => state.nobin?.userMessage);
  const userDetails = useSelector((state) => state.nobin?.userDetails);
  return (
    <div className="flex space-x-5 p-5">
      {" "}
      <div
        className={
          userChatList.length == 0
            ? "rounded-lg border mb-8 md:mb-0 shadow-lg w-full md:w-[30%] h-[400px] max-h-[350px] overflow-x-auto flex flex-col justify-center items-center p-3 md:p-5"
            : "rounded-lg border mb-8 md:mb-0 shadow-lg w-full md:w-[30%] h-[400px] max-h-[350px] overflow-x-auto flex-col  p-3 md:p-5"
        }
      >
        {userChatList.length == 0 ? (
          <p>Your chatList will appear here</p>
        ) : (
          userChatList.map((mesg, item) => (
            <div
              key={item}
              className=" p-1 rounded-md cursor-pointer flex justify-between space-x-2 w-full hover:bg-slate-200"
            >
              <div className="flex justify-center items-center ">
                <FaUserCircle className="text-3xl" />
              </div>
              <div className="w-full">
                <div className="flex justify-between ">
                  <b>
                    {mesg.User.id == userDetails.id
                      ? mesg.senderId
                      : mesg.User.username}
                  </b>
                  <small>1:0pm</small>
                </div>
                <div className="">
                  <i>{mesg.chats[0].text}</i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="rounded-lg border mb-8 md:mb-0 shadow-lg w-full md:w-[70%] flex flex-col justify-center items-center p-3 md:p-5">
        <div className="space-y-3 flex justify-center items-center flex-col">
          <ImFilesEmpty className="text-4xl " />
          <p className="text-center">No Recent Messages yet</p>
        </div>{" "}
      </div>
    </div>
  );
}

export default index;
