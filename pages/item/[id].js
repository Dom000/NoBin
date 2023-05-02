import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { MdLocalOffer, MdLocationOn } from "react-icons/md";
import Button from "../../components/common/Button";
import ReactTimeAgo from "react-time-ago";


function item() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setproduct] = useState({});

  useEffect(() => {
    const callApi = async () => {
      await axios.get(`/api/getsingle_item/${id}`).then((res) => {
        setproduct(res.data.data);
      });
    };
    callApi();
  }, [router.query.id]);

  console.log(product);
  return (
    <div className="flex justify-center w-full">
      <div className="bg-slate-200  md:w-1/2 rounded-lg shadow-xl">
        <div className="flex justify-between space-x-3 p-3">
          <div className="flex justify-center space-x-3">
            <MdLocalOffer className="text-2xl  text-NoBingreen" />
            <b>OFFER</b>
          </div>
          <div className="flex justify-center space-x-3">
            <MdLocationOn className="text-2xl  text-red-500" />
            <p className="text-sm">{product.location}</p>
          </div>
        </div>
        <div className="  flex-col flex justify-center md:flex-row space-y-3 md:space-y-0 md:space-x-6">
          {product?.images?.map((itm, index) => (
            <img
              key={index}
              src={itm?.url}
              alt="product"
              className={"w-full md:w-1/3 h-[200px] object-contain"}
            />
          ))}
        </div>
        <div className="p-3 space-y-3">
          <div>
            <b className="pb-1">{product.title}</b>

            <p className="text-sm">{product.description}</p>
          </div>
          <div className=" flex justify-between">
            <Button
              text={"reply"}
              className={"bg-NoBingreen ring-black  hover:bg-NoBingreen/40"}
            />
            <div className=" flex space-x-3 text-gray-600 text-sm items-center">
              <BiTimeFive />
              <ReactTimeAgo
                date={
                  product.hasOwnProperty("created_at") ? product?.created_at : 1
                }
                locale="en-US"
              />
            </div>
          </div>
          <div className=" flex justify-between">
            <b>Author:</b>
            <b>{product.user?.username}</b>
          </div>
          <div className=" flex justify-between">
            <b>Email:</b>
            <b>{product.user?.student_email}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default item;
// export async function getServerSideProps(context) {
//   const { id } = context.query.id;
//   // Fetch data from external API
//   const res = await fetch(`https://no-bin.vercel.app/api/getsingle_item/${id}`);
//   const data = await res.json();
//   // Pass data to the page via props
//   return { props: { data } };
// }
