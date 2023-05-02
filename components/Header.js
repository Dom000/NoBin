import React, { useEffect, useState } from "react";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import { AiFillMessage, AiOutlineSearch } from "react-icons/ai";
import Button from "./common/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import {
  handleUserDetails,
  handleUserLogin,
  handleUserMessage,
  handleUserPost,
} from "../features/nobinslice";
import { MdAssignmentAdd } from "react-icons/md";

function Header() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const userChatList = useSelector((state) => state.nobin?.userMessage);

  const isUserLogedin = useSelector((state) => state.nobin?.isLogedIn);
  const [change, setChange] = useState(false);
  const changePosition = 30;
  let position = useWindowScrollPosition();

  useEffect(() => {
    if (position.y > changePosition && !change) {
      setChange(true);
    }

    if (position.y <= changePosition && change) {
      setChange(false);
    }
  });

  // function to handle user logout event
  const logout = () => {
    router.push("/login");
    dispatch(handleUserDetails(null));
    dispatch(handleUserLogin(false));
    dispatch(handleUserPost([]));
    dispatch(handleUserMessage([]));
    enqueueSnackbar("logged out", {
      variant: "info",
    });
  };
  return (
    <div
      className={
        change
          ? " p-3 md:p-5 z-10 bg-[#111111] fixed w-full space-x-3 shadow-lg transition-all opacity-95 flex justify-between"
          : "p-3 md:p-5 z-10 flex justify-between space-x-3 transition-all fixed w-full "
      }
    >
      <Link href={"/"}>
        <img
          src="/img/logo2.png"
          alt="icon"
          className="visible w-32 mt-1 object-contain  md:w-56 px-1 md:px-5 border-l-4 border-l-NoBingreen"
        />
      </Link>

      <div className="relative hidden md:flex items-center">
        <div className="absolute bg-white rounded-md right-2 px-3 py-1">
          <AiOutlineSearch className={" text-lg"} />
        </div>
        <input className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-full " />
      </div>
      <div
        className={
          isUserLogedin
            ? "flex md:justify-between space-x-6 md:space-x-20  "
            : "flex md:justify-between space-x-3  "
        }
      >
        {isUserLogedin && (
          <BiLogIn
            onClick={logout}
            className="text-3xl cursor-pointer  text-red-600"
          />
        )}
        {isUserLogedin && (
          <Link href={"/make_post"}>
            <MdAssignmentAdd
              className={
                change
                  ? "text-white text-3xl cursor-pointer"
                  : "text-3xl cursor-pointer "
              }
            />
          </Link>
        )}
        {isUserLogedin ? (
          <Link href={"/profile"}>
            <FaUserTie
              className={
                change
                  ? "text-white  text-[27px] cursor-pointer"
                  : "text-[27px] cursor-pointer "
              }
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button
              text={"Login "}
              className={"bg-NoBingreen hover:bg-NoBingreen/40"}
            />
          </Link>
        )}
        {isUserLogedin ? (
          <Link href={"/messages"} className="relative">
            <AiFillMessage
              className={
                change
                  ? "text-white text-3xl cursor-pointer"
                  : "text-3xl cursor-pointer "
              }
            />
            {userChatList.length > 1 && (
              <span className="absolute h-2 w-2 rounded-full top-1 right-0 animate-pulse bg-red-500"></span>
            )}
          </Link>
        ) : (
          <Link href={"/register"}>
            <Button
              text={"Register "}
              className={"bg-NoBingreen hover:bg-NoBingreen/40"}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
