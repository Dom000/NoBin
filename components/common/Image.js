import React, { useEffect, useRef, useState } from "react";
import { MdLocalOffer, MdLocationOn } from "react-icons/md";
import Button from "./Button";
import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";

function Image({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [imageerror, setImageError] = useState(false);
  const imgref = useRef();

  useEffect(() => {
    imgref.current.complete && setLoaded(true);
  }, []);

  console.log(loaded);
  return (
    <div className="bg-slate-200 max-w-[350px] w-[320px] rounded-lg shadow-xl">
      <div className="flex justify-between space-x-3 p-3">
        <div className="flex justify-center space-x-3">
          <MdLocalOffer className="text-2xl  text-NoBingreen" />
          <b>OFFER</b>
        </div>
        <div className="flex justify-center space-x-3">
          <MdLocationOn className="text-2xl  text-red-500" />
          <p>London, Edinburgh</p>
        </div>
      </div>
      <img
        onError={() => setImageError(true)}
        ref={imgref}
        src={
          imageerror
            ? "/img/call-to-action-bg.jpg"
            : loaded
            ? src
            : "/img/call-to-action-bg.jpg"
        }
        alt="product"
        className={
          imageerror
            ? "blur"
            : loaded
            ? "w-full h-[200px] object-cover"
            : "blur"
        }
      />
      <div className="p-3 space-y-3">
        <div>
          <Link
            className="hover:text-NoBingreen hover:underline"
            href={`/item/${1}`}
          >
            <b className="pb-1">
              Gel Memory Foam in Gel Memory Foam inGel Memory Foam in{" "}
            </b>
          </Link>

          <p className="text-sm">
            Gel Memory Foam...Gel Memory Foam...vvvGel Memory Foam...Gel Memory
            Foam...
          </p>
        </div>
        <div className=" flex justify-between">
          <Button
            text={"reply"}
            className={"bg-NoBingreen  hover:bg-NoBingreen/40"}
          />
          <div className=" flex space-x-3 text-gray-600 text-sm items-center">
            <BiTimeFive />
            <p>2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
