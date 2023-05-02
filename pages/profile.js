import Link from "next/link";
import React, { useState } from "react";
import Button from "../components/common/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleUserDetails, handleUserLogin } from "../features/nobinslice";
import { useRouter } from "next/router";
import { ImFilesEmpty } from "react-icons/im";
import { BsPlus } from "react-icons/bs";

function profile() {
  // next navigation hooks
  const router = useRouter();

  // redux payload dispatcher
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.nobin?.userDetails);
  console.log(userDetails);
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
          enqueueSnackbar(`${err.message}`, {
            variant: "error",
          });
        });
    }
  };
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
            <b>USER-NAME</b>
            <p>{userDetails?.username}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b>EMAIL</b>
            <p>{userDetails?.student_email}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b>POST</b>
            <p>{userDetails?.post.length}</p>
          </div>
          <div className="flex justify-between space-x-5">
            <b>DATE-JOINED</b>
            <p>{new Date(userDetails?.created_at).toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border shadow-lg w-full md:w-[70%] flex flex-col justify-center items-center p-5">
        <div className="space-y-3 flex justify-center items-center flex-col">
          <ImFilesEmpty className="text-4xl " />
          <p className="text-center">
            No post yet,will you like to create one{" "}
          </p>
          <Button
            icon={BsPlus}
            text={"create"}
            className={"bg-NoBingreen hover:bg-NoBingreen/40"}
          />
        </div>
      </div>
    </div>
  );
}

export default profile;
