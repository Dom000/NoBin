import Link from "next/link";
import React, { useState } from "react";
import Button from "../components/common/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleUserDetails, handleUserLogin } from "../features/nobinslice";
import { useRouter } from "next/router";

function login() {
  // next navigation hooks
  const router = useRouter();

  // redux payload dispatcher
  const dispatch = useDispatch();

  // snackbar hooks
  const { enqueueSnackbar } = useSnackbar();

  //  state to hols user inputes value during the login processes
  const [studentemail, setStudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // function to handle login function and validates user email before submition
  const handleLogin = async () => {
    setLoading(true);
    const validateEmail = studentemail.includes("@live.napier.ac.uk");
    if (validateEmail == false) {
      setLoading(false);
      enqueueSnackbar("Email most follow this standard @live.napier.ac.uk", {
        variant: "error",
      });
    } else if (password == "") {
      setLoading(false);
      enqueueSnackbar("password can't be empty", {
        variant: "error",
      });
    } else {
      await axios
        .post("/api/login", {
          password,
          student_email: studentemail,
        })
        .then((res) => {
          setLoading(false);
          dispatch(handleUserDetails(res.data.data));
          dispatch(handleUserLogin(true));
          enqueueSnackbar(`login success`, {
            variant: "success",
          });
          router.push("/profile");
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(`incorrect email`, {
            variant: "error",
          });
        });
    }
  };
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      {" "}
      <b className=" text-center text-xl pb-2">LOGIN</b>
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
            value={studentemail}
            onChange={(e) => {
              setStudentEmail(e.target.value.toLowerCase());
            }}
            type={"email"}
            placeholder="Student Email"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.toLocaleLowerCase());
            }}
            type={"password"}
            placeholder="password"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />

          <Button
            loading={loading}
            onClick={handleLogin}
            text={"Login "}
            className={"bg-NoBingreen  w-full hover:bg-NoBingreen/40"}
          />
        </div>
        <p>
          Not Registered?{" "}
          <Link href={"/register"}>
            <b>Create an Account</b>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default login;
