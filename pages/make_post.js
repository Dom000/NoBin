import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { IoLocationOutline, IoMdCloudUpload } from "react-icons/io";
import Button from "../components/common/Button";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import Load from "../components/common/Loader";
import { Loader } from "@mantine/core";
import { useSnackbar } from "notistack";

function make_post() {
  const { enqueueSnackbar } = useSnackbar();

  // state to collect user input from form field
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adress, setAdress] = useState([]);

  //   state to hold image file and file object

  const [imagepreview, setimagepreview] = useState([]);
  const [imagefile, setimagefile] = useState([]);

  // file ref
  const openfileref = useRef();

  //   function search address in realtime

  useEffect(() => {
    let first = true;
    if (first) {
      const searchAddress = async () => {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=gb&proximity=-73.990593%2C40.740121&types=place%2Cregion%2Caddress%2Clocality&access_token=pk.eyJ1IjoibGVnZW5kMjAwMCIsImEiOiJjbDJ0YXVpZWMwMmk0M2dvMjg5ajAybHJ3In0.RTlPzNJfcCNTJshHxxuilw`
          )
          .then((res) => {
            setAdress(res.data.features);
          });
      };
      setTimeout(() => {
        searchAddress();
      }, 2000);
    }
    return () => {
      first = false;
    };
  }, [location !== ""]);

  //   function to handle post to the backend api
  const handlePost = () => {};

  //   function to extract image
  const handleImage = (e) => {
    if (imagefile.length >= 3) {
      enqueueSnackbar("image can't be more than 3");
    } else {
      const preview = URL.createObjectURL(e.target.files[0]);
      setimagepreview((state) => [...state, preview]);
      setimagefile((state) => [...state, e.target.files[0]]);
    }
  };

  return (
    <div className="my-5 w-full   ">
      <div className="space-y-3">
        <div className="w-full">
          <span
            onClick={() => openfileref.current.click()}
            className="cursor-pointer flex mb-3 flex-col justify-center items-center "
          >
            <input
              ref={openfileref}
              onChange={handleImage}
              type="file"
              hidden
            />
            <IoMdCloudUpload className="text-NoBingreen text-3xl md:text-5xl" />
            <p>Upload Image</p>
          </span>
          <div className=" grid grid-cols-2 gap-1 md:gap-3 md:grid-cols-3">
            {imagepreview.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="image"
                className="rounded-md border border-NoBingreen object-cover w-28 h-32"
              />
            ))}
          </div>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type={"text"}
          placeholder="Title"
          className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type={"text"}
          placeholder="Description"
          className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
        />
        <div className="relative block w-full">
          {" "}
          <input
            // onBlur={() => setTyping(false)}
            value={location}
            onFocus={() => setTyping(true)}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type={"text"}
            placeholder="Location"
            className=" px-2 py-1  focus:outline-NoBingreen border-2 border-black/40 rounded-md w-full "
          />
          {typing && (
            <div className="w-full z-30 bg-white rounded-sm max-h-[200px] h-[130px] md:h-[00px] overflow-y-auto space-y-2 shadow-lg absolute">
              {adress.length == 0 ? (
                <div className="flex justify-center items-center">
                  <Loader color="dark" size={"sm"} />
                </div>
              ) : (
                adress.map((item, index) => (
                  <div
                    onClick={() => {
                      setLocation(item?.place_name), setTyping(false);
                    }}
                    key={index}
                    className="flex space-x-3 p-2 text-black cursor-pointer hover:bg-slate-100"
                  >
                    <MdLocationOn className="text-xl mt-1" />{" "}
                    <p>{item?.place_name}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handlePost}
          loading={loading}
          text={"post"}
          className={"bg-NoBingreen  w-full hover:bg-NoBingreen/40"}
        />
      </div>
    </div>
  );
}
make_post.Layout = Layout;
export default make_post;
