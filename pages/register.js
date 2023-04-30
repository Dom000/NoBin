import Link from "next/link";
import React from "react";
import Button from "../components/common/Button";

function register() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      {" "}
      <b className=" text-center text-xl pb-2">REGISTER</b>
      <div className="bg-slate-400 flex justify-center w-[150px] h-0.5 mb-8">
        <div className="bg-NoBingreen w-16 h-0.5"></div>
      </div>
      <div className="rounded-lg border shadow-lg w-full md:w-[40%] flex flex-col justify-center items-center p-5">
        <img
          className="w-40 h-40 rounded-full object-cover"
          src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
          alt="hro"
        />
        <div className="my-5 w-full space-y-3 flex flex-col items-center justify-center">
          <input
            type={"text"}
            placeholder="Username"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            type={"email"}
            placeholder="Student Email"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            type={"password"}
            placeholder="Password"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            type={"password"}
            placeholder="Confirm password"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />

          <Button
            text={"Register"}
            className={"bg-NoBingreen  w-full hover:bg-NoBingreen/40"}
          />
        </div>
        <p className="text-center">
          By clicking <b>"Register"</b> you are agree to our{" "}
          <Link href={"privacy"}>
            <b className="text-NoBingreen">Terms of Service and Condition</b>{" "}
            and our<b className="text-NoBingreen"> Policy</b>.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default register;
