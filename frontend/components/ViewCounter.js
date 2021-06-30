import { useEffect, useState } from "react";

import format from "comma-number";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState();

  useEffect(() => {
    registerView();
  }, [slug]);

  const registerView = async () => {
    try {
      const { data } = await axios.post(`${baseURL}/${slug}`);
      console.log("Data posted", data);
      setViews(data.views);
    } catch (error) {
      console.log(error);
    }
  };

  return `${views ? format(views) : "–––"} views`;
}
