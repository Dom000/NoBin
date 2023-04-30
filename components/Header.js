import React, { useEffect, useState } from "react";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "./common/Button";

function Header() {
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
  return (
    <div
      className={
        change
          ? "p-5 bg-[#111111] fixed w-full shadow-lg transition-all opacity-95 flex justify-between"
          : "p-5  flex justify-between  transition-all fixed w-full "
      }
    >
      <img
        src="/img/logo2.png"
        alt="icon"
        className="w-56 px-5 border-l-4 border-l-NoBingreen"
      />
      <div className="relative flex items-center">
        <div className="absolute bg-white rounded-md right-2 px-3 py-1">
          {" "}
          <AiOutlineSearch className=" text-lg" />
        </div>
        <input className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-full " />
      </div>
      <div className="flex justify-between space-x-3">
        <Button
          text={"Login "}
          className={"bg-NoBingreen hover:bg-NoBingreen/40"}
        />
        <Button
          text={"Register "}
          className={"bg-NoBingreen hover:bg-NoBingreen/40"}
        />
      </div>
    </div>
  );
}

export default Header;