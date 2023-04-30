import Link from "next/link";
import React from "react";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Button from "./common/Button";

function Footer() {
  return (
    <div className=" text-white">
      <div className="bg-[#111111] p-10  grid md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div>
          <img src="/img/logo2.png" alt="icon" className=" w-28 md:w-56 " />
          <p>
            Our platform was created with the mission of helping student of
            Edinburgh Napier University in need and creating a positive impact
            in our community.
          </p>
        </div>
        <div>
          <b>USEFUL LINKS</b>
          <div className="bg-slate-400 w-full h-0.5 mb-3">
            <div className="bg-NoBingreen w-20 h-0.5"></div>
          </div>

          <div>
            <div className=" flex space-x-3 pb-2 border-b border-slate-500/40 items-center">
              <IoIosArrowForward />
              <Link className="hover:text-NoBingreen transition-all" href={"/"}>
                {" "}
                Home
              </Link>
            </div>
            <div className=" flex space-x-3 pb-2 border-b border-slate-500/40 items-center">
              <IoIosArrowForward />
              <Link className="hover:text-NoBingreen transition-all" href={"/about"}>
                {" "}
                About us
              </Link>
            </div>
            <div className=" flex space-x-3 pb-2 border-b border-slate-500/40 items-center">
              <IoIosArrowForward />
              <Link className="hover:text-NoBingreen transition-all" href={"/contact"}>
                {" "}
                Contact Us
              </Link>
            </div>
            <div className=" flex space-x-3 pb-2 border-b border-slate-500/40 items-center">
              <IoIosArrowForward />
              <Link className="hover:text-NoBingreen" href={"/donation"}>
                {" "}
                Donation
              </Link>
            </div>
            <div className=" flex space-x-3 pb-2 border-b border-slate-500/40 items-center">
              <IoIosArrowForward />
              <Link className="hover:text-NoBingreen" href={"/privacy"}>
                {" "}
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
        <div>
          <b>CONTACT US</b>
          <div className="bg-slate-400 w-full h-0.5 mb-3">
            <div className="bg-NoBingreen w-20 h-0.5"></div>
          </div>

          <div>
            <p>
              10A Merchinston Campus Edinburgh Scotland, UK. <br />
              Phone: +44 5589 55488 55 <br />
              Email: info@thenobin.com
            </p>
            <div className="flex space-x-3 mt-4">
              <AiFillTwitterCircle className=" text-3xl hover:text-NoBingreen transition-all" />
              <BsFacebook className=" text-[27px] hover:text-NoBingreen transition-all" />
              <AiOutlineInstagram className=" text-3xl hover:text-NoBingreen transition-all" />
              <FaLinkedin className=" text-3xl hover:text-NoBingreen transition-all" />
            </div>
          </div>
        </div>
        <div>
          <b>OUR NEWSLETTER</b>
          <div className="bg-slate-400 w-full h-0.5 mb-3">
            <div className="bg-NoBingreen w-20 h-0.5"></div>
          </div>

          <div>
            <p>
              We care about your experience with theNoBin, you can sigup for our
              weekly newsletter to keep you updated on what is happening.
            </p>
            <div className="flex mt-5 relative items-center">
              <input className="p-1.5 w-full border-none rounded-lg focus:outline-none caret-black" />
              <Button
                text={"subscribe"}
                className="bg-NoBingreen absolute right-0 text-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 bg-black flex justify-center items-center">
        <p className="text-center">
          © Copyright <b>NoBin.</b> All Rights Reserved <br />{" "}
          <span className="text-NoBingreen">
            Designed by Napier Uni Student
          </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
