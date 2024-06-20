import axios from "axios";

const getImage = async () => {
  const { data } = await axios.get(process.env.IMAGE_GENERATOR);
  return data;
};

export default getImage;
