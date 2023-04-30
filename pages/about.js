import React from "react";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

function about() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      {" "}
      <b className=" text-center text-xl pb-2">ABOUT US</b>
      <div className="bg-slate-400 flex justify-center w-1/3 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      <p>
        <b>About US</b> <br /> Welcome to our theNoBin website! Our platform was
        created with the mission of helping student of Edinburgh Napier
        University in need and creating a positive impact in our community. We
        believe that everyone has the ability to make a difference, and we want
        to provide an easy and secure way for individuals and organizations to
        donate to vassist stydents in needs.
      </p>
      <br />
      <p>
        At our core- We believe that generosity and kindness can change the
        world. We strive to make giving back as easy and accessible as possible,
        and we are committed to creating a platform that empowers students and
        organizations to make a positive impact.
      </p>
      <br />
      <p>
        <b>Mission Statement:</b>
        <br /> Our mission is to create a platform that facilitates charitable
        giving and empowers students and organizations to make a difference in
        their communities, to avoid waste and encourage reuse. We strive to
        connect those who are passionate about giving with reputable and
        trustworthy organizations that are making a meaningful impact. Our goal
        is to create a culture of generosity and kindness, where everyone has
        the opportunity to make a positive impact on the world.
      </p>
      <br />
      <p>
        <b> Our Team</b>
        <br /> Our team is made up of dedicated individuals who share the same
        passion for giving back. We work tirelessly to ensure that every
        donation is used to its fullest potential and that all funds are
        distributed to reputable and trustworthy students.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
        <div className="bg-slate-200 max-w-[350px] w-[330px] rounded-lg shadow-xl">
          <img
            src="/img/Maleek.jpeg"
            alt="hero"
            className="w-full h-[200px] object-fill"
          />
          <div className="p-3">
            {" "}
            <b className="text-xl">Babajide Onayemi (Maleek)</b>
            <p>Developer</p>
            <p className="text-gray-700">
              You can relay on our amazing features list and also our customer
              services will be great experience.
            </p>
            <div className="flex space-x-1 mt-4">
              <AiFillTwitterCircle className=" text-xl text-NoBingreen transition-all" />
              <BsFacebook className=" text-[17px] text-NoBingreen transition-all" />
              <AiOutlineInstagram className=" text-xl text-NoBingreen transition-all" />
              <FaLinkedin className=" text-xl text-NoBingreen transition-all" />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 max-w-[350px] w-[330px] rounded-lg shadow-xl">
          <img
            src="/img/teema.jpeg"
            alt="hero"
            className="w-full h-[200px] object-fill"
          />
          <div className="p-3">
            {" "}
            <b className="text-xl">Olakorede Fatimah Oloko</b>
            <p>Web Developer</p>
            <p className="text-gray-700">
              You can relay on our amazing features list and also our customer
              services will be great experience.
            </p>
            <div className="flex space-x-1 mt-4">
              <AiFillTwitterCircle className=" text-xl text-NoBingreen transition-all" />
              <BsFacebook className=" text-[17px] text-NoBingreen transition-all" />
              <AiOutlineInstagram className=" text-xl text-NoBingreen transition-all" />
              <FaLinkedin className=" text-xl text-NoBingreen transition-all" />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 max-w-[350px] w-[330px] rounded-lg shadow-xl">
          <img
            src="/img/Chinaza.jpeg"
            alt="hero"
            className="w-full h-[200px] object-fill"
          />
          <div className="p-3">
            {" "}
            <b className="text-xl">Chinaza Ogbonna</b>
            <p>Developer</p>
            <p className="text-gray-700">
              You can relay on our amazing features list and also our customer
              services will be great experience.
            </p>
            <div className="flex space-x-1 mt-4">
              <AiFillTwitterCircle className=" text-xl text-NoBingreen transition-all" />
              <BsFacebook className=" text-[17px] text-NoBingreen transition-all" />
              <AiOutlineInstagram className=" text-xl text-NoBingreen transition-all" />
              <FaLinkedin className=" text-xl text-NoBingreen transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;
