import axios from "axios";

const refreshpost = async (id) => {
  const post = await axios
    .get(`/api/getuser_allpost/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return post;
};
export default refreshpost;
