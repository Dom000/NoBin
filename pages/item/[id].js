import React from "react";

function item({ data }) {
  console.log(data);

  return <div>item</div>;
}

export default item;
export async function getServerSideProps(context) {
  const { id } = context.query.id;
  // Fetch data from external API
  const res = await fetch(`https://no-bin.vercel.app/api/getsingle_item/${id}`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
