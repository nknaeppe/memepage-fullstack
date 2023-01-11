import axios from "axios";
import { useEffect, useState } from "react";
import MemeCard from "./MemeCard";
const url = "http://localhost:4040";
const MemeScroll = () => {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    axios.get(url + "/memes").then((response) => {
      setMemes(Array.from(response.data));
    });
  }, []);
  const createImageUrl = (id) => {
    return url + "/meme/file/" + id;
  };
  return memes.length > 0 ? (
    memes.map((meme) => (
      <MemeCard key={meme.id} props={meme} fileUrl={createImageUrl(meme.id)} />
    ))
  ) : (
    <></>
  );
};

export default MemeScroll;
