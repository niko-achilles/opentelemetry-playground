import Link from "next/link";
import format from "comma-number";

import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

const StoryCard = ({ title, summary, cover, tags, slug }) => {
  const [views, setViews] = useState();

  useEffect(() => {
    fetchViews();
  }, []);

  const fetchViews = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/${slug}`);

      console.log("Data fetched", data);
      setViews(data.views);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link href={`/story/${slug}`}>
      <a className="w-full">
        <img className="h-32 w-full object-contain" src={cover} alt={summary} />
        <div className="flex items-center bg-white shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-baseline">
              <span className="bg-red-200 text-gray-700 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                Tags
              </span>
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {tags}
              </div>
            </div>
            <h4 className="mt-3 text-lg font-semibold text-gray-800 leading-tight truncate">
              {title}
            </h4>
            <div className="mt-1 sm:w-8/12 lg:w-full text-gray-700">
              {summary}
            </div>

            <div className="mt-4">
              <p className="text-red-700 font-semibold text-lg">
                Views {`${views ? format(views) : "***"}`}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default StoryCard;
