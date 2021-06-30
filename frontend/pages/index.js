import StoryCard from "../components/StoryCard";
import { getAllFilesFrontMatter } from "../lib/mdx";
import { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";

export default function Home({ stories }) {
  const [searchValue, setSearchValue] = useState("");
  const filteredStories = stories
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div>
      <Head>
        <title>Stories - Niko Achilles Kokkinos</title>
        <meta
          content="Playground of stories and observability tools"
          name="description"
        />
      </Head>
      <div className="bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img
              className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
              src="/images/hero-image.jpg"
              alt="Digital Playground image by Maxim Hopman, Unsplash"
            />
            <h1 className="mt-6 text-2xl font-semibold text-gray-700 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              Playground of stories and
              <br className="hidden lg:inline" />{" "}
              <span className="text-red-700">observability tools</span>
            </h1>
            <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
              Hi. This is a digital playground. Writing online stories, mostly
              about web development, software architecture and observability
              tools
            </p>
          </div>
        </div>
        <div className="hidden relative lg:block 2xl:col-span-3">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/images/hero-image.jpg"
            alt="Digital Playground image by Maxim Hopman, Unsplash"
          />
        </div>
      </div>

      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900">
          Discover
        </h1>
        <p className="text-gray-600 mb-4">
          {`
          Use the search below to filter by title`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search stories"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search stories"
            className="px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white text-gray-900"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900">
              Popular stories
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <StoryCard
                title="Digital Writing"
                summary="Concept of digital writing and story-telling in year of 2021"
                tags="Concept, digital writing"
                cover="/images/dot-concept.jpg"
                slug="digital-writing"
              />
              <StoryCard
                title="Scrollytelling"
                summary="Playground of a story with scrollytelling, written in MDX and react components"
                cover="/images/scrollytelling.jpg"
                tags="scroll, tell"
                slug="example"
              />
            </div>
          </>
        )}

        <h3 className="font-bold text-2xl mb-4 mt-8 text-gray-900">
          All Stories
        </h3>
        {!filteredStories.length && (
          <p className="text-gray-600 mb-4">No stories found.</p>
        )}
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredStories.map((frontMatter) => (
            <StoryCard key={frontMatter.title} {...frontMatter} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const stories = await getAllFilesFrontMatter("stories");

  return { props: { stories } };
}
