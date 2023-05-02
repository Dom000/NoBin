import React, { useEffect, useRef, useState } from "react";
import { MdLocalOffer, MdLocationOn } from "react-icons/md";
import Button from "./Button";
import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import refreshmessage from "../../lib/refreshmessages";

function Image({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const { description, images, location, title, created_at, id } = data;
  const [loaded, setLoaded] = useState(false);
  const [imageerror, setImageError] = useState(false);
  const imgref = useRef();
  const userDetails = useSelector((state) => state.nobin?.userDetails);
  // user loged in state from redux
  const islogedIn = useSelector((state) => state.nobin?.isLogedIn);
  console.log(islogedIn);
  useEffect(() => {
    imgref.current.complete && setLoaded(true);
  }, []);

  // function to send message to the poster
  const sendMessage = () => {
    console.log(data);
    if (data.postId == userDetails.id) {
      enqueueSnackbar("you cant reply to yourself");
    } else {
      axios
        .post("/api/send_message", {
          senderId: userDetails.id,
          recieverId: data.postId,
          text: "Hello i am intrested in this offer",
          image: data.images[0].url,
        })
        .then(async (res) => {
          console.log(res);
          enqueueSnackbar("message sent");
          await refreshmessage(userDetails.id).then((res) =>
            dispatch(handleUserMessage(res.data))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-slate-200 max-w-[350px] w-[320px] rounded-lg shadow-xl">
      <div className="flex justify-between space-x-3 p-3">
        <div className="flex justify-center space-x-3">
          <MdLocalOffer className="text-2xl  text-NoBingreen" />
          <b>OFFER</b>
        </div>
        <div className="flex justify-center space-x-3">
          <MdLocationOn className="text-2xl  text-red-500" />
          <p className="text-sm">
            {location.length > 15 ? location.substring(0, 28) : location}
          </p>
        </div>
      </div>
      <img
        onError={() => setImageError(true)}
        ref={imgref}
        src={imageerror ? "/img/call-to-action-bg.jpg" : images[0]?.url}
        alt="product"
        className={imageerror ? "blur" : "w-full h-[200px] object-cover"}
      />
      <div className="p-3 space-y-3">
        <div>
          <Link
            className="hover:text-NoBingreen hover:underline"
            href={`/item/${id}`}
          >
            <b className="pb-1">
              {title.length > 15 ? title.substring(0.2) : title}
            </b>
          </Link>

          <p className="text-sm">{description.substring(0.25)}</p>
        </div>
        {islogedIn ? (
          <div className=" flex justify-between">
            <Button
              onClick={sendMessage}
              text={"reply"}
              className={"bg-NoBingreen ring-black  hover:bg-NoBingreen/40"}
            />
            <div className=" flex space-x-3 text-gray-600 text-sm items-center">
              <BiTimeFive />
              <ReactTimeAgo date={created_at} locale="en-US" />
            </div>
          </div>
        ) : (
          <p className="text-red-400 underline">
            SignUp to reply to this offer
          </p>
        )}
      </div>
    </div>
  );
}

export default Image;
