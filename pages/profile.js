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
import { MdLocalOffer, MdLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import ReactTimeAgo from "react-time-ago";

function profile() {
  const [loaded, setLoaded] = useState(false);
  const [imageerror, setImageError] = useState(false);

  // next navigation hooks
  const router = useRouter();

  // redux payload dispatcher
  const dispatch = useDispatch();
  const userPost = useSelector((state) => state.nobin?.userPost);
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
    <div className=" ">
      {userPost.length == 0 ? (
        <div className="space-y-3 flex justify-center items-center flex-col">
          <ImFilesEmpty className="text-4xl " />
          <p className="text-center">
            No post yet,would you like to create one{" "}
          </p>
          <Link href={"/make_post"}>
            <Button
              icon={BsPlus}
              text={"create"}
              className={"bg-NoBingreen hover:bg-NoBingreen/40"}
            />
          </Link>
        </div>
      ) : (
        <div className="grid transition-all md:grid-cols-2 w-full overflow-y-auto max-h-[400px] lg:grid-cols-3 pt-10 gap-2">
          {userPost.map((item, index) => (
            <div className="bg-slate-200 w-full  md:w-[250px] rounded-lg shadow-xl">
              <div className="flex justify-between space-x-3 p-3">
                <div className="flex justify-center space-x-3">
                  <MdLocalOffer className="text-2xl  text-NoBingreen" />
                  <b className="text-sm">OFFER</b>
                </div>
                <div className="flex justify-center space-x-3">
                  <MdLocationOn className="text-2xl  text-red-500" />
                  <p className="text-sm">
                    {item.location.length > 15
                      ? item.location.substring(0, 20)
                      : item.location}
                  </p>
                </div>
              </div>
              <img
                onError={() => setImageError(true)}
                src={
                  imageerror
                    ? "/img/call-to-action-bg.jpg"
                    : item.images[0]?.url
                }
                alt="product"
                className={
                  imageerror ? "blur" : "w-full h-[150px] object-cover"
                }
              />
              <div className="p-3 space-y-3">
                <div>
                  <b className="pb-1">
                    {item.title.length > 15
                      ? item.title.substring(0.2)
                      : item.title}
                  </b>

                  <p className="text-sm">{item.description.substring(0.25)}</p>
                </div>
                <div className=" flex justify-between">
                  <Button
                    text={"Edit"}
                    className={"bg-red-500 ring-black  hover:bg-red-500/40"}
                  />
                  <div className=" flex space-x-3 text-gray-600 text-sm items-center">
                    <BiTimeFive />
                    <ReactTimeAgo date={item.created_at} locale="en-US" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
profile.Layout = Layout;
export default profile;
