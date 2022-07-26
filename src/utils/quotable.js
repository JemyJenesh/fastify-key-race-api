import axios from "axios";

const uri = "https://api.quotable.io/random?minLength=200";

export const getData = async () => {
  const { data } = await axios(uri);

  return data.content.split(" ");
};
