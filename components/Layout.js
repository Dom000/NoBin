import React from "react";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const userDetails = useSelector((state) => state.nobin?.userDetails);
  const userPost = useSelector((state) => state.nobin?.userPost);

  return (
    <div className="flex flex-col md:flex-row md:space-x-9 p-6 ">
      <div className="rounded-lg border mb-8 md:mb-0 shadow-lg w-full md:w-[30%] flex flex-col justify-center items-center p-3 md:p-5">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
          alt="hro"
        />
        <div className="my-5 w-full space-y-3 ">
          <div className="flex justify-between space-x-5">
            <b className="text-sm">USER-NAME</b>
            <p>{userDetails?.username}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b className="text-sm">EMAIL</b>
            <p>{userDetails?.student_email}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b className="text-sm">POST</b>
            <p>{userPost?.length}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b className="text-sm">DATE-JOINED</b>
            <p>{new Date(userDetails?.created_at).toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border shadow-lg w-full md:w-[70%] flex flex-col justify-center p-5">
        {children}
      </div>
    </div>
  );
}

export default Layout;
