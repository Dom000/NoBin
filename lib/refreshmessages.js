import axios from "axios";

const refreshmessage = async (id) => {
  const post = await axios
    .get(`/api/getuser_allmessages/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return post;
};
export default refreshmessage;
