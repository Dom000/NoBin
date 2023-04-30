import Head from "next/head";
import Image from "../components/common/Image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      <b className=" text-center text-xl pb-2">RECENT ITEMS</b>
      <div className="bg-slate-400 flex justify-center w-1/3 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 pt-10 gap-5">
        <Image src={"/img/about-vision.jpg"} />
        <Image src={"/img/about-vision.jpg"} />
        <Image src={"/img/about-vision.jpg"} />
        <Image src={"/img/about-vision.jpg"} />
      </div>
    </div>
  );
}
