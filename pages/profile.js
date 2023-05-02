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
import Layout from "../components/Layout";

function profile() {
  // next navigation hooks
  const router = useRouter();

  // redux payload dispatcher
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.nobin?.userDetails);
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
      <div className="space-y-3 flex justify-center items-center flex-col">
        <ImFilesEmpty className="text-4xl " />
        <p className="text-center">No post yet,will you like to create one </p>
        <Link href={"/make_post"}>
          <Button
            icon={BsPlus}
            text={"create"}
            className={"bg-NoBingreen hover:bg-NoBingreen/40"}
          />
        </Link>
      </div>
    </div>
  );
}
profile.Layout = Layout;
export default profile;
