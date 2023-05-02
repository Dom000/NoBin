import Link from "next/link";
import React, { useState } from "react";
import Button from "../components/common/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";

function register() {
  // next navigation hooks
  const router = useRouter();

  // snackbar hooks
  const { enqueueSnackbar } = useSnackbar();

  // states for collecting user typed datas from form
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [student_email, setStudent_email] = useState("");
  const [loading, setLoading] = useState(false);

  // function to handle user registeration and validate form fields before registeration

  const handleRegister = async () => {
    setLoading(true);
    const validateEmail = student_email.includes("@live.napier.ac.uk");

    if (
      password == "" ||
      confirmpassword == "" ||
      username == "" ||
      student_email == ""
    ) {
      enqueueSnackbar("All fields are required", {
        variant: "error",
      });
      setLoading(false);
    } else if (validateEmail == false) {
      enqueueSnackbar("Email most follow this standard @live.napier.ac.uk", {
        variant: "error",
      });
      setLoading(false);
    } else if (password !== confirmpassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
      setLoading(false);
    } else {
      axios
        .post("/api/signup", {
          username,
          password,
          student_email,
        })
        .then((res) => {
          setLoading(false);
          if (res.data) {
            router.push("/login");
            enqueueSnackbar("registeration success kindly login", {
              variant: "success",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(`email or username is aleady taken,try another`, {
            variant: "error",
          });
        });
    }
  };
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
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            type={"text"}
            placeholder="Username"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            value={student_email}
            onChange={(e) => setStudent_email(e.target.value.toLowerCase())}
            type={"email"}
            placeholder="Student Email"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value.toLowerCase())}
            type={"password"}
            placeholder="Password"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          <input
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value.toLowerCase())}
            type={"password"}
            placeholder="Confirm password"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />

          <Button
            onClick={handleRegister}
            loading={loading}
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
