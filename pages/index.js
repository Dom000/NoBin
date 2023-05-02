import Head from "next/head";
import Image from "../components/common/Image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Button from "../components/common/Button";
import { ImFilesEmpty } from "react-icons/im";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";

export default function Home({ data }) {
  const [posts, setPost] = useState(data.data);
  const [pagecount, setpagecount] = useState(3);
  console.log(posts);
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      <b className=" text-center text-xl pb-2">RECENT ITEMS</b>
      <div className="bg-slate-400 flex justify-center w-56 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      {posts.length == 0 ? (
        <div className="space-y-3 flex justify-center items-center flex-col">
          <ImFilesEmpty className="text-4xl " />
          <p className="text-center">
            No post yet,would you like to create one
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
        <>
          <div className="grid transition-all md:grid-cols-2 lg:grid-cols-3 pt-10 gap-5">
            {posts.slice(0, pagecount).map((item, index) => (
              <Image key={index} data={item} />
            ))}
          </div>
          <div className="flex justify-center my-8 items-center">
            <Button
              onClick={() => setpagecount(pagecount + 5)}
              text={"Load more"}
              className={"bg-NoBingreen hover:bg-NoBingreen/30"}
            />
          </div>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://no-bin.vercel.app/api/get_items");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
